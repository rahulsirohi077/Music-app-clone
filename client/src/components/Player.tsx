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
import type { Track } from "../types";

const STATIC_URL = import.meta.env.VITE_APP_STATIC_URL;

interface PlayerProps {
  selectedTrack: Track | null;
}

const Player: React.FC<PlayerProps> = ({ selectedTrack }) => {
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false); // Track if user has pressed play at least once

  // Handle audio reset and timeupdate when selectedTrack changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset audio and currentTime
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);

    // If user has already interacted, auto-play new track
    if (hasInteracted.current) {
      setPaused(false);
    } else {
      setPaused(true);
    }

    // Setup timeupdate listener
    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", updateTime);

    // Cleanup
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [selectedTrack]);

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

  // Handle auto-play when selectedTrack changes and should play
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
  const handleSliderChange = (_event: Event, value: number | number[]) => {
    const audio = audioRef.current;
    const newValue = Array.isArray(value) ? value[0] : value;
    if (audio) {
      audio.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

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

  if (!selectedTrack)
    return <Typography align="center">Please Select a track</Typography>;

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
