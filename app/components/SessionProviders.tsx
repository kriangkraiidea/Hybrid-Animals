"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth"; // นำเข้า Session type จาก next-auth

interface ProvidersProps {
  children: ReactNode;
  session: Session | null;  // กำหนด session type ให้ชัดเจน (อาจจะเป็น null ได้)
}

export default function Providers({ children, session }: ProvidersProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
