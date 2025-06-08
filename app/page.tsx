"use client";

import { useEffect, useState } from "react";
import Play from "./components/Play";
import { Copy, AlertTriangle, X } from "lucide-react";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center shadow-xl relative animate-fade-in">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-black" onClick={() => setShowModal(false)}>
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-3">
              <AlertTriangle className="w-10 h-10 text-yellow-600" />
            </div>

            <h2 className="text-xl font-semibold text-yellow-800 mb-2">⚠️ คำแนะนำ</h2>
            <p className="text-lg mb-1">กรุณาเปิดลิงก์นี้ในเบราว์เซอร์ เช่น Chrome หรือ Safari</p>
            <p className="mb-4 text-sm text-gray-600">แอปอย่าง LINE, Facebook, Instagram จะไม่รองรับ Google Login</p>
          <button onClick={handleCopy} className="btn btn-outline btn-warning flex items-center justify-center gap-2">
                <Copy className="w-4 h-4" />
                {copied ? "✅ คัดลอกแล้ว!" : "คัดลอกลิงก์"}
              </button>
            <a href="intent://hybrid-animals-kriangkrais-projects-6841c9c8.vercel.app#Intent;scheme=https;package=com.android.chrome;end" className="btn btn-outline btn-success w-full">
              เปิดด้วย Chrome (Android)
            </a>
            <p className="text-sm text-gray-600">หากใช้ iPhone ให้คลิกที่ จุดสามจุด แล้วเลือก เปิดในเบราว์เซอร์</p>
            <p className="text-sm text-gray-600">หรือ คัดลอกลิงก์แล้วเปิดด้วย Safari</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
