import express from 'express'
import { auth } from '../middlewares/auth.js';
import { Track } from '../models/track.js';
import { fetchMusicList, searchTrack } from '../controllers/track.js';

const app = express.Router();

app.get('/fetch-music-list',auth,fetchMusicList)

app.post("/search",auth,searchTrack)

export default app;