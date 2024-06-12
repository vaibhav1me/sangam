import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/sendEmail";
import jwt from "jsonwebtoken";

connectDB();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { userName, email, password } = reqBody;
    let user =
      (await User.findOne({ email })) || (await User.findOne({ userName }));
    if (user) {
      if (user.userName == userName) {
        return NextResponse.json({
          success: false,
          message: "This username already exists.",
        });
        
      } else {

      
      return NextResponse.json({
        success: false,
        message: "This email already exists. Please sign in.",
      });}
    }

    // Checking password Strength
    if (
      password.length <= 5 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      return NextResponse.json({
        success: false,
        message:
          "Password must have at least 6 characters, one Uppercase, one Lowercase, one Digit and one special Character.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = await User.create({ email, userName, password: hashedPassword });
    await sendEmail(email, "VERIFY");
    console.log(user._id);
    const token = await jwt.sign(
      { id: user._id, userName, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    const response = NextResponse.json({
      success: true,
      message: "User Created Successfully",
      user,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    console.log("Error while signing up");
    // console.log(error.message);
    if (error.message == "No recipients defined") {
      return NextResponse.json({
        success: false,
        message: "Please enter a valid email address",
      });
      
    }
    return NextResponse.json({success: false, message: "Error while signing up" });
  }
};
