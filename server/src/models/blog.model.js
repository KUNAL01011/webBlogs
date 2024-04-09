import mongoose,{Schema} from "mongoose";

const blogSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true
    },
    mainImage: {
        type: String,
        required: true
    },
    mainImageCloudId: {
        type:String
    },
    content: {
        type: String,
        required: true
    },
    conclusion: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    tags: [
        {
            type: String,
        }
    ],
    category: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

},{timestamps:true})


export const Blog = mongoose.model("Blog",blogSchema);

