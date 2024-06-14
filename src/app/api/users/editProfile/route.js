import { NextResponse } from "next/server";

import { connectDB } from "@/dbConfig/dbConnect";
import User from "@/models/User";
connectDB()

export const PATCH = async (request) => {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        await User.findOneAndUpdate({email}, {...reqBody})
        // console.log(reqBody)
        return NextResponse.json({success: true, message: "User profile updated successfully"})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while updating user profile",
        });
    }
}