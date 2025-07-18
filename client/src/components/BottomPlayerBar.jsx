import React, { useRef, useState, useEffect } from "react";
import { Box, IconButton, Typography, Stack } from "@mui/material";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import PauseRounded from "@mui/icons-material/PauseRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import MusicPlayerSlider from "./MusicPlayerSlider";
import { trackEndpoints } from "../apis/apis";

const STATIC_URL = import.meta.env.VITE_APP_STATIC_URL;

const BottomPlayerBar = ({ selectedTrack }) => {
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const hasInteracted = useRef(false);

  // Reset audio and time when track changes, and auto-play if user interacted
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);

    if (hasInteracted.current) {
      setPaused(false); // auto-play new track
    } else {
      setPaused(true);
    }
  }, [selectedTrack]);

  // Play/pause audio when state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (paused) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
      hasInteracted.current = true; // Mark user has interacted
    }
  }, [paused]);

  // Update currentTime as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", updateTime);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [selectedTrack]);

  // Reset player when track ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      setPaused(true);
      setCurrentTime(0);
      audio.currentTime = 0;
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [selectedTrack]);

  // Auto-play when audio can play and user has interacted
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const tryAutoPlay = () => {
      if (!paused && hasInteracted.current) {
        audio.play().catch(() => {});
      }
    };
    audio.addEventListener("canplay", tryAutoPlay);
    return () => {
      audio.removeEventListener("canplay", tryAutoPlay);
    };
  }, [selectedTrack, paused]);

  const handleSliderChange = (_, value) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value;
      setCurrentTime(value);
    }
  };

  if (!selectedTrack) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        bgcolor: "#212028",
        color: "#ececee",
        zIndex: 1300,
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1,
        boxShadow: 8,
        height: "16%",
      }}
    >
      <audio
        ref={audioRef}
        src={`${trackEndpoints.STREAM_MUSIC_API}/${selectedTrack?._id}`}
        preload="metadata"
      />
      <Stack width={"100%"} sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
        <Stack direction={"row"}>
          <Box
            component="img"
            src={STATIC_URL + selectedTrack.thumbnailUrl}
            alt={selectedTrack.title}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              objectFit: "cover",
              mr: 2,
            }}
          />
          <Stack sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              noWrap
              sx={{ fontWeight: 700, maxWidth: "100%" }}
            >
              {selectedTrack.title}
            </Typography>
            <Typography
              variant="caption"
              color="grey.500"
              noWrap
              sx={{ maxWidth: "100%" }}
            >
              {selectedTrack.artist}
            </Typography>
          </Stack>
        </Stack>
        <Box width={"70%"} ml={3}>
          <MusicPlayerSlider
            value={Math.floor(currentTime)}
            max={selectedTrack.duration}
            onChange={handleSliderChange}
          />
        </Box>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ ml: 2 }}>
          <IconButton color="primary" aria-label="Previous">
            <FastRewindRounded sx={{ fontSize: "2rem" }} />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => setPaused((prev) => !prev)}
            aria-label={paused ? "Play" : "Pause"}
          >
            {paused ? (
              <PlayArrowRounded sx={{ fontSize: "2rem" }} />
            ) : (
              <PauseRounded sx={{ fontSize: "2rem" }} />
            )}
          </IconButton>
          <IconButton color="primary" aria-label="Next">
            <FastForwardRounded sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BottomPlayerBar;