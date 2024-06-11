import { connectDB } from "@/dbConfig/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({success: false, message: "This email does not exist. Please create an account." });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({success: false, message: "Incorrect Password" });
    }
    const token = jwt.sign(
      { id: user._id, userName: user.userName, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    const response = NextResponse.json({
      success: true,
      message: "Logged In Successfully",
      user,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Logging In Error" });
  }
};
