import { PlayList } from "../models/playlist.js";
import type { Request, Response } from "express";

// Create a new playlist for the user
const createPlayList = async (req: Request, res: Response) => {
  try {
    // fetch data
    const { playListName } = req.body;
    // validate data
    if (!playListName) {
      return res.status(403).json({
        success: false,
        message: "Please Provide PlayList Name",
      });
    }
    // check if playlist already exists for the requesting user
    const playlist = await PlayList.find({
      name: playListName.toLowerCase(),
      userId: (req.user as any).id,
    });
    // if exist send error res
    if (playlist.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Playlist already exists",
      });
    }
    // if not exist, create a new playlist with given credentials
    const newPlaylist = await PlayList.create({
      name: playListName.toLowerCase(),
      userId: (req.user as any).id,
      tracks: [],
    });
    // after creation send the res 
    return res.status(201).json({
      success: true,
      message: "Playlist created successfully",
      playlist: newPlaylist,
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

// Add a track to a playlist
const addToPlaylist = async (req: Request, res: Response) => {
  try {
    // fetch data
    const { playListId, playListName, trackId } = req.body;

    // validate data
    if ((!playListId && !playListName) || !trackId) {
      return res.status(403).json({
        success: false,
        message: "Please provide trackId and either playListId or playListName",
      });
    }

    let playlist;

    // If playListId is provided, find by ID
    if (playListId) {
      playlist = await PlayList.findOne({
        _id: playListId,
        userId: (req.user as any).id,
      });
      if (!playlist) {
        return res.status(404).json({
          success: false,
          message: "Playlist not found",
        });
      }
    } else if (playListName) {
      // If playListName is provided
      playlist = await PlayList.findOne({
        name: playListName,
        userId: (req.user as any).id,
      });

      // If playlist name is "favorites" and doesn't exist, create it
      if (!playlist && playListName.toLowerCase() === "favorites") {
        playlist = await PlayList.create({
          name: "favorites",
          userId: (req.user as any).id,
          tracks: [],
        });
      }

      // If playlist still not found (for other names), send error
      if (!playlist) {
        return res.status(404).json({
          success: false,
          message: "Playlist not found",
        });
      }
    }

    // Check if playlist is defined before using
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }
    // Check if track already exists in playlist
    if (playlist.tracks.includes(trackId)) {
      return res.status(409).json({
        success: false,
        message: "Track already in playlist",
      });
    }

    // Add track to playlist
    playlist.tracks.push(trackId);
    await playlist.save();

    // after addition send the res
    return res.status(200).json({
      success: true,
      message: "Track added to playlist",
      playlist,
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

// Remove a track from a playlist
const removeFromPlayList = async (req: Request, res: Response) => {
  try {
    // fetch data
    const { playListId, trackId } = req.body;
    // validate data
    if (!playListId || !trackId) {
      return res.status(403).json({
        success: false,
        message: "Please provide both playListId and trackId",
      });
    }
    // find the playlist for the requesting user
    const playlist = await PlayList.findOne({
      _id: playListId,
      userId: (req.user as any).id,
    });
    // if playlist not found send error res
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }
    // check if track exists in playlist
    if (!playlist.tracks.includes(trackId)) {
      return res.status(404).json({
        success: false,
        message: "Track not found in playlist",
      });
    }
    // remove track from playlist
    playlist.tracks = playlist.tracks.filter((id: { toString: () => any; }) => id.toString() !== trackId.toString());
    await playlist.save();
    // after removal send the res
    return res.status(200).json({
      success: true,
      message: "Track removed from playlist",
      playlist,
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

// Fetch all playlists for the requesting user
const fetchAllPlaylists = async (req: Request, res: Response) => {
  try {
    // fetch all playlists for the user
    const playlists = await PlayList.find({ userId: (req.user as any).id }).populate("tracks");

    // Add trackCount to each playlist
    const playlistsWithCount = playlists.map(playlist => ({
      ...playlist.toObject(),
      trackCount: playlist.tracks.length,
    }));

    // send the playlists as response
    return res.status(200).json({
      success: true,
      playlists: playlistsWithCount,
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

// Fetch a particular playlist by playListId for the requesting user
const fetchPlaylistById = async (req: Request, res: Response) => {
  try {
    // fetch playListId from params or body
    const playListId = req.params.playListId || req.body.playListId;
    // validate playListId
    if (!playListId) {
      return res.status(403).json({
        success: false,
        message: "Please provide playListId",
      });
    }
    // find the playlist for the user
    const playlist = await PlayList.findOne({
      _id: playListId,
      userId: (req.user as any).id,
    });
    // if playlist not found send error res
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }
    // send the playlist as response
    return res.status(200).json({
      success: true,
      playlist,
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export { createPlayList, addToPlaylist, removeFromPlayList, fetchAllPlaylists, fetchPlaylistById };
