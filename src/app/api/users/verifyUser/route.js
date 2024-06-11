import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { connectDB } from "@/dbConfig/dbConnect";
import User from "@/models/User";

connectDB();

export const GET = async (request) => {
    try {
      const cookie = request.cookies.get("token");
      // console.log(cookie.value)
      const data = jwt.verify(cookie.value, process.env.JWT_SECRET);
      // console.log(data)
      const email = data.email;
      const user = await User.find({ email });
      return NextResponse.json({
        success: true,
        message: "User Verified Successfully",
        user,
      });
    } catch (error) {
        return NextResponse.json({ success: false, message: "User Verification Error" });
    }
}