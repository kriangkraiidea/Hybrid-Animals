"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);

  console.log("session = ", session);
  console.log("status = ", status);
  return (
    status === "authenticated" &&
    session.user && (
      <div className="container mx-auto px-4 ">
        <div className="w-full flex flex-col mt-3 gap-3 items-center">
          <h1>
            Welcome <span>{session.user.name}</span>
          </h1>
          <h1>
            Gmail: <span>{session.user.email}</span>
          </h1>
          <h1>
            Role: <span>{session.user.role}</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi neque expedita quisquam, dolore voluptate sit possimus natus, excepturi ea nam quidem consequatur! Laborum deleniti ea
            quisquam iure voluptatibus reprehenderit eaque!
          </p>
        </div>
      </div>
    )
  );
}
