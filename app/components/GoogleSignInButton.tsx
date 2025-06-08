"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Copy, AlertTriangle, X } from "lucide-react";

export default function GoogleSignInButton() {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGoogleSignIn = () => {
    const ua = navigator.userAgent || navigator.vendor || "";
    const isInApp = /FBAN|FBAV|Instagram|Line|Messenger|Twitter/.test(ua);

    if (isInApp) {
      setShowModal(true);
    } else {
      signIn("google");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
      alert("❌ ไม่สามารถคัดลอกลิงก์ได้");
    }
  };

  return (
    <>
      <button type="button" onClick={handleGoogleSignIn} className="my-3 btn border border-primary w-72 hover:bg-green-300 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" width="20" height="20">
          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
        </svg>
        Sign in with Google
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center shadow-xl relative animate-fade-in">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-black" onClick={() => setShowModal(false)}>
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-3">
              <AlertTriangle className="w-10 h-10 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">⚠️ ไม่สามารถเข้าสู่ระบบจากแอปนี้ได้</h2>
            <p className="text-lg mb-1">Google Login ไม่สามารถทำงานได้ในแอปอย่าง LINE, Facebook หรือ Instagram</p>
            <p className="mb-4 text-sm text-gray-600">
              กรุณาคัดลอกลิงก์แล้วเปิดใน <strong>Chrome หรือ Safari</strong>
            </p>

            <div className="flex flex-col gap-2">
              <button onClick={handleCopy} className="btn btn-outline btn-warning flex items-center justify-center gap-2">
                <Copy className="w-4 h-4" />
                {copied ? "✅ คัดลอกแล้ว!" : "คัดลอกลิงก์"}
              </button>
              <a href="intent://hybrid-animals-kriangkrais-projects-6841c9c8.vercel.app#Intent;scheme=https;package=com.android.chrome;end" className="btn btn-outline btn-success">
                เปิดด้วย Chrome
              </a>
              <p className="text-sm text-gray-600">หากใช้ iPhone กรุณาเปิดด้วย Safari</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
