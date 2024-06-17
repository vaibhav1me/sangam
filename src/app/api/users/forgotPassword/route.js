import { connectDB } from "@/dbConfig/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/sendEmail";

connectDB();
export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email }, { email: 1 });
    if (!user) {
      return NextResponse.json({
        message: "This user does not exist. Please enter a correct email",
      });
    }
    await sendEmail(email, "RESET");
    return NextResponse.json({ message: "Mail sent successfully." });
  } catch (error) {
    console.log(error);
    console.log("Error while generating forgotPasswordEmail");
    if (error.message == "No receipients defined") {
      return NextResponse.json({
        message: "Please enter a valid email",
      });
    }
    return NextResponse.json({
      message: "Error while generating forgotPasswordEmail",
    });
  }
};
