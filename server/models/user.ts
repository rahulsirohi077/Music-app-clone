import { hash } from "bcrypt";
import mongoose, { model, Schema, Types } from "mongoose";
import type { Model } from "mongoose";
import type { IUser } from "../declarations";

const userSchema = new Schema<IUser>({
  username: { 
    type: String, 
    required: true, 
    trim: true
 },
  email: { 
    type: String, 
    required: true, 
    trim: true 
},
  password: { 
    type: String, 
    required: true 
},
  playlists: [
    { 
        type: Types.ObjectId, 
        ref: "PlayList" 
    }
],
  refreshToken: { 
    type: String
},
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 10);
  next();
});

export const User = (mongoose.models.User as Model<IUser>) || model<IUser>("User", userSchema);
