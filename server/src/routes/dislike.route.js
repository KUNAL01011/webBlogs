import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getDislikeBlog, toggleBlogDislike } from "../controllers/dislike.controller.js";


const router = Router();
router.use(verifyJWT);

router.route('/toggle/v/:blogId').post(toggleBlogDislike );
router.route('/:blogId').get(getDislikeBlog);


export default router;