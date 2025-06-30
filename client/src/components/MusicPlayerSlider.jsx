import {
  FastForwardRounded,
  FastRewindRounded,
  PauseRounded,
  PlayArrowRounded,
} from "@mui/icons-material";
import { Box, IconButton, Slider, Stack, Typography } from "@mui/material";

const MusicPlayerSlider = ({ value, max, onChange }) => {
  const duration = Math.floor(max); // seconds
//   console.log("max = ", max)
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  return (
    <Stack
      width={"100%"}
      sx={{
        color: "#ececee",
        justifyContent: "space-between",
      }}
      direction={"row"}
      alignItems={"center"}
    >
      <Typography variant="body2">{formatDuration(value)}</Typography>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={value}
        min={0}
        step={1}
        max={max}
        onChange={(_, value) => {
          onChange(_, value);
        }}
        sx={() => ({
          maxWidth: { sm: "50%", md: "60%", xs: "40%" },
        })}
      />
      <Typography variant="body2">
        -{formatDuration(duration - value)}
      </Typography>
    </Stack>
  );
};

export default MusicPlayerSlider;
