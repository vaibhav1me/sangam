import { connectDB } from "@/dbConfig/dbConnect"
import Post from "@/models/Post";
import { NextResponse } from "next/server";

connectDB();

export const POST = async (request) => {
    try {
        const reqBody = await request.json();
        const {title, description, createdBy, tags, file, links} = reqBody;
        const post = await Post.create({title, description, createdBy, tags, file, links})
        return NextResponse.json({success: true, message: "Post created successfully", post})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: "Error while creating Post"})
    }
}