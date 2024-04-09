import { Router } from "express";
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { activateUser, changeCurrentPassword,getUser, getUserChannelProfile, loginUser, logoutUser, registerUser, updateAccountDetails, updateUserAvatar } from "../controllers/user.controller.js";


const router = Router();

router.route("/register").post(registerUser);
router.route("/activate").post(activateUser);
router.route('/login').post(loginUser);

//secured routes

router.route('/logout').post(verifyJWT, logoutUser);
router.route('/change-password').post(verifyJWT,changeCurrentPassword);
router.route('/update-account').patch(verifyJWT,updateAccountDetails);
router.route('/get_user').get(verifyJWT,getUser);
router.route('/get_user/:username').get(getUserChannelProfile);

router.route('/avatar').patch(verifyJWT,upload.single("avatar"), updateUserAvatar);




// router.route('/refresh-token').post(refreshAccessToken);
// router.route('/current-user').get(verifyJWT,getCurrentUser);
// router.route('/posts').get(verifyJWT,getAllPosts);

export default router;

