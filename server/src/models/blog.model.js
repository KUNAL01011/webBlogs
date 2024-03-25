import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
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
      required: true,
    },
    imageCloudId: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
