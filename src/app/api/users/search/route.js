import User from "@/models/User";
import { NextResponse } from "next/server";

import { connectDB } from "@/dbConfig/dbConnect";
connectDB()

export const POST = async (request) => {
    try {
        const reqBody = await request.json()
        const {userName} = reqBody;
        const response = await User.find({userName: {$regex: userName, $options: "i"}}, {userName: 1, profilePhoto: 1});
        return NextResponse.json({success: true, message: "Users found", users: response})
    } catch (error) {
        return NextResponse.json({success: false, message: "Error while finding users"})
    }
}