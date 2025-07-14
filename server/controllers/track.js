import { Track } from "../models/track.js";
import fs from "fs";
import path from "path";

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
      success: true,
      message: "Track Fetched Successfully",
      track,
    });
  } catch (error) {
    // console.log(error);
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

const streamTrack = async (req, res) => {
  try {
    const { trackTitle } = req.params;

    if (!trackTitle) {
      return res.status(403).json({
        success: false,
        message: "Please Provide trackTitle",
      });
    }

    const track = await Track.findOne({
      title: { $regex: trackTitle, $options: "i" },
    });

    if (!track) {
      return res.status(404).json({
        success: false,
        message: "Track Does Not Exist",
      });
    }

    const filePath = path.join(global.appRoot, "/public/data", track.audioUrl);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        return res.status(404).send("File not found");
      }

      const range = req.headers.range;
      if (!range) {
        return res.status(416).send("Requires Range header");
      }

      const CHUNK_SIZE = 10 ** 6; // 1MB
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, stats.size - 1);

      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${stats.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "audio/mpeg",
      };

      res.writeHead(206, headers);
      const stream = fs.createReadStream(filePath, { start, end });
      stream.pipe(res);
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

export { fetchMusicList, searchTrack, streamTrack };
