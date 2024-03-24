import {Router} from 'express';
import {upload} from '../middlewares/multer.middleware.js';
import { 
    loginUser, 
    registerUser, 
    activateUser
} from "../controllers/user.controller.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = Router();

router.route("/register").post(registerUser);
router.route('/activate-user').post(activateUser);
router.route("/login").post(loginUser);

export default router;

