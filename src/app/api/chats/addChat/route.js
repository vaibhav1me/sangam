import { connectDB } from "@/dbConfig/dbConnect"
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";
connectDB()

export const POST = async (request) => {
    try {
        const reqBody = await request.json()
        const {sender, receiver, message} = reqBody;
        const chat = await Chat.findOne({$or: [{personOne: sender, personTwo: receiver}, {personOne: receiver, personTwo: sender}]})
        if (chat) {
            chat.messages.push({sender, message})
            await Chat.findOneAndUpdate({$or: [{personOne: sender, personTwo: receiver}, {personOne: receiver, personTwo: sender}]}, {...chat, messages: chat.messages})
        }
        else {
            let personOne, personTwo;
            if (sender > receiver) {
                personOne = receiver;
                personTwo = sender;
            } else {
                personOne = sender;
                personTwo = receiver;
            }
            await Chat.create({personOne, personTwo, messages: [{sender, message}]})
        }
        return NextResponse.json({success: true, message: "Chat added successfully"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: "Error while adding Chat."})
    }
}