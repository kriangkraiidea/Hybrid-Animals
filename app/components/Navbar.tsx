'use client';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('');
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isAdmin,setIsAdmin] = useState(false);
  

  useEffect(() => {
    if (session?.user?.email === "kriangkraiidea@gmail.com") {
      setIsAdmin(true)
    }
    // Update the active tab based on the current pathname
    if (pathname === '/') {
      setActiveTab('Home');
    } else if (pathname === '/rank') {
      setActiveTab('Rank');
    } else if (pathname === '/about') {
      setActiveTab('About');
    } else if (pathname === '/logout' && session) {
      setActiveTab('Logout');
    } else if (pathname === '/login' && !session) {
      setActiveTab('Login');
    } else {
      setActiveTab(''); // Clear activeTab if path doesn't match any tab
    }
  }, [pathname, session]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
        <p>Loading...</p>
      </div>
    );
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className='container mx-auto px-3'>
      <div className="rounded-lg bg-gradient-to-blue mx">
        <div className="tabs tabs-lifted my-3 grid grid-cols-4">
          <Link href="/" className={`tab transition-colors duration-700 ease-out ${
                activeTab === 'Home'
                  ? 'tab-active text-xl text-lime-900 bg-white '
                  : 'text-white'
              } font-semibold mt-1 ml-2 hover:text-xl`}
              onClick={() => handleTabClick('Home')}>
              Home
          </Link>
          <Link href="/rank" className={`tab transition-colors duration-700 ease-out ${
                activeTab === 'Rank'
                  ? 'tab-active text-xl text-lime-900 bg-white '
                  : 'text-white '
              } font-semibold hover:text-xl`}
              onClick={() => handleTabClick('Rank')}>
              Rank
          </Link>
          <Link href="/about" className={`tab transition-colors duration-700 ease-out ${
                activeTab === 'About'
                  ? 'tab-active text-xl text-lime-900 bg-white '
                  : 'text-white '
              } font-semibold hover:text-xl`}
              onClick={() => handleTabClick('About')}>
              About
          </Link>
          {session ? (
            <Link href="/logout" className={`tab transition-colors duration-700 ease-out ${
                  activeTab === 'Logout'
                    ? 'tab-active text-xl text-lime-900 bg-white '
                    : 'text-red-500 '
                } font-semibold mr-2 hover:text-xl`}
                onClick={() => handleTabClick('Logout')}>
              {isAdmin?"SETTING":"Logout"}
            </Link>
          ) : (
            <Link href="/login" className={`tab transition-colors duration-700 ease-out ${
                  activeTab === 'Login'
                    ? 'tab-active text-xl text-lime-900 bg-white '
                    : 'text-white '
                } font-semibold mr-2 hover:text-xl`}
                onClick={() => handleTabClick('Login')}>
                Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
