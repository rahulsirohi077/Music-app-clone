import mongoose, { model, Schema, Types } from "mongoose";

const playlistSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    userId:{
        type:Types.ObjectId,
        required:true,
        ref:"User"
    },
    tracks:[
        {
            type:Types.ObjectId,
            ref:"Track"
        }
    ]
})

export const PlayList = mongoose.model.PlayList || model('Playlist',playlistSchema);