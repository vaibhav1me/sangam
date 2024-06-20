import { connectDB } from "@/dbConfig/dbConnect";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

connectDB()

export const POST = async (request) => {
    try {
        const reqBody = await request.json()
        const {postId, userName} = reqBody
        let post = await Post.findOne({_id: postId})
        let likes = post.likes, likedBy = post.likedBy;
        let response;
        if (likedBy.includes(userName)) {
            const newLikes = likes - 1;
            const index = likedBy.map((name, index) => {
                if (name == userName) {
                    return index;
                }
            })
            likedBy.pop(index)
            response = await Post.findOneAndUpdate({_id: postId}, {...post, likedBy: likedBy, $inc: {likes: -1}}, {new: true})
        } else {
            likedBy.push(userName)
            response = await Post.findOneAndUpdate({_id: postId}, {...post, likedBy: likedBy, $inc: {likes: 1}}, {new: true})
        }
        return NextResponse.json({success: true, message: "Post liked successfully.", response})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: "Error while liking post."})
    }
}