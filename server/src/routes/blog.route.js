import { Router } from "express";
import { deleteBlog, getAllBlogs, publishABlog, updateBlog,togglePublishStatus } from '../controllers/blog.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();


router.route("/").get(getAllBlogs);

router.use(verifyJWT);
router.route('/create-blog').post(upload.single("mainImage"),publishABlog);

router.route('/:blogId').delete(deleteBlog);
router.route('/:blogId').patch(upload.single('mainImage'),updateBlog);
router.route('/toggle/publish/:blogId').patch(togglePublishStatus);

// router.route('/:blogId').get(getBlogById);

export default router;