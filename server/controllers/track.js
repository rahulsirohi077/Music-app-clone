import { Track } from "../models/track.js";
import fs from "fs";
import path from "path";
import esClient from "../elastic-client.js";


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

    // Split the search query into words for multi-word search
    const words = trackTitle.trim().split(" ");

    // Build Elasticsearch query to match any of the words in the title (case-insensitive)
    const esQuery = {
      index: "tracks", // Make sure this matches your ES index name
      body: {
        query: {
          bool: {
            should: words.map((word) => ({
              match_phrase: {
                title: {
                  query: word,
                  slop: 0,
                },
              },
            })),
            minimum_should_match: 1,
          },
        },
      },
    };
    // console.log("Es query = ",JSON.stringify(esQuery))

    // Perform the search in Elasticsearch
    const esResult = await esClient.search(esQuery);
    // console.log("es Result",esResult.hits.hits);

    // Extract unique tracks from hits
    const uniqueTracksMap = new Map();
    esResult.hits.hits.forEach((hit) => {
      uniqueTracksMap.set(hit._id, hit._source);
    });
    const uniqueTracks = Array.from(uniqueTracksMap.values());

    if (uniqueTracks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Track Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Track Fetched Successfully",
      tracks: uniqueTracks,
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};
// my original written search track
// const searchTrack = async (req, res) => {
//   try {
//     const { trackTitle } = req.body;

//     if (!trackTitle) {
//       return res.status(403).json({
//         success: false,
//         message: "Track Title is missing",
//       });
//     }

//     let totalTracks = trackTitle.trim().split(" ").map((word) => {
//       return Track.find({
//         // title: { $regex: word, $options: "i" },
//         title: { $regex: `\\b${word}\\b`, $options: "i" },
//       });
//     });

//     let results = await Promise.all(totalTracks);

//     results = results.flat();

//     const uniqueTracksMap = new Map();
//     results.forEach((track) => {
//       uniqueTracksMap.set(track._id.toString(), track);
//     });
//     const uniqueTracks = Array.from(uniqueTracksMap.values());

//     // totalTracks.push(
//     //   await Track.find({
//     //     title: { $regex: trackTitle, $options: "i" },
//     //   })
//     // );

//     if (uniqueTracks.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No Track Found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Track Fetched Successfully",
//       tracks: uniqueTracks,
//     });
//   } catch (error) {
//     // console.log(error);
//     return res.status(403).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const streamTrack = async (req, res) => {
  try {
    const { trackId } = req.params;

    if (!trackId) {
      return res.status(403).json({
        success: false,
        message: "Please Provide trackId",
      });
    }

    const track = await Track.findById(trackId);

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
