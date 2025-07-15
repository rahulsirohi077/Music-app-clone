import express from 'express'
import { auth } from '../middlewares/auth.js';
import { fetchMusicList, searchTrack, streamTrack } from '../controllers/track.js';

const app = express.Router();

app.get('/fetch-music-list',auth,fetchMusicList)

app.post("/search",auth,searchTrack)

app.get("/stream/:trackId",auth,streamTrack)

export default app;