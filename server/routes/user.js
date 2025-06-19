import express from 'express';
import { login, signUp } from '../controllers/user.js';

const app = express.Router();

app.post("/login",login);
app.post("/signup",signUp);


export default app;