import { connectDB } from "@/dbConfig/dbConnect";
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";

connectDB()

export const POST = async (request) => {
    try {
        const reqBody = await request.json();
        const {userName} = reqBody;
        const chats = await Chat.find({$or: [{personOne: userName}, {personTwo: userName}]})
        return NextResponse.json({success: true, message: "Chats fetched successfully", chats})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: "Error while fetching Chats."})
    }
}