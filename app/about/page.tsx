// pages/about.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const About: React.FC = () => {
  const [stats, setStats] = useState<{ totalUser: number; totalPlayGame: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center">เกี่ยวกับเกมนี้</h1>
      <div className="flex md:flex-row flex-col justify-center">
        <div className="flex flex-row self-center">
          <div className="text-secondary ">
            <div className="avatar ">
              <div className="w-24 rounded-md ">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/hybrid-animals-9a289.appspot.com/o/38472.jpg?alt=media&token=888f75be-49f9-4fb7-9f84-e561bfdba600"
                  alt="ผู้สร้างเกม"
                  width={96}
                  height={96}
                />
              </div>
            </div>
          </div>
          <div className="mx-2 py-3">
            <div className="text-2xl text-center">ผู้สร้าง</div>
            <div className="stat-title text-center">เกรียงไกร เกตุรักษา</div>
            <div className="stat-desc text-center">ชื่อเล่น : ไอเดีย</div>
          </div>
        </div>
        <div className="flex self-center">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="stat">
                <div className="stat-title font-bold">Total User</div>
                <div className="stat-value text-primary">{stats?.totalUser.toLocaleString()}</div>
                <div className="stat-desc">จำนวนของผู้เล่นที่ล็อกอิน</div>
              </div>
              <div className="stat">
                <div className="stat-title font-bold">Total Play Game</div>
                <div className="stat-value text-secondary">{stats?.totalPlayGame.toLocaleString()}</div>
                <div className="stat-desc">จำนวนรอบการเล่นของผู้เล่นที่ล็อกอิน</div>
              </div>
            </>
          )}
        </div>
      </div>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">จุดประสงค์ของการสร้างเกม</h2>
        <p className="text-lg">
          &nbsp;&nbsp;&nbsp;&nbsp;เกมนี้ถูกออกแบบมาเพื่อให้ผู้เล่นทุกวัยได้สนุกและเพลิดเพลินไปกับการเล่นเกม เป้าหมายของเกมคือการใช้การวิเคราะสังเกตุเพื่อหาคำตอบที่ถูกต้อง
          โดยใช้ตัวเลือกที่กำหนดให้และมีการจำกัดเวลา ซึ่งจะเพิ่มความสร้างสรรค์และความท้าทายในการเล่นเกมมากขึ้น หวังว่าทุกท่านจะได้รับความสนุกและประสบการที่ดีจาก{" "}
          <span className="link link-hover text-green-600 font-bold">
            <Link href="/">Hybrid Animals</Link>
          </span>{" "}
          ขอบคุณครับ
        </p>
        <p className="text-lg pt-4">
          &nbsp;&nbsp;&nbsp;&nbsp;ต้องบอกไว้ก่อนว่าผมไม่ได้เรียนในสาขาเกี่ยบกับการเขียนโค้ดมาก่อน แต่เหตุที่ทำให้เกิดโปรเจคนี้ขึ้นมา มาจากการที่ผมได้เรียน Next.js จาก Youtobe ช่อง KongRuksiam
          ซึ่งเป็นคลิปที่สอนไว้ได้เข้าใจง่ายมาก พอดูคลิปและเรียนจนจบก็อยากลองโปรเจคทำอะไรสักอย่างเพื่อจะได้เป็นการทบทวนและนำสิ่งที่เรียนมาไปลองใช้จริง
          พอเริ่มทำจริงๆก็ทำให้รู้ว่ามีหลายสิ่งที่ต้องเรียนรู้เพิ่มเติมอีกมาก สิ่งที่ยากที่สุดสำหรับผลคือ NextAuth เพราะมันมีรายละเอียดต่างๆเยอะมาก จนผมต้องใช้ ChatGPT ในการแก้ปัญหา และผมก็ใช้ ChatGPT
          ในการทำงานเป็นส่วนใหญ่ ในโปรเจคมีการใช้สอง database เพราะผมต้องการใช้งานเก็บข้อมูลแบบฟรีให้ได้มากที่สุดแค่นั้นไม่มีอะไรมาก อาจจะมีหลายจุดที่ชาวเดฟรู้สึกขัดใจต้องขออภัยไว้ ณ ที่นี้
          โปรเจคที่ทำขึ้นไม่ได้มีการก็อปปี้มาจากที่อื่นแต่อย่างใด แต่มีการใช้ AI ในการช่วยคิดวิธีการทำงานของส่วนคำนวณ,การสร้างรูปภาพภายในเกมและอื่นๆ
          สุดท้ายก็ขอขอบคุณทุกคนที่เข้ามาลองเล่นและหวังว่าจะสนุกกับการเล่นเกมนะครับ
        </p>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">ฟีเจอร์ของระบบในโปรเจกต์นี้ (Hybrid Animals)</h2>
        <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed">
          <li>
            🔐 <strong>Google Sign-In:</strong> ผู้เล่นสามารถเข้าสู่ระบบด้วยบัญชี Google อย่างปลอดภัยผ่าน NextAuth.js
          </li>
          <li>
            🧩 <strong>ระบบเก็บคะแนน (Score Tracking):</strong> บันทึกคะแนนสูงสุดของผู้เล่นแบบแยกแต่ละคน พร้อมจำนวนรอบการเล่น
          </li>
          <li>
            🐾 <strong>ระบบ CRUD:</strong>
            <ul className="list-disc list-inside ml-6">
              <li>ระบบหลังบ้านเรียบง่าย สำหรับผู้ดูแลเกมสามารถเพิ่ม ลบ แก้ไขสัตว์ได้สะดวก ไม่ต้องยุ่งกับฐานข้อมูลโดยตรง</li>
              <li>จำกัดการเข้าถึงเฉพาะบัญชีอีเมลที่ได้รับอนุญาตเท่านั้น (admin list)</li>
              <li>ทำงานผ่าน Firebase Database โดยใช้ Firebase Rules ในการควบคุมสิทธิ์</li>
            </ul>
          </li>
          <li>
            📊 <strong>แสดงสถิติผู้เล่น:</strong> หน้า About จะดึงข้อมูลจาก API เพื่อแสดงจำนวนผู้ใช้และจำนวนรอบที่เล่นทั้งหมด และหน้า Rank จะแสดงสถิติผู้เล่นที่ได้คะแนนเยอะที่สุด
          </li>
          <li>
            🧠 <strong>เกมฝึกทักษะ:</strong> เกมเน้นการวิเคราะห์และสังเกตภาพสัตว์ที่ผสมกันแบบสุ่ม โดยผู้เล่นต้องเลือกคำอธิบายที่ตรงกับภาพภายใต้เวลาที่จำกัด
          </li>
          <li>
            🎨 <strong>ภาพสัตว์ที่สร้างจาก AI:</strong> ใช้ภาพสัตว์ลูกผสมที่สร้างด้วย AI เพื่อความสนุกและแปลกใหม่(เป็นภาพที่เจนเนอร์เรทไว้แล้ว)
          </li>
          <li>
            💾 <strong>ระบบโชว์คะแนนสุงสุดและแนะนำ login</strong>หลังเล่นเสร็จจะมีการเปรียบเทียบคะแนนว่ามีการเปลี่ยนแปลงหรือไม และ หากยังไม่ล็อคอินจะมีแจ้งเตือน
          </li>
          <li>
            🛡️ <strong>การจำกัดสิทธิ์การเข้าถึง (Access Control):</strong> เฉพาะอีเมลที่อยู่ในรายชื่ออนุญาต (whitelist) เท่านั้นที่สามารถจัดการเนื้อหาเกมได้
          </li>
          <li>
            ⚙️ <strong>ระบบตรวจเช็คแพลตฟอร์ม (platform checking):</strong>ตรววจจับว่าผู้ใช้งานเข้าใช้งานผ่าน platform อะไรและช่วยให้คำแนะนำ
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">เครื่องมือที่ใช้ในการสร้างเกม</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">เฟรมเวิร์กและไลบรารี</h3>
          <ul className="list-disc list-inside text-lg">
            <li>
              <strong>Next.js:</strong> เฟรมเวิร์ก React ที่ใช้ในการสร้างส่วนหน้าของเกม ซึ่งให้บริการการเรนเดอร์ฝั่งเซิร์ฟเวอร์และการสร้างเว็บไซต์แบบสแตติก
            </li>
            <li>
              <strong>TypeScript:</strong> ซูเปอร์เซ็ตของ JavaScript ที่เพิ่มความสามารถในการตรวจสอบประเภทข้อมูลแบบสถิติเพื่อเพิ่มคุณภาพและประสิทธิภาพในการเขียนโค้ด
            </li>
            <li>
              <strong>Tailwind CSS:</strong> เฟรมเวิร์ก CSS แบบ utility-first ที่ช่วยให้สามารถสร้างอินเทอร์เฟซที่ตอบสนองได้อย่างรวดเร็วและมีประสิทธิภาพ
            </li>
            <li>
              <strong>DaisyUI:</strong> ปลั๊กอินสำหรับ Tailwind CSS ที่ให้ชุดคอมโพเนนต์ที่ออกแบบล่วงหน้าเพื่อสร้างส่วนติดต่อผู้ใช้อย่างรวดเร็ว
            </li>
            <li>
              <strong>NextAuth.js:</strong> ไลบรารีสำหรับการยืนยันตัวตนในแอปพลิเคชัน Next.js ที่ใช้ในการจัดการเซสชันของผู้ใช้และการเข้าสู่ระบบอย่างปลอดภัย
            </li>
            <li>
              <strong>Axios:</strong> ไคลเอนต์ HTTP ที่ใช้สัญญาในการทำคำขอ API ไปยังเซิร์ฟเวอร์ด้านหลัง
            </li>
            <li>
              <strong>React CountUp:</strong> คอมโพเนนต์ React ที่ใช้ในการแสดงผลค่าตัวเลขที่เคลื่อนไหวเพื่อเพิ่มความน่าสนใจในการมองเห็นของเกม
            </li>
            <li>
              <strong>bcrypt:</strong> ไลบรารีสำหรับการเข้ารหัสรหัสผ่านที่ปลอดภัย โดยใช้การแฮชเพื่อเก็บรหัสผ่านอย่างปลอดภัยในฐานข้อมูล
            </li>
            <li>
              <strong>ESLint:</strong> เครื่องมือสำหรับวิเคราะห์โค้ด JavaScript และ TypeScript เพื่อค้นหาและแก้ไขข้อผิดพลาดด้านโค้ดสไตล์และบั๊ก
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">ฐานข้อมูล</h3>
          <ul className="list-disc list-inside text-lg">
            <li>
              <strong>MongoDB:</strong> ใช้สำหรับเก็บข้อมูลผู้เล่น เช่น ชื่อ อีเมล คะแนนสูงสุด และจำนวนการเล่น เป็นระบบที่จะเก็บข้อมูลผ่านการเล่นและการล็อกอินโดยผู้ใช้เอง
            </li>
            <li>
              <strong>Firebase:</strong> ใช้สำหรับเก็บข้อมูลของเกม เช่น รูปภาพ ชื่อ ประเภทของสัตว์ต่างๆภายในเกม เป็นระบบหลังบ้านที่อนุญาติสิทธิให้คนที่มีเมลที่กำหนดไว้สามารถเข้าไปเพิ่มลบข้อมูลได้
            </li>
          </ul>
        </div>
      </section>
      <footer className="footer rounded-t-full footer-center bg-primary text-primary-content p-2">
        <aside>
          <Image
            className="size-20 md:size-28 xl:size-36"
            src="https://firebasestorage.googleapis.com/v0/b/hybrid-animals-9a289.appspot.com/o/lion%20head.png?alt=media&token=caee7b5d-43bd-492e-8cc0-c01cd8cdfd6d"
            alt="Lion Head Icon"
            width={100}
            height={100}
          />

          <p className="font-bold">
            Hybrid Animals game
            <br />
            Developed by Idea
          </p>
          <p>Copyright © 2025 - All right reserved</p>
          <p>Created Date : 1-1-2025</p>
        </aside>
        <nav>
          <h1 className="font-bold text-3xl">contact</h1>
          <h3>Email : kriangkraiidea@gmail.com</h3>
          <h3>Tel : 0855455515</h3>
          <h3>Line ID : ideaofgod</h3>
          <div className="grid grid-flow-col gap-12">
            <a className="cursor-pointer" href="https://www.linkedin.com/in/kriangkrai-ketraksa-42179036b/?originalSubdomain=th" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.6v2.4h.05c.5-.9 1.75-1.85 3.6-1.85 3.85 0 4.55 2.55 4.55 5.85V24h-4V15.5c0-2.05 0-4.7-2.85-4.7-2.85 0-3.3 2.25-3.3 4.55V24h-4V8z" />
              </svg>
            </a>
            <a className="cursor-pointer" href="https://www.youtube.com/@kriangkraiidea">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a className="cursor-pointer" href="https://github.com/kriangkraiidea/Hybrid-Animals">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.26-1.68-1.26-1.68-1.03-.7.08-.68.08-.68 1.14.08 1.75 1.17 1.75 1.17 1.01 1.74 2.65 1.24 3.3.95.1-.73.4-1.24.72-1.52-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.17-3.11-.12-.29-.5-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.19-1.5 3.15-1.18 3.15-1.18.61 1.59.24 2.77.12 3.06.73.81 1.17 1.85 1.17 3.11 0 4.43-2.69 5.4-5.25 5.69.41.35.77 1.04.77 2.1 0 1.52-.01 2.75-.01 3.13 0 .31.21.67.8.56A10.53 10.53 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z" />
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default About;
