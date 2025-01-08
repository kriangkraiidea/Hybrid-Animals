"use client";

import { useState } from "react";

type Creature = {
  imageUrl: string;
  descriptionPart1: string;
  descriptionPart2: string;
};

const creatures: Creature[] = [
  { imageUrl: "https://img.freepik.com/free-photo/dystopian-landscape-with-car-water_23-2149369693.jpg", descriptionPart1: "หัวงู", descriptionPart2: "ขาลิง" },
  { imageUrl: "/creature2.png", descriptionPart1: "ปีกแมลง", descriptionPart2: "หางเสือ" },
  // เพิ่ม creature อื่นๆ ได้ที่นี่
];

export default function GamePage() {
  const [selectedCreature] = useState(creatures[0]); // เริ่มต้นด้วย creature ตัวแรก
  const [selectedPart1, setSelectedPart1] = useState("");
  const [selectedPart2, setSelectedPart2] = useState("");

  return (
    <div className="flex flex-col items-center p-8">
      <ul className="steps steps-vertical sm:steps-horizontal mb-4">
        <li className="step step-primary">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;รอบที่ 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
        <li className="step ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;รอบที่ 2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
        <li className="step ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;รอบที่ 3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
      </ul>
      <div className="diff aspect-[16/9] rounded-xl">
        <div className="diff-item-1">
          <img src={selectedCreature.imageUrl} alt="strange creature" />
        </div>
        <div className="diff-item-2">
          <img src={selectedCreature.imageUrl} alt="strange creature" className="blur-2xl" />
        </div>
        <div className="diff-resizer"></div>
      </div>
      <div className="mt-4 flex justify-center gap-4 ">
        <select className="select select-primary w-full min-w-full px-3" onChange={(e) => setSelectedPart1(e.target.value)}>
          <option disabled selected >เลือกส่วนแรก</option>
          <option>หัวงู</option>
          <option>ปีกแมลง</option>
          {/* เพิ่มคำตอบอื่นๆ */}
        </select>
        <select className="select select-primary w-full min-w-full" onChange={(e) => setSelectedPart2(e.target.value)}>
          <option disabled selected >เลือกส่วนที่สอง</option>
          <option>ขาลิง</option>
          <option>หางเสือ</option>
          {/* เพิ่มคำตอบอื่นๆ */}
        </select>
      </div>
      <button
        className="btn mt-4"
        onClick={() => {
          if (selectedPart1 === selectedCreature.descriptionPart1 && selectedPart2 === selectedCreature.descriptionPart2) {
            alert("ถูกต้อง!");
          } else {
            alert("ลองอีกครั้ง!");
          }
        }}
      >
        ตรวจคำตอบ
      </button>
    </div>
  );
}
