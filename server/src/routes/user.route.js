import {Router} from 'express';
import {upload} from '../middlewares/multer.middleware.js';
import { activateUser, changeCurrentPassword, getCurrentUser, getPosts, getUserChannelProfile, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccoutDetails, updateUserAvatar } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = Router();

router.route('/register').post(registerUser);
router.route('/activate_user').post(activateUser);


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


// {
//     user: {
//       _id: '65f90074d4aa1e28e220b75c',
//       fullName: 'kunal kumar',
//       email: 'kunal34255@gmail.com',
//       isActive: false,
//       createdAt: '2024-03-19T03:03:16.914Z',
//       updatedAt: '2024-03-19T03:03:16.914Z',
//       __v: 0
//     },
//     activationCode: '9208',
//     iat: 1710817397,
//     exp: 1710817697
//   }