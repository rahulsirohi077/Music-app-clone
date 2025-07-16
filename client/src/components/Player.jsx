import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CardItem from "./shared/CardItem";
import MusicPlayerSlider from "./MusicPlayerSlider";
import { blue } from "@mui/material/colors";
import {
  FastForwardRounded,
  FastRewindRounded,
  PauseRounded,
  PlayArrowRounded,
} from "@mui/icons-material";
import { trackEndpoints } from "../apis/apis";
const STATIC_URL = import.meta.env.VITE_APP_STATIC_URL;

const Player = ({ selectedTrack }) => {
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const hasInteracted = useRef(false); // Track if user has pressed play at least once

  // Update currentTime as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", updateTime);
    return () => audio.removeEventListener("timeupdate", updateTime);
  }, []);

  // Play/pause audio when state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (paused) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
      hasInteracted.current = true; // Mark that user has interacted
    }
  }, [paused]);

  // When selectedTrack changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    // If user has already interacted, auto-play new track
    if (hasInteracted.current) {
      setPaused(false);
    } else {
      setPaused(true);
    }
    // console.log(`hasInteracted.current = ${hasInteracted.current} and paused = ${paused}`);
  }, [selectedTrack]);

  // Add this effect to handle auto-play when selectedTrack changes and should play
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

  // Handle slider change
  const handleSliderChange = (event, value) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value;
      setCurrentTime(value);
    }
  };

  return (
    <Stack
      sx={{
        flex: 1,
        minHeight: 0,
      }}
    >
      <audio
        ref={audioRef}
        src={`${trackEndpoints.STREAM_MUSIC_API}/${selectedTrack?._id}`} 
        preload="metadata"
      />
      <Container
        sx={{
          // bgcolor:"red",
          // flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "65%",
        }}
      >
        <Card
          sx={{
            maxWidth: 345,
            bgcolor: "transparent",
            width: "100%",
            height: "100%",
          }}
          elevation={0}
        >
          <CardMedia
            component="img"
            alt={`${selectedTrack?.title} Thumbnail`}
            height={"55%"}
            image={STATIC_URL + selectedTrack?.thumbnailUrl}
            sx={{ objectFit: "contain", padding: 0 }}
          />
          <CardContent
            sx={{
              color: "#ececee",
              padding: 0,
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              textAlign={"center"}
              padding={0}
            >
              {selectedTrack?.title}
            </Typography>
            <Typography variant="body2" textAlign={"center"} padding={0}>
              {selectedTrack?.artist}
            </Typography>
          </CardContent>
          <MusicPlayerSlider
            value={Math.floor(currentTime)}
            max={selectedTrack?.duration}
            onChange={handleSliderChange}
          />
        </Card>
      </Container>
      <Box
        flex={1}
        bgcolor={blue[500]}
        sx={{
          borderBottomLeftRadius: 3,
          borderBottomRightRadius: 3,
        }}
      >
        <Container
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" />
          </IconButton>
          <IconButton
            aria-label={paused ? "play" : "pause"}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayArrowRounded sx={{ fontSize: "3rem" }} />
            ) : (
              <PauseRounded sx={{ fontSize: "3rem" }} />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" />
          </IconButton>
        </Container>
      </Box>
    </Stack>
  );
};

export default Player;
