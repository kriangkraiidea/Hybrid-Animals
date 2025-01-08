import { NextResponse } from "next/server";
import User from "@/model/User";
import { connectMongoDB } from "@/lib/mongodb"; // Ensure this matches the export
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { name, email, password } = await req.json();

    if (!password) {
      await User.create({ name, email, password: "" });
      return NextResponse.json({ name, email }, { status: 201 });
    }
    
    // Hash the password
    const hashPassword = bcrypt.hashSync(password, 10);

    // Connect to MongoDB
    await connectMongoDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email }); 
    if (existingUser) {
      return NextResponse.json({ message: "User already Existed" }, { status: 409 });
    }

    // Create a new user
    await User.create({ name, email, password: hashPassword});

    // Return a successful response
    return NextResponse.json({ name, email }, { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ message: "Register failed" }, { status: 500 });
  }
}
