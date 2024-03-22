import { Router } from "express";
import { createBlog,getBlogs,deleteBlog } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

//creating router using Router() of express js
const router = Router();


router.route("/getAllBlog").get(getBlogs);



//secure routes
router.use(verifyJWT);// apply verification to all routes

router.route("/add-blog").post(
  upload.fields([
    {
      name: "mainImage",
      maxCount: 1
    }
  ]),
  createBlog
);
router.route('/delete-blog/:id').delete(deleteBlog)
// router.patch();


export default router;