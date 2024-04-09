import { Router } from 'express';
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { getUserFollowersStatus, togglefollow } from '../controllers/follower.controller.js';

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/c/:user_id")
    .get(getUserFollowersStatus)
    .post(togglefollow);

// router.route("/u/:blogId").get(getUserFollowing);

export default router