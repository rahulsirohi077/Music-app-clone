import { Search } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

const NavBar = () => {
  return (
    <Box py={"1rem"}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "transparent",
        }}
      >
        <Toolbar>
          <Typography variant="button" sx={{ flexGrow: 1 }}>
            Music
          </Typography>
          <TextField
            size="small"
            placeholder="Type Here to Search"
            sx={{
              input: {
                color: "#d3d3d3",
                backgroundColor: "#1d1d1d",
                borderRadius: "1rem",
                "&::placeholder": {
                  color: "#d3d3d3",
                  opacity: 1,
                },
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: ".5rem",
                backgroundColor: "#1d1d1d",
                "& fieldset": {
                  border: "1.5px solid #fff",
                },
                "&:hover fieldset": {
                  border: "1.5px solid #fff",
                },
                "&.Mui-focused fieldset": {
                  border: "1.5px solid #fff",
                },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: "#d3d3d3" }}>
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
          />
          <Box flexGrow={1}></Box>
          <Avatar>A</Avatar>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
