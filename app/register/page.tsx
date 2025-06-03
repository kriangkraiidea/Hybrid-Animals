"use client";
import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmpassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmpassword) {
      setError("Please complete all input");
      setSuccess("");
      return;
    }
    if (password !== confirmpassword) {
      setError("Confirm your password");
      setSuccess("");
      return;
    }

    try {
      const res_register = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      console.log(res_register.status);

      if (res_register.status === 409) {
        setError("User already exists");
        setSuccess("");
        return;
      }

      if (res_register.ok) {
        (e.target as HTMLFormElement).reset();
        setError("");
        setSuccess("Register complete!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmpassword("");
        router.push("/login");
        return;
      } else {
        setError("Failed to register");
        setSuccess("");
      }
    } catch (error) {
      console.log("Cannot fetch data from register API", error);
      setError("An error occurred. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
        {error && (
          <Alert type="error" message={error} />
        )}
        {success && (
          <Alert type="success" message={success} />
        )}
        <input
          type="text"
          className="input input-primary border-primary mb-4 p-2 w-72"
          placeholder="Enter your name"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <input
          type="email"
          className="input input-primary border-primary mb-4 p-2 w-72"
          placeholder="Enter your Email"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input input-primary border-primary mb-4 p-2 w-72"
          placeholder="Enter your Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="input input-primary border-primary mb-4 p-2 w-72"
          placeholder="Confirm your password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmpassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-72">
          Submit
        </button>
        <p className="mt-2">
          Already have an account? Go to{" "}
          <Link href="/login" className="link-hover text-blue-500">
            Login
          </Link>{" "}
          page.
        </p>
      </form>
    </div>
  );
}

interface AlertProps {
  type: "error" | "success";
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const alertClass = type === "error" ? "alert-error" : "alert-success";
  const iconPath =
    type === "error"
      ? "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z";

  return (
    <div role="alert" className={`alert ${alertClass} mb-3 py-2`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
      </svg>
      <span>{message}</span>
    </div>
  );
};
