import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/Db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';
import trackRoutes from './routes/track.js';
import playlistRoutes from './routes/playlist.js'
import path from 'path';

global.appRoot = path.resolve();

const app = express();
const PORT = 3000;

dotenv.config({
    path:'./.env',
});

const mongoUri = process.env.MONGO_URL;

connectDB(mongoUri)

app.use('/uploads',express.static("public/data/uploads"))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173","http://localhost:4173"],
    credentials:true,
    methods:["GET", "POST", "PUT", "DELETE"]
}))

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/track", trackRoutes)
app.use("/api/v1/playlist",playlistRoutes)

app.get("/",(req,res)=>{
    res.send('hello world');
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.listen(PORT,()=>{
    console.log("Server is Listening at",PORT);
})
