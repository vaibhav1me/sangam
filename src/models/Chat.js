import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  personOne: String,
  personTwo: String,
  messages: [
    {
      sender: String,
      message: String,
      time: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
export default Chat;
