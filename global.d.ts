// global.d.ts
import { MongoClient } from "mongodb";

declare global {
  // เพิ่ม property _mongoClientPromise ให้กับ global
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export {}; // ทำให้ไฟล์นี้เป็นโมดูล TypeScript
