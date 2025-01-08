"use client";

import React from "react";
import CountUp from "react-countup";
import Link from "next/link";
import Image from "next/image"; // Import Image from next/image
import { useSession } from "next-auth/react"; // Import useSession

interface NavbargameProps {
  score: number;
  levelgame: number;
}

const stopplay = () => {
  localStorage.removeItem("gameData");
  localStorage.removeItem("playstatus");
};

const Navbargame: React.FC<NavbargameProps> = ({ score, levelgame }) => {
  const { data: session } = useSession(); // Get session data

  return (
    <section>
      <div className="container mx-auto px-3">
        <div className="flex my-1 justify-between items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mx-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Level <span>{levelgame}</span>
            </h1>
          </div>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar">
                <div className="avatar hover:scale-110">
                  <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    ) : (
                      <Image
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        alt="Default Profile"
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    )}
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[2] mt-3 w-24 p-2 shadow-sm shadow-green-600 flex items-center"
              >
                <li onClick={stopplay}>
                  <Link href="/">Home</Link>
                </li >
                <li onClick={stopplay}>
                  <Link href="/rank">Rank</Link>
                </li>
                <li onClick={stopplay}>
                  <Link href="/about">About</Link>
                </li>
                <li onClick={stopplay}>
                  <Link href="/login" >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="stats">
            <div className="stat">
              <div className="stat-title text-emerald-700">Total Score</div>
              <div className="stat-value bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                <CountUp start={score*0.7} end={score} separator="," duration={1} />
              </div>
              <div className="stat-desc text-emerald-700">show me your highest score</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbargame;
