// pages/api/get-players.ts
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/model/User";

export async function GET() {
  try {
    await connectMongoDB();

    const players = await User.find({}).sort({ highest_score: -1 }).exec(); // Sort players by highest_score in descending order

    return NextResponse.json(players, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
