import mongoose, { Model, model, Schema } from "mongoose";
import type { ITrack } from "../declarations";

const trackSchema = new Schema<ITrack>({
  title: { 
    type: String, 
    required: true, 
    trim: true
 },
  artist: { 
    type: String, 
    required: true, 
    trim: true
 },
  duration: { 
    type: Number, 
    required: true
 },
  audioUrl: { 
    type: String, 
    required: true,
    trim: true
 },
  thumbnailUrl: { 
    type: String, 
    required: true, 
    trim: true 
 },
});

export const Track = (mongoose.models.Track as Model<ITrack>) || model<ITrack>("Track", trackSchema);
