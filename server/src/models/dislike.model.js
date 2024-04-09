import mongoose,{Schema} from "mongoose";

const dislikeSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    },
    dislikedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})


export const Dislike = mongoose.model("Dislike",dislikeSchema);