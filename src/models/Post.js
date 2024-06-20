import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: String,
    tags: [String],
    file: String,
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },
    comments: [
        {
            createdBy: String,
            message: String,
            createdAt: {
                type: Date,
                default: new Date()
            }
        }
    ]
})

const Post = mongoose.models.Post || mongoose.model("Post",PostSchema)
export default Post