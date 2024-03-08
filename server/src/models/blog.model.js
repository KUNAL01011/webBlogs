import mongoose,{Schema} from 'mongoose';

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    mainImage: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    conclusion: {
        type: String,
        required: true
    }
})

export const Blog = mongoose.model("Blog", blogSchema);