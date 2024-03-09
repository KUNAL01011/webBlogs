import express from 'express';
import cors from 'cors'

//routes import
import blogRouter from './routes/blog.route.js';

const app = express();

//That accept the req form the frontend
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true
}))

//That allow to accept the json data from the frontend
app.use(express.json());

// static file ko serve kar payege
app.use(express.static("public"));



//routes declaration
app.use('/api/v1/blog',blogRouter);




export {app};