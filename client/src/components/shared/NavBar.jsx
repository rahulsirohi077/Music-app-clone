import { Search } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Fade,
  IconButton,
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
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchTrack } from "../../apis/trackAPI";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../../context/UserContext";
import SideBar from "./SideBar";
import { logout } from "../../apis/userAPI";
const STATIC_URL = import.meta.env.VITE_APP_STATIC_URL;

const NavBar = ({setSelectedTrack}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const searchDataRef = useRef();
  const openMenu = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const {setUser} = useContext(UserContext);

  const [searchText, setSearchText] = useState("");

  // const {setOpenSideBar} = useContext(UserContext);

  const { openSidebar, setOpenSidebar } = useContext(UserContext);

  const handleSideBarClose = () => {
    setOpenSidebar(false);
  };

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
        } else {
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
        // console.log("selected = ",selected)
        setSearchText('');
        setSelectedTrack(selected);
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

  const handleLogout = async() => {
    const response = await logout();
    if(response){
      setUser(false);
    }
  }

  return (
    <>
     <Drawer open={openSidebar} onClose={handleSideBarClose}>
        <SideBar />
      </Drawer>
    <Box pt={"1rem"}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "transparent",
        }}
      >
        <Toolbar>
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            onClick={() => setOpenSidebar((p) => !p)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="button" sx={{ flexGrow: 1 }}>
            Music
          </Typography>
          <TextField
            ref={searchDataRef}
            value={searchText}
            onBlur={() => setOpen(false)}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => {
              if (searchData?.length > 0) setOpen(true);
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
              width:{xs:"10rem",md:"15rem"},
              input: {
                color: "#d3d3d3",
                backgroundColor: "#1d1d1d",
                borderRadius: "1rem",
                "&::placeholder": {
                  color: "#d3d3d3",
                  opacity: 1,
                  fontSize:{xs:"0.6rem",md:"1rem"}
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
            <MenuItem onClick={()=> handleLogout()}>
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
            sx={{ width: "fit-content" }}
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
                              setSearchText('');
                              setSelectedTrack(searchData[ind])
                              setOpen(false);
                            }}
                            sx={
                              {
                                // "&:hover": {
                                //   backgroundColor: "#2196f3",
                                // },
                                // "&.Mui-selected, &.Mui-selected:hover": {
                                //   backgroundColor: "#2196f3",
                                // },
                              }
                            }
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
    </>
  );
};

export default NavBar;
