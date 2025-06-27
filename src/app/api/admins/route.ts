import { connectToDatabase } from "@/app/utils/databaseConnectionClient";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type Login = {
  email: string;
  password: string;
};

; 
export async function POST(request: NextRequest) {
  try {
    const db = await connectToDatabase();
    const req: Login = await request.json();

    const { email, password } = req; 
    console.log(`Email ${email} and ${password}`)

    const admin = await db.collection("admins").findOne({ email });

    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin not found" });
    }


    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email }, 
      process.env.JWT_SECRET!, 
      { expiresIn: "1h" } 
    );
    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" });
  }
}