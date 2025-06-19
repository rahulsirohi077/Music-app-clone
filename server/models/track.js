import mongoose, { model, Schema } from "mongoose";

const trackSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    artist:{
        type:String,
        required:true,
        trim:true
    },
    duration:{
        type:Number, // in seconds
        required:true
    },
    audioUrl:{
        type:String,
        required:true,
        trim: true
    },
    thumbnailUrl:{
        type:String,
        required:true,
        trim: true
    }
})

export const Track = mongoose.models.Track || model('Track',trackSchema);