"use client";

import { useEffect, useState } from "react";
import Play from "./components/Play";
import { Copy, X } from "lucide-react";
import Image from "next/image";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || "";
    const isInAppBrowser = /FBAN|FBAV|Instagram|Line|Messenger|Twitter/i.test(ua);

    if (isInAppBrowser) {
      setShowModal(true);
    }
  }, []);

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
    <div>
      <Play />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center shadow-xl relative animate-fade-in space-y-4">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/hybrid-animals-9a289.appspot.com/o/lion%20head.png?alt=media&token=caee7b5d-43bd-492e-8cc0-c01cd8cdfd6d"
                alt="Hybrid Animals Logo"
                width={74}
                height={74}
                className="rounded-full"
              />
            </div>

            {/* Headings */}
            <h2 className="text-2xl font-bold text-yellow-700">คำแนะนำ</h2>
            <p className="text-base text-gray-700">
              กรุณาเปิดลิงก์นี้ในเบราว์เซอร์ <strong>Chrome</strong> หรือ <strong>Safari</strong>
            </p>
            <p className="text-sm text-gray-500">
              การเข้าสู่ระบบด้วย Google ไม่สามารถทำงานในแอป เช่น LINE, Facebook, หรือ Instagram ได้
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCopy}
                className="btn btn-outline btn-warning flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {copied ? "✅ คัดลอกแล้ว!" : "คัดลอกลิงก์"}
              </button>

              <a
                href="intent://hybrid-animals-kriangkrais-projects-6841c9c8.vercel.app#Intent;scheme=https;package=com.android.chrome;end"
                className="btn btn-success w-full"
              >
                เปิดด้วย Chrome (Android)
              </a>
            </div>

            {/* Note for iPhone */}
            <div className="text-sm text-gray-500 space-y-1 mt-2">
              <p>📱 สำหรับผู้ใช้ iPhone:</p>
              <p>• คลิกที่ <strong>จุดสามจุด</strong> มุมล่างขวา</p>
              <p>• เลือก <strong>เปิดในเบราว์เซอร์</strong> หรือเปิดผ่าน Safari</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
