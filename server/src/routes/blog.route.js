import { Router } from "express";
import {
  createBlog,
  getBlogs,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

//creating router using Router() of express js
const router = Router();



router.route("/get-blogs").get(getBlogs);

//secure routes
router.route("/create-blog").post(
  verifyJWT,
  upload.fields([
    {
      name: "mainImage",
      maxCount: 1,
    },
  ]),
  createBlog
);
router.route("/delete-blog/:id").delete(verifyJWT, deleteBlog);


export default router;
