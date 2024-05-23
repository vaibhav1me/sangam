import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

connectDB();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { userName, email, password } = reqBody;
    let user =
      (await User.findOne({ email })) || (await User.findOne({ userName }));
    if (user) {
      return NextResponse.json({
        message: "This email already exists. Please sign in",
      });
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
        message:
          "Password must have at least 6 characters, one Uppercase, one Lowercase, one Digit and one special Character",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = await User.create({ email, userName, password: hashedPassword });
    return NextResponse.json({ message: "User Created Successfully", user });
  } catch (error) {
    console.log(error.message.stack);
    return NextResponse.json({ message: error.message });
  }
};
