"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    if (pathname.startsWith("/games")) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [pathname]);

  return (
    <>
        {showNavbar && <Navbar />}
        {children}
    </>
  );
};

export default MainLayout;
