import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// routes imports
import blogRouter from "./routes/blog.route.js";
import userRouter from "./routes/user.route.js";
import commentRouter from './routes/comment.route.js';
import likeRouter from './routes/like.route.js';
import followerRouter from './routes/follower.route.js';

//routes declaration
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/user", userRouter);
app.use('/api/v1/comment',commentRouter);
app.use("/api/v1/like",likeRouter);
app.use("/api/v1/follower",followerRouter);


export { app };
