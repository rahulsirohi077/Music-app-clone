import express from 'express';
import { getUser, login, refreshTokens, signUp } from '../controllers/user.js';
import { auth } from '../middlewares/auth.js';

const app = express.Router();

app.post("/login",login);
app.post("/signup",signUp);

app.post("/refresh",refreshTokens);
app.get("/get-user-info",auth,getUser);


export default app;