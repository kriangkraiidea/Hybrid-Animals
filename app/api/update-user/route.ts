import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/model/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const { score } = await req.json();
    await connectMongoDB();

    await User.updateOne(
      { email: session.user.email },
      {
        $inc: { qty_playing: 1 },
        $max: { highest_score: score },
        $setOnInsert: {
          name: session.user.name,
          image: session.user.image,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ message: "User data updated or inserted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
