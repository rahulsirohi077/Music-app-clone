import mongoose, { model, Schema, Types, Document, Model } from "mongoose";
import type { IPlaylist } from "../declarations";

const playlistSchema = new Schema<IPlaylist>({
  name: { 
    type: String, 
    required: true, 
    trim: true
 },
  userId: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: "User"
 },
  tracks: [
    { 
        type: Types.ObjectId, 
        ref: "Track"
    }
],
});

export const PlayList = (mongoose.models.PlayList as Model<IPlaylist>) 
|| model<IPlaylist>("Playlist", playlistSchema);
