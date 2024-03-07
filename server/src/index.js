import dotenv from 'dotenv';
import { app } from "./app.js";
import connectDB from "./db/connection.js";


//configration of dotenv
dotenv.config({
    path: './env'
})


connectDB().then(()=>{
    app.on("error",(error)=>{
        console.log("When we try to listen the error arrcored : ",error);
        throw error;
    })
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`Server is running at port : ${process.env.PORT}`);

    })
}).catch((error)=>{
    console.log("Mongo DB connection failed",error);
})