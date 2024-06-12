import { connectDB } from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import User from "@/models/User";

connectDB();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {success: false , message: "Invalid token" },
      );
    }
    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {success: false, message: "Error while verifying email" },
      {
        status: 500,
      }
    );
  }
};
