import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema(
    {
        name: {
            type:String,
            require:true
        },
        email: {
            type:String,
            require:true
        },
        password: {
            type:String
        },
        highest_score: {
            type:Number,
            require: true,
            default:0
        },
        qty_playing: {
            type:Number,
            require: true,
            default:0
        },
        role: {
            type:String,
            require: true,
            default:"user"
        },
    }, {
        timestamps:true
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User