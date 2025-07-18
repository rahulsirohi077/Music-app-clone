import React, { useState, useEffect, useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "../components/shared/NavBar";
import { grey, red, yellow } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardItem from "../components/shared/CardItem";
import { artistData } from "../data/artists";
import { genreData } from "../data/genre";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Player from "../components/Player";
import { fetchMusicList } from "../apis/trackAPI";
import { createPlayList, addToPlaylist } from "../apis/playlistAPI";
const STATIC_URL = import.meta.env.VITE_APP_STATIC_URL;

const Home = () => {
  const [liked, setLiked] = useState(false);
  const [chartsData, setChartsData] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);

  // Modal state for adding to playlist
  const [modalOpen, setModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [trackToAdd, setTrackToAdd] = useState(null);
  const [isCreating, setIsCreating] = useState(false); // for create playlist mode
  const playlistInputRef = useRef(null);

  useEffect(() => {
    const fetchMusic = async () => {
      const response = await fetchMusicList();
      setChartsData(response?.musicList || []);
      setSelectedTrack(response?.musicList[0]);
    };
    fetchMusic();
  }, []);

  useEffect(() => {
    if (modalOpen && playlistInputRef.current) {
      playlistInputRef.current.focus();
      playlistInputRef.current.select();
    }
  }, [modalOpen, isCreating]);

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  // Function to handle adding track to playlist
  const handleAddToPlaylist = async () => {
    if (!playlistName || !trackToAdd) return;
    await addToPlaylist({
      playListName: playlistName,
      trackId: trackToAdd._id,
    });
    setModalOpen(false);
    setPlaylistName("");
    setTrackToAdd(null);
    setIsCreating(false);
  };

  // Function to handle creating a new playlist
  const handleCreatePlaylist = async () => {
    if (!playlistName) return;
    await createPlayList(playlistName);
    setIsCreating(false);
  };

  return (
    <Stack sx={{ height: "100vh" }}>
      <NavBar />
      <Container
        maxWidth={false}
        component="main"
        sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
      >
        {/* hero Section */}
        <Stack spacing={3}>
          <Typography variant="body1">Trending New Hits</Typography>

          <Stack>
            <Typography variant="h3">In My Feelings</Typography>

            <Stack spacing={2}>
              <Stack direction={"row"} spacing={2}>
                <Typography variant="h6">Camila Cabello</Typography>
                <Typography variant="h6" color={grey[500]}>
                  63 Million Plays
                </Typography>
              </Stack>
              <Stack>
                <Stack direction={"row"} spacing={2}>
                  <Button variant="contained" sx={{ borderRadius: 10 }}>
                    Listen Now
                  </Button>
                  <IconButton
                    sx={{
                      border: "1px solid white",
                      borderRadius: 10,
                      "&:focus-visible": {
                        border: "2px solid",
                        borderColor: "primary.main", // uses theme's primary color
                        outline: "none",
                      },
                    }}
                    onClick={() => setLiked((prev) => !prev)}
                  >
                    {liked ? (
                      <FavoriteIcon color="primary" />
                    ) : (
                      <FavoriteBorderIcon color="primary" />
                    )}
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Grid
          container
          spacing={2}
          mt={2}
          mb={2}
          sx={{
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* left section */}
          <Grid
            container
            // item
            size={7}
            spacing={2}
            height={"100%"}
            direction={"column"}
          >
            {/* Artist section */}
            <Grid
              item
              size={12}
              bgcolor={"#212028"}
              sx={{
                height: "35%",
              }}
              direction={"column"}
              paddingX={2}
              paddingTop={1}
              borderRadius={3}
              tabIndex={0}
            >
              <Stack height={"100%"} direction={"column"}>
                <Typography variant="body1" ml={1} mt={1}>
                  Artist
                </Typography>
                <Box
                  display={"flex"}
                  sx={{
                    flex: 1,
                    minHeight: 0,
                  }}
                  justifyContent={"space-around"}
                  alignItems={"center"}
                  tabIndex={0}
                  aria-activedescendant="card-0"
                >
                  {artistData.map((data, ind) => (
                    <CardItem
                      id={`card-${ind}`}
                      key={data.id}
                      src={data.src}
                      alt={data.alt}
                      artistName={data.artistName}
                      plays={data.plays}
                    />
                  ))}
                </Box>
              </Stack>
            </Grid>
            {/* genre and top charts */}
            <Grid
              container
              spacing={3}
              size={12}
              direction={"row"}
              height={"60%"}
              // sx={{
              //   display:"flex",
              //   flexDirection:"row"
              // }}
            >
              {/* genre */}
              <Grid
                size={5}
                bgcolor={"#212028"}
                borderRadius={3}
                height={"100%"}
                spacing={0}
                sx={{
                  padding: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
                tabIndex={0}
                aria-labelledby="genre"
              >
                <Typography variant="body1" id="genre">
                  Genre
                </Typography>
                <Grid
                  container
                  direction={"row"}
                  spacing={1}
                  sx={{
                    flex: 1,
                    overflow: "auto",
                    mt: 0,
                  }}
                >
                  {genreData.map((data) => (
                    <Grid
                      item
                      size={6}
                      key={data.id}
                      bgcolor={data.bgColor}
                      borderRadius={3}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      sx={{
                        minHeight: "40px",
                        mb: 1,
                      }}
                      tabIndex={0}
                    >
                      <Typography variant={"caption"} textAlign={"center"}>
                        {data.title}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {/* top charts */}
              <Grid
                item
                size={7}
                bgcolor={"#212028"}
                padding={2}
                borderRadius={3}
                height={"100%"}
                overflow={"auto"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 0,
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                tabIndex={0}
                aria-labelledby="top-charts"
              >
                <Typography variant="body1" id="top-charts">
                  Top Charts
                </Typography>
                <Grid container direction={"column"}>
                  {chartsData.map((data, index) => (
                    <Grid
                      container
                      key={index + 1}
                      direction={"row"}
                      width={"100%"}
                      justifyContent={"space-between"}
                      mt={1}
                    >
                      <Grid size={1}>
                        <Typography variant="overline">{index + 1}</Typography>
                      </Grid>
                      <Grid size={6}>
                        <Stack direction={"row"} spacing={2} width={"full"}>
                          <img
                            src={STATIC_URL + data.thumbnailUrl}
                            alt={`${data.title} Thumbnail`}
                            width={50}
                            height={30}
                            style={{ objectFit: "cover" }}
                          />
                          <Stack direction={"column"}>
                            <Typography variant="body2">
                              {data.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ fontSize: "0.5rem" }}
                              width={"100%"}
                            >
                              {data?.artist && data?.artist.slice(0, 16)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid size={2}>
                        <Typography
                          width={"100%"}
                          height={"100%"}
                          fontSize={"0.7rem"}
                          variant="caption"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {formatDuration(data.duration)}
                        </Typography>
                      </Grid>
                      <Grid
                        size={3}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <IconButton
                          color="primary"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          aria-label={`Play ${data.title} by ${
                            data.artist
                          }, duration of the song is ${
                            formatDuration(data.duration).split(":")[0]
                          } minutes and ${
                            formatDuration(data.duration).split(":")[1]
                          } seconds`}
                          onClick={() => setSelectedTrack(data)}
                        >
                          <PlayCircleOutlineIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label={`Add ${data.title} to playlist`}
                          onClick={() => {
                            setTrackToAdd(data);
                            setModalOpen(true);
                          }}
                        >
                          <PlaylistAddIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* right section */}
          {/* Player */}
          <Grid
            item
            size={5}
            bgcolor={"#212028"}
            height={"100%"}
            borderRadius={3}
            tabIndex={0}
            aria-labelledby="player-heading"
          >
            <Stack height={"100%"}>
              <Typography
                variant="body1"
                paddingLeft={2}
                paddingTop={2}
                id="player-heading"
              >
                Player
              </Typography>
              <Player selectedTrack={selectedTrack} />
            </Stack>
          </Grid>
        </Grid>
        {/* Modal for adding to playlist */}
        <Modal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setIsCreating(false);
          }}
          aria-labelledby="add-to-playlist-modal"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              minWidth: 300,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography id="add-to-playlist-modal" variant="h6">
              {isCreating
                ? "Create New Playlist"
                : `Add "${trackToAdd?.title}" to Playlist`}
            </Typography>
            <TextField
              label="Playlist Name"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              inputRef={playlistInputRef}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              {!isCreating && (
                <Button
                  variant="contained"
                  onClick={handleAddToPlaylist}
                  disabled={!playlistName}
                >
                  Add to Playlist
                </Button>
              )}
              <Button
                variant={isCreating ? "contained" : "outlined"}
                color="secondary"
                onClick={() => {
                  if (isCreating) {
                    handleCreatePlaylist();
                  } else {
                    setIsCreating(true);
                  }
                }}
                disabled={!playlistName}
              >
                {isCreating ? "Create" : "Create New Playlist"}
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Container>
    </Stack>
  );
};

const WrappedHome = AppLayout(Home);
export default WrappedHome;
