import { Search } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Fade,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Popper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchTrack } from "../../apis/trackAPI";
const STATIC_URL = import.meta.env.VITE_APP_STATIC_URL;

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const searchDataRef = useRef();
  const openMenu = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchData]);

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (!searchText.trim()) setOpen(false);
      if (searchText.trim()) {
        const data = await searchTrack(searchText);
        if (data) {
          setSearchData(data.tracks);
          setOpen(true);
        }
        else{
          setOpen(false);
        }
      }
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [searchText]);

  const handleKeyDown = (e) => {
    if (!open || !searchData.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < searchData.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : searchData.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      // Handle selection (e.g., navigate or fill input)
      const selected = searchData[highlightedIndex];
      if (selected) {
        setSearchText(selected.title);
        setOpen(false);
        // Optionally, trigger navigation or other action here
      }
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
    }
  };

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
            ref={searchDataRef}
            value={searchText}
            onBlur={() => setOpen(false)}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={()=>{
              if(searchData?.length>0) setOpen(true)
            }}
            aria-label="Search Song"
            aria-controls="search-dropdown-listbox"
            aria-expanded={open}
            aria-activedescendant={
              open && searchData.length > 0
                ? `search-option-${highlightedIndex}`
                : undefined
            }
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
          {/* Avatar Menu */}
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={openMenu}
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

          {/* SearchData Dropbox */}
          <Popper
            id="Search Music DropDown List"
            open={open}
            anchorEl={searchDataRef.current}
            placement={"bottom"}
            transition
            sx={{ width: "17%" }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  sx={{
                    maxHeight: "400px",
                    overflow: "auto",
                  }}
                >
                  <List id="search-dropdown-listbox" role="listbox">
                    {searchData?.length > 0 &&
                      searchData.map((data, ind) => (
                        <ListItem
                          key={ind}
                          role="option"
                          id={`search-option-${ind}`}
                          aria-selected={highlightedIndex === ind}
                          disableGutters
                        >
                          <ListItemButton
                            selected={highlightedIndex === ind}
                            onClick={() => {
                              setSearchText(data.title);
                              setOpen(false);
                            }}
                            sx={{
                              // "&:hover": {
                              //   backgroundColor: "#2196f3",
                              // },
                              // "&.Mui-selected, &.Mui-selected:hover": {
                              //   backgroundColor: "#2196f3",
                              // },
                            }}
                          >
                            <ListItemIcon>
                              <img
                                src={STATIC_URL + data.thumbnailUrl}
                                alt={`${data.title} Thumbnail`}
                                width={50}
                                height={30}
                                style={{ objectFit: "cover" }}
                              />
                            </ListItemIcon>
                            <ListItemText primary={data.title} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                  </List>
                </Paper>
              </Fade>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
