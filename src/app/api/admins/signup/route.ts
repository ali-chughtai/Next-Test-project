import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/app/utils/databaseConnectionClient";

type Signup = {
  email: string;
  password: string;
  name: string;
};


export async function POST(request: NextRequest) {
  try {
    const db = await connectToDatabase();
    const req: Signup = await request.json();
    const { email, password, name } = req;

    const existingUser = await db.collection("admins").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
    };

    const dbuser = await db.collection("admins").insertOne(newUser);

    const token = jwt.sign({ id: dbuser.insertedId, email: newUser.email, name: newUser.name }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return NextResponse.json({
      success: true,
      message: "Signup successful",
      token,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" });
  }
}