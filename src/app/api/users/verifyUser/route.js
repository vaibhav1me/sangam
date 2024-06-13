import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { connectDB } from "@/dbConfig/dbConnect";
import User from "@/models/User";
import { cookies } from "next/headers";

connectDB();

export const GET = async (request) => {
    try {
      const token = cookies().get("token")
      // console.log(token)
      // console.log(cookie.value)
      const data = jwt.verify(token.value, process.env.JWT_SECRET);
      // console.log(data)
      const email = data.email;
      const user = await User.find({ email });
      return NextResponse.json({
        success: true,
        message: "User Verified Successfully",
        user,
      });
    } catch (error) {
        return NextResponse.json({error: error, success: false, message: "User Verification Error" });
    }
}