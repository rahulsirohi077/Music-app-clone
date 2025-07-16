import express  from "express";
import { auth } from "../middlewares/auth.js";
import { 
  addToPlaylist, 
  createPlayList, 
  removeFromPlayList, 
  fetchAllPlaylists, 
  fetchPlaylistById 
} from "../controllers/playlist.js";

const app = express.Router();

app.post("/create", auth, createPlayList);
app.post("/add", auth, addToPlaylist);
app.post("/remove", auth, removeFromPlayList);
app.get("/fetch-all", auth, fetchAllPlaylists);
app.post("/fetch", auth, fetchPlaylistById);

export default app;