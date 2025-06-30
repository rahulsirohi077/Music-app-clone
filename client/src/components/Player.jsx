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

const Player = () => {
  const [paused, setPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  // Update duration when metadata is loaded
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const setAudioData = () => setDuration(audio.duration || 0);
    audio.addEventListener("loadedmetadata", setAudioData);
    return () => audio.removeEventListener("loadedmetadata", setAudioData);
  }, []);

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
      audio.play();
    }
  }, [paused]);

  // Handle slider change
  const handleSliderChange = (event, value) => {
    const audio = audioRef.current;
    // console.log("audio = ",audio)
    if (audio) {
      // console.log("audio.currentTime = ",audio.currentTime)
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
        src="/songs/closer.mp3" 
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
            alt="Closer Song Thumnail"
            height={"55%"}
            image="/images/closer.jpeg"
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
              Closer
            </Typography>
            <Typography variant="body2" textAlign={"center"} padding={0}>
              The Chainsmokers
            </Typography>
          </CardContent>
          <MusicPlayerSlider
            value={Math.floor(currentTime)}
            max={duration}
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
