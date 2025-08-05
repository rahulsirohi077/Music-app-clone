import esClient from "../elastic-client.js";
import type { Request, Response } from "express";
import type { SearchResponse } from "@elastic/elasticsearch/lib/api/types";

interface SearchTrackRequestBody {
  trackTitle?: string;
}

interface TrackSource {
  // Add more fields as per your track schema
  title: string;
  [key: string]: any;
}

interface TrackHit {
  _id: string;
  _source: TrackSource;
}

const searchTrack = async (
  req: Request<{}, {}, SearchTrackRequestBody>,
  res: Response
): Promise<Response> => {
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
            should: words.map((word:string) => ({
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

    // Perform the search in Elasticsearch
    const esResult = await esClient.search(esQuery);

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
      message: error instanceof Error ? error.message:"Something Went Wrong while Searching track elastically",
    });
  }
};