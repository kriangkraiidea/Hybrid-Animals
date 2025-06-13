import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema(
    {
        name: {
            type:String,
            required:true
        },
        email: {
            type:String,
            required:true
        },
        password: {
            type:String
        },
        highest_score: {
            type:Number,
            required: true,
            default:0
        },
        qty_playing: {
            type:Number,
            required: true,
            default:0
        },
        role: {
            type:String,
            required: true,
            default:"user"
        },
    }, {
        timestamps:true
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User