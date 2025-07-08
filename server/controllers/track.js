import { Track } from "../models/track.js";

const fetchMusicList = async (req, res) => {
  try {
    const musicList = await Track.find();

    return res.status(200).json({
      success: true,
      message: "Music List Fetched Successfully",
      musicList,
    });
  } catch (error) {
    // console.log(error);
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

const searchTrack = async (req, res) => {
  try {
    const { trackTitle } = req.body;

    if (!trackTitle) {
      return res.status(403).json({
        success: false,
        message: "Track Title is missing",
      });
    }

    const track = await Track.find({
      title: { $regex: trackTitle, $options: "i" },
    });

    if (!track) {
      return res.status(404).json({
        success: false,
        message: "Track Does Not Exist",
      });
    }

    return res.status(200).json({
        success:true,
        message:"Track Fetched Successfully",
        track
    })
  } catch (error) {
    // console.log(error);
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

export { fetchMusicList, searchTrack };