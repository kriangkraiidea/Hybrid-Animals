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
      <div className="shadow flex md:flex-row flex-col justify-center">
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
        &nbsp;&nbsp;&nbsp;&nbsp;เกมนี้ถูกออกแบบมาเพื่อให้ผู้เล่นทุกวัยได้สนุกและเพลิดเพลินไปกับการเล่นเกม เป้าหมายของเกมคือการใช้การวิเคราะสังเกตุเพื่อหาคำตอบที่ถูกต้อง โดยใช้ตัวเลือกที่กำหนดให้และมีการจำกัดเวลา
          ซึ่งจะเพิ่มความสร้างสรรค์และความท้าทายในการเล่นเกมมากขึ้น หวังว่าทุกท่านจะได้รับความสนุกและประสบการที่ดีจาก{" "}
          <span className="link link-hover text-green-600 font-bold">
            <Link href="/">Hybrid Animals</Link>
          </span>{" "}
          ขอบคุณครับ
        </p>
        <p className="text-lg pt-4">
        &nbsp;&nbsp;&nbsp;&nbsp;ต้องบอกไว้ก่อนว่าผมไม่ได้เรียนในสาขาเกี่ยบกับการเขียนโค้ดมาก่อน แต่เหตุที่ทำให้เกิดโปรเจคนี้ขึ้นมา มาจากการที่ผมได้เรียน Next.js จาก Youtobe ช่อง KongRuksiam ซึ่งเป็นคลิปที่สอนไว้ได้เข้าใจง่ายมาก
          พอดูคลิปและเรียนจนจบก็อยากลองโปรเจคทำอะไรสักอย่างเพื่อจะได้เป็นการทบทวนและนำสิ่งที่เรียนมาไปลองใช้จริง พอเริ่มทำจริงๆก็ทำให้รู้ว่ามีหลายสิ่งที่ต้องเรียนรู้เพิ่มเติมอีกมาก
          สิ่งที่ยากที่สุดสำหรับผลคือ NextAuth เพราะมันมีรายละเอียดต่างๆเยอะมาก จนผมต้องใช้ ChatGPT ในการแก้ปัญหา และผมก็ใช้ ChatGPT ในการทำงานเป็นส่วนใหญ่ ในโปรเจคมีการใช้สอง database เพราะผมต้องการใช้งานเก็บข้อมูลแบบฟรีให้ได้มากที่สุดแค่นั้นไม่มีอะไรมาก
          อาจจะมีหลายจุดที่ชาวเดฟรู้สึกขัดใจต้องขออภัยไว้ ณ ที่นี้ โปรเจคที่ทำขึ้นไม่ได้มีการก็อปปี้มาจากที่อื่นแต่อย่างใด แต่มีการใช้ AI ในการช่วยคิดวิธีการทำงานของส่วนคำนวณ,การสร้างรูปภาพภายในเกมและอื่นๆ สุดท้ายก็ขอขอบคุณทุกคนที่เข้ามาลองเล่นและหวังว่าจะสนุกกับการเล่นเกมนะครับ
        </p>
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
          <h3>Tel : 0989380201</h3>
          <h3>Line ID : ideaofgod</h3>
          <div className="grid grid-flow-col gap-12">
            <a className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default About;
