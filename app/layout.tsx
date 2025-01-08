// ./app/layout.tsx
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProviders";
import MainLayout from "./Mainlayout";
import type { Metadata } from "next";

// ตั้งค่า favicon ให้แน่ใจว่าถูกต้อง (แก้ path)
export const metadata: Metadata = {
  title: "Hybrid Animals",
  description: "The very good puzzle game",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <MainLayout>{children}</MainLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
