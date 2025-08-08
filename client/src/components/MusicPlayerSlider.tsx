import { Slider, Stack, Typography } from "@mui/material";
import React from "react";
import type { MusicPlayerSliderProps } from "../types";

const MusicPlayerSlider: React.FC<MusicPlayerSliderProps> = ({ value, max, onChange }) => {
  const duration = Math.floor(max);

  function formatDuration(value: number): string {
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
        onChange={onChange}
        sx={() => ({
          maxWidth: { sm: "50%", md: "60%", xs: "50%" },
        })}
      />
      <Typography variant="body2">
        -{formatDuration(duration - value)}
      </Typography>
    </Stack>
  );
};

export default MusicPlayerSlider;
