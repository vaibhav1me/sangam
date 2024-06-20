import { connectDB } from "@/dbConfig/dbConnect";
import Post from "@/models/Post";
import { NextResponse } from "next/server";
connectDB()

export const GET = async (request) => {
    try {
        const response = await Post.find({}).sort({createdAt: -1});
        return NextResponse.json({success: true, message: "Posts fetched successfully", posts: response})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: "Error while fetching posts."})
    }
}