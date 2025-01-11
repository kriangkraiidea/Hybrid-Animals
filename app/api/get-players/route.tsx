// pages/api/get-players.ts
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/model/User";

export async function GET() {
  try {
    await connectMongoDB();

    const players = await User.find({}).sort({ highest_score: -1 }).exec(); // เรียงลำดับคะแนนสูงสุดจากมากไปน้อย

    return NextResponse.json(players, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "An unknown error occurred." }, { status: 500 });
    }
  }
}
