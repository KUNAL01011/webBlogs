import {Request,Response,NextFunction} from 'express';
import {userMondel},{IUser} from "../llll";
import errorheadler 
imposr 
import sendMail from './sendMail';



//controller for register user with email otp
const registerationUser = CatchAsyncError(async(req,res,next) => {
    try {
        const {name,email,password} = req.body;
        const isEmailExist  = await userMondel.findOne({email});

        if(!isEmailExist){
            return next(new errorheadler("Eamil already exist",400));
        }
        const user = {name,email,password};
        const activationToken = createActivationToken(user);

        const activationCode = activationToken.activationCode;

        const data = {user: {name:user.name}, activationCode};
        const html = await ejs.renderFile(path.join(__dirname, '../mail/activation-mial-ejs.html'))

        try {
            await sendMail({
                email: user.email,
                subject: "Activate your account",
                template: 'activation-mail.ejs',
                data,
            });

            res.status(201).json({
                success:true,
                message:`Please check your eail: ${user.email} to activate your accout`,
                activationToken: activationToken.activationCode,
            })


        }catch(error) {
            return next(new errorheadler(error.meassage,400))
        }

    } catch (error) {
        return next(new errorheadler(error.msg,400));
    }
})


exposrt const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({
        user,activationCode
    },
    process.env.ACTIVATION_SECREAT,
    {
        expiresIn: "5m"
    }
    );
    return {token,activationCode};
}




const { userMondel } = require("../llll");
const errorhandler = require("./errorhandler");
const sendMail = require("./sendMail");
const jwt = require("jsonwebtoken");
const path = require("path");
const ejs = require("ejs");

// Controller for registering users with email OTP
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const isEmailExist = await userMondel.findOne({ email });

        if (isEmailExist) {
            return next(new errorhandler("Email already exists", 400));
        }

        const user = { name, email, password };
        const activationToken = createActivationToken(user);
        const activationCode = activationToken.activationCode;
        const data = { user: { name: user.name }, activationCode };
        const html = await ejs.renderFile(path.join(__dirname, '../mail/activation-mail.ejs'));

        try {
            await sendMail({
                email: user.email,
                subject: "Activate your account",
                template: 'activation-mail.ejs',
                data,
            });

            res.status(201).json({
                success: true,
                message: `Please check your email: ${user.email} to activate your account`,
                activationToken: activationToken.activationCode,
            });
        } catch (error) {
            return next(new errorhandler(error.message, 400));
        }

    } catch (error) {
        return next(new errorhandler(error.message, 400));
    }
};

const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({
        user,
        activationCode
    }, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m"
    });
    return { token, activationCode };
};

module.exports = { registerUser };
