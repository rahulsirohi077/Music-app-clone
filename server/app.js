import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/Db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js'

const app = express();
const PORT = 3000;

dotenv.config({
    path:'./.env',
});

const mongoUri = process.env.MONGO_URL;

connectDB(mongoUri)


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET", "POST", "PUT", "DELETE"]
}))

app.use("/api/v1/user", userRoutes)

app.get("/",(req,res)=>{
    res.send('hello world');
})

app.listen(PORT,()=>{
    console.log("Server is Listening at",PORT);
})
