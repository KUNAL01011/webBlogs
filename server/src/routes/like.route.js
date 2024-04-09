import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {toggleBlogLike,getLikedBlog} from '../controllers/like.controller.js';
const router = Router();
router.use(verifyJWT);

router.route('/toggle/v/:blogId').post(toggleBlogLike);
router.route('/:blogId').get(getLikedBlog);


export default router;