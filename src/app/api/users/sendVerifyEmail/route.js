// This route is for regenerating verification email if the user does not verify Email and the token gets expired

import { sendEmail } from "@/helpers/sendEmail";
import User from "@/models/User";
import { NextResponse } from "next/server";

import { connectDB } from "@/dbConfig/dbConnect";

connectDB();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "This accound does not exist. Please enter correct email",
      });
    }
    await sendEmail(email, "VERIFY");
    return NextResponse.json({
      message: "Verification email sent successfully",
    });
  } catch (error) {
    console.log("Error while sending verification email");
    return NextResponse.json({
      message: "Error while receiving verification email",
    });
  }
};
