import {Router} from 'express';
import {upload} from '../middlewares/multer.middleware.js';
import { changeCurrentPassword, getCurrentUser, getPosts, getUserChannelProfile, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccoutDetails, updateUserAvatar } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = Router();

router.route('/register').post(registerUser);








router.route('/login').post(loginUser);


router.route('/logout').post(verifyJWT,logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/change-password').post(verifyJWT,changeCurrentPassword);
router.route('/current-user').get(verifyJWT,getCurrentUser);
router.route('/update-account').patch(verifyJWT,updateAccoutDetails);


router.route('/avatar').patch(verifyJWT,upload.single('avatar'),updateUserAvatar);


router.route('/c/:email').get(verifyJWT,getUserChannelProfile);
router.route('/posts').get(verifyJWT,getPosts);



export default router;