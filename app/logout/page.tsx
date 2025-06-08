"use client";
import { useSession, signOut } from "next-auth/react";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Logout = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAdmin,setIsAdmin] = useState(false);

  useEffect(() => {
    if (session?.user?.email === "kriangkraiidea@gmail.com") {
      setIsAdmin(true)
    }

    if (!session && status !== "loading") {
      router.push('/login');
    }
  }, [session, status,router]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center  bg-white p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center bg-white p-4">
        <div className="card w-full max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="text-center text-xl font-semibold mb-2">Welcome, {session.user?.name}</p>
            <div className="flex justify-center mb-4">
              <Image 
                className="rounded-full border-2 border-gray-300" 
                src={session.user?.image || "/default-user.png"} 
                alt={session.user?.name || "User Image"} 
                width={96} 
                height={96} 
              />
            </div>
            <div className="flex justify-center">
              <button onClick={() => signOut()} className="btn btn-error">Sign out</button>
            </div>
          </div>
        </div>
        {isAdmin && <div className="flex flex-col my-2">
          <button className="btn btn-outline m-2"><Link href="/add-animals">Manage Animal</Link></button>
          <button className="btn btn-outline m-2"><Link href="/add-monster">Manage Monster</Link></button>
        </div>}
      </div>
    );
  }

  return null; // This can be removed or replaced with a loading indicator if needed
};

export default Logout;
