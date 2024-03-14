import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//routes import
import blogRouter from "./routes/blog.route.js";
import userRouter from "./routes/user.route.js";

const app = express();



// middlewares that can allow me to do something 
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(cookieParser());





//routes declaration
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/user", userRouter);

export { app };
