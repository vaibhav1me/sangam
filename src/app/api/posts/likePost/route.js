import { connectDB } from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";

connectDB()

export const POST = async (request) => {
    try {
        const reqBody = await request.json()
        const {postId, userName} = reqBody
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: "Error while liking post."})
    }
}