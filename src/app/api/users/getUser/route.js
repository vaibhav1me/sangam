import { connectDB } from "@/dbConfig/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";


connectDB()

export const POST = async (request) => {
    try {
        const reqBody = await request.json();
        const {userName} = reqBody;
        const user = await User.find({userName}, {userName: 1, profilePhoto: 1, followers: 1, following: 1})
        return NextResponse.json({success: true, message: "User found successfully", user})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: "Error while fetching Profile."})
    }
}