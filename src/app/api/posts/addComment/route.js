import { connectDB } from "@/dbConfig/dbConnect";
import Post from "@/models/Post";
import { NextResponse } from "next/server";
connectDB()

export const POST = async (request) => {
    try {
        const reqBody = await request.json();
        const {postId, comment, userName} = reqBody;
        let post = await Post.findOne({_id: postId})
        let comments = post.comments;
        comments.push({createdBy: userName, message: comment, createdAt: new Date()})
        post.save();
        return NextResponse.json({success: true, message: "Comment added successfully.", post})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: "Error while adding comment."})
    }
}