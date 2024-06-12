import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/dbConfig/dbConnect";

connectDB();

export const PATCH = async (request) => {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({success: false, message: "Invalid token" });
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
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    user.save();
    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error while resetting password" });
  }
};
