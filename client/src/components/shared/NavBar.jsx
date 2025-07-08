import { Search } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  InputAdornment,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchTrack } from "../../apis/trackAPI";

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (searchText.trim()) {
        searchTrack(searchText)
      }
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [searchText]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // console.log(e.target);
    setAnchorEl(null);
  };

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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            aria-label="Search Song"
            size="small"
            type="text"
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
          <Button
            sx={{
              cursor: "pointer",
              ":hover": {
                bgcolor: grey[500],
                transition: "0.4s ease-in-out",
              },
              ":focus": {
                bgcolor: grey[500],
                transition: "0.4s ease-in-out",
                outline: "none",
              },
            }}
            padding={1}
            aria-label="User Avatar"
            aria-controls={open ? "menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : "false"}
            onClick={handleClick}
          >
            <Avatar>A</Avatar>
            <ArrowDropDownIcon sx={{ color: "white" }} />
          </Button>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-label": "Avatar DropDown Menu",
              },
            }}
          >
            <MenuItem onClick={() => navigate("/settings")} autoFocus>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
