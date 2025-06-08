"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Play() {
  const router = useRouter();
  const startGame = () => {
    localStorage.setItem("playstatus", "onplay");
    router.push("/games/onplay");
  };

  // Function to show modal
  const showModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-5 m-7">
      {/* Game Description */}
      <div className="max-w-2xl text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-emerald-900">ยินดีต้อนรับสู่เกม</h1>

        <div className="flex justify-center mb-4">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/hybrid-animals-9a289.appspot.com/o/lion%20head.png?alt=media&token=caee7b5d-43bd-492e-8cc0-c01cd8cdfd6d"
            alt="Hybrid Animals Logo"
            width={128}
            height={128}
            className="rounded-full"
          />
        </div>

        <h1 className="text-6xl font-bold mb-4 py-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">&quot;Hybrid Animals&quot;</h1>
        <p className="text-lg mb-4">
          ในเกมนี้ คุณจะได้ทดสอบความรู้และการสังเกตุของคุณเกี่ยวกับสัตว์ไฮบริด เราจะแสดงภาพของสิ่งมีชีวิตสุดแปลกให้คุณดู และคุณจะต้องเลือกชื่อสัตว์ที่ถูกต้องที่มาจากการรวมกันของสัตว์ไฮบริดตัวนั้น
          คุณสามารถเรียนรู้{" "}
          <span className="link link-hover text-blue-600" onClick={showModal}>
            วิธีการเล่น
          </span>{" "}
          ก่อนเริ่มเกมได้
        </p>

        {/* Modal for How to Play */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h2 className="text-2xl font-semibold mb-4">วิธีการเล่น</h2>
            <ul className="text-left list-disc list-inside mb-4">
              <li>
                <b>เริ่มเกม:</b> กดปุ่ม &quot;Start Game&quot; เพื่อเริ่มต้นการเล่น
              </li>
              <li>
                <b>ดูภาพ:</b> คลิกที่กลางภาพแล้วจะมีภาพของสัตว์ไฮบริดจะปรากฏบนหน้าจอ
              </li>
              <li>
                <b>เลือกคำตอบ:</b> เลือกสัตว์แต่ละชนิดที่มีการจัดเป็นหมวดหมู่ด้านล่างที่คุณคิดว่าสามารถรวมกันเป็นสัตว์ไฮบริดตัวที่แสดงบนหน้าจอได้ และคลิกที่ &quot;อีโมจิ confirm&quot; เพื่อยืนยันคำตอบ
              </li>
              <li>
                <b>เก็บคะแนน:</b> ระบบจะเก็บสะสมคะแนนให้กับคุณตามความเร็วในการตัดสินใจและความถูกต้องของคำตอบของคุณ
              </li>
              <li>
                <b>เล่นต่อ:</b> เมื่อคุณตอบถูกภาพถัดไปจะถูกแสดงออกมาและเพิ่มระดับความยากมากขึ้นตามลำดับ
              </li>
              <li>
                <b className="text-red-700">วิธียกเลิกคำตอบ:</b> คุณสามารถคลิกที่ภาพสัตว์ที่คุณเลือกมาแล้วเพื่อลบสัตว์ตัวนั้นออกจากคำตอบ
              </li>
            </ul>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <div className="divider divider-primary text-primary"> V </div>
      </div>

      {/* Start Game Button */}
      <button
        onClick={startGame}
        className="bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-3xl transition-transform transform hover:scale-110 hover:bg-emerald-700 active:scale-95 active:bg-emerald-600 shadow-xl shadow-gray-500  hover:shadow-gray-400"
      >
        Start Game
      </button>
      <br />
      <p className="text-xl mt-6 font-semibold text-emerald-900">พร้อมแล้วหรือยัง? กดปุ่ม &quot;Start Game&quot; และทดสอบความรู้ของคุณได้เลย!</p>
    </div>
  );
}
