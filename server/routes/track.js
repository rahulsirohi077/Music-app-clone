import express from 'express'
import { auth } from '../middlewares/auth.js';
import { Track } from '../models/track.js';
import { fetchMusicList, searchTrack, streamTrack } from '../controllers/track.js';

const app = express.Router();

app.get('/fetch-music-list',auth,fetchMusicList)

app.post("/search",auth,searchTrack)

app.get("/stream",auth,streamTrack)

export default app;