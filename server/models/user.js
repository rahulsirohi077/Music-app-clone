import { hash } from "bcrypt";
import mongoose, { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    playlists:[
        {
            type:Types.ObjectId,
            ref:"PlayList"
        }
    ]
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await hash(this.password,10);
    next();
})

export const User = mongoose.model.User || model('User',userSchema);