import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    avatar: {
        type: String,
        required: true
    },
    posts: [
        {

        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    }
},{timestamps:true});

//I want to save my password in hashed form so 
//that a pre methoud that can excute when data save in db
//simple baat save karne se phele chalega 

userSchema.pre("save", async(next) => {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next();
})


// this function for creating accessToken
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//that methoud for generating the refreshToken 
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User",userSchema);