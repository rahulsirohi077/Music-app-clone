import express from "express";
import {
  getUser,
  login,
  Logout,
  refreshTokens,
  signUp,
  updateInfo,
} from "../controllers/user.js";
import { auth } from "../middlewares/auth.js";
import multer from "multer";

const app = express.Router();
const upload = multer({ dest: "./public/data/uploads/profilePics" });

app.post("/login", login);
app.post("/signup", signUp);

app.post("/refresh", refreshTokens);
app.post(
  "/update-info",
  auth,
  upload.single("profilePic"),
  updateInfo
);

app.get("/get-user-info", auth, getUser);
app.get("/logout",auth,Logout)

export default app;
