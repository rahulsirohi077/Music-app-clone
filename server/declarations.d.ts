import { Types, Document } from "mongoose";

export interface IUser extends Document<Types.ObjectId> {
  username: string;
  email: string;
  password: string;
  playlists: Types.ObjectId[];
  refreshToken?: string;
}

export interface ITrack extends Document<Types.ObjectId> {
  title: string;
  artist: string;
  duration: number;
  audioUrl: string;
  thumbnailUrl: string;
}

export interface IPlaylist extends Document<Types.ObjectId> {
  name: string;
  userId: Types.ObjectId;
  tracks: Types.ObjectId[];
}

interface JwtPayload {
  id: string;
}

// Extend Request type to include 'user'
declare module 'express-serve-static-core' {
  interface Request {
    user?: string | object;
  }
}