import { Router } from "express";
import { createBlog,getBlogs } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

//creating router using Router() of express js
const router = Router();


//End point /add-blog , multer middleware, createBlog for creating blog
router.route("/add-blog").post(
  upload.fields([
    {
      name: "mainImage",
      maxCount: 1
    }
  ]),
  createBlog
);
router.route("/get-blog").get(getBlogs);


export default router;