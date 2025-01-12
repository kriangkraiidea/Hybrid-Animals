// pages/api/stats.ts
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/model/User";
export const dynamic = 'force-static'; // ✅ ทำให้ API กลายเป็น Static

export async function GET() {
  try {
    await connectMongoDB();

    const totalUser = await User.countDocuments();
    const totalPlayGame = await User.aggregate([
      { $group: { _id: null, totalQtyPlaying: { $sum: "$qty_playing" } } }
    ]);

    const totalPlayGameCount = totalPlayGame.length > 0 ? totalPlayGame[0].totalQtyPlaying : 0;

    return NextResponse.json({ totalUser, totalPlayGame: totalPlayGameCount }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "An unknown error occurred." }, { status: 500 });
    }
  }
}
