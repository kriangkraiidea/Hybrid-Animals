"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import GoogleSignInButton from "@/app/components/GoogleSignInButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    const storedData = localStorage.getItem("playstatus");
    if (storedData == "gameover" && status === "authenticated") {
      router.push("/games/gameover");
    }
    if (status === "authenticated" && storedData !== "gameover") {
      router.push("/");
    }
  }, [router, status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please complete all input");
      setSuccess("");
      return;
    }
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        return false;
      }

      if (result?.ok) {
        (e.target as HTMLFormElement).reset(); // ใช้ type assertion เพื่อบอกว่า e.target เป็น HTMLFormElement
        setError("");
        setSuccess("Login successful!");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log("error", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
          {error && (
            <div role="alert" className="alert alert-error mb-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div role="alert" className="alert alert-success mb-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{success}</span>
            </div>
          )}
          <input type="email" className="input input-primary border-primary mb-4 p-2 w-72" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="input input-primary border-primary mb-4 p-2 w-72" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="btn btn-primary w-72">
            Submit
          </button>
          <GoogleSignInButton />
          <p className="mt-2">
            Do not have an account? Go to{" "}
            <Link href="/register" className="link-hover text-blue-500">
              Register
            </Link>{" "}
            page.
          </p>
        </form>
      </div>
    </div>
  );
}
