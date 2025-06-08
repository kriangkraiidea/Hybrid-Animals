'use client';

import { useEffect, useState } from 'react';
import Play from './components/Play';
import { AlertTriangle } from 'lucide-react';

const isInAppBrowser = (): boolean => {
  const ua = navigator.userAgent || navigator.vendor || '';
  return /FBAN|FBAV|Instagram|Line|Twitter|Messenger/.test(ua);
};

const Home: React.FC = () => {
  const [inApp, setInApp] = useState(false);

  useEffect(() => {
    if (isInAppBrowser()) {
      setInApp(true);
    }
  }, []);

  if (inApp) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-yellow-50 text-yellow-800">
        <AlertTriangle className="w-16 h-16 mb-4 text-yellow-600" />
        <h1 className="text-2xl font-bold mb-2">⚠️ ไม่สามารถเปิดในแอปนี้ได้</h1>
        <p className="text-lg mb-1">Google Login ไม่สามารถทำงานได้ในแอปอย่าง LINE, Facebook หรือ Instagram</p>
        <p className="text-base text-gray-700">
          กรุณาคัดลอกลิงก์นี้ แล้วเปิดผ่านเบราว์เซอร์เช่น <strong>Chrome</strong> หรือ <strong>Safari</strong>
        </p>
      </div>
    );
  }

  return (
    <div>
      <Play />
    </div>
  );
};

export default Home;
