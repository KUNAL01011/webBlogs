import mongoose,{Schema} from "mongoose";

const commentSchema = new Schema({
    content: {
        type: String
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    },
    commentBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})


export const Comment = mongoose.model("Comment",commentSchema);