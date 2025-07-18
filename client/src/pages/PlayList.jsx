import React, { useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Grid,
  IconButton,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Player from "../components/Player";
import { fetchAllPlaylists } from "../apis/playlistAPI";
// import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const STATIC_URL = import.meta.env.VITE_APP_STATIC_URL;

const PlayLists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylistsData = async () => {
      const res = await fetchAllPlaylists();
      if (res && res.playlists) {
        setPlaylists(res.playlists);
      }
    };
    fetchPlaylistsData();
  }, []);

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist);
    console.log(playlist);
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.target.click();
    }
  };

  const handleBack = () => {
    setSelectedPlaylist(null);
    setSelectedTrack(null);
  }

  return (
    <>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: blue[500],
            color: "white",
            height: "200px",
            borderRadius: 2,
            position: "relative",
          }}
        >
          {selectedPlaylist && (
            <IconButton
              onClick={handleBack}
              sx={{ position: "absolute", top: 1, left: 1 }}
            >
              <ArrowBackIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
          )}
          <Typography variant="h1" align="center">
            {selectedPlaylist ? selectedPlaylist.name : "PlayLists"}
          </Typography>
        </Box>

        {!selectedPlaylist ? (
          <Box mt={3}>
            <Stack spacing={2}>
              {playlists.map((pl) => (
                <Card
                  key={pl._id}
                  sx={{
                    bgcolor: grey[900],
                    color: "white",
                    borderRadius: 2,
                    cursor: "pointer",
                  }}
                  onClick={() => handlePlaylistSelect(pl)}
                  tabIndex={0}
                  onKeyDown={handleOnKeyDown}
                  aria-label={`${pl.name} PlayList`}
                >
                  <CardContent>
                    <Typography variant="h5">{pl?.name}</Typography>
                    <Typography variant="caption" color="grey.500">
                      {pl?.trackCount} tracks
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        ) : (
          // Parent Grid of Playlist and Player
          <Grid container mt={3} sx={{ flex: 1,minHeight:0 }} spacing={2}>
            {/* Playlists Tracks Section */}
            <Grid size={6}>
              <Grid
                item
                size={12}
                bgcolor={"#212028"}
                padding={2}
                borderRadius={3}
                height={"100%"}
                overflow={"auto"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap:2,
                  minHeight: 0,
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                tabIndex={0}
                aria-labelledby="Playlist-heading"
              >
                <Typography variant="body1" id="Playlist-heading">
                  {`${selectedPlaylist.name}'s Tracks`}
                </Typography>
                <Grid container direction={"column"}>
                  {selectedPlaylist.tracks.length === 0 ? (
                    <Typography align="center" mt={3}>
                      No Tracks In This Playlist
                    </Typography>
                  ) : (
                    selectedPlaylist.tracks.map((data, index) => (
                      <Grid
                        container
                        key={index + 1}
                        direction={"row"}
                        width={"100%"}
                        justifyContent={"space-between"}
                        mt={1}
                      >
                        <Grid size={1}>
                          <Typography variant="overline">
                            {index + 1}
                          </Typography>
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
                          size={2}
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
                          {/* <IconButton
                          color="secondary"
                          aria-label={`Add ${data.title} to playlist`}
                          onClick={() => {
                            setTrackToAdd(data);
                            setModalOpen(true);
                          }}
                        >
                          <PlaylistAddIcon />
                        </IconButton> */}
                        </Grid>
                      </Grid>
                    ))
                  )}
                </Grid>
              </Grid>
            </Grid>
            {/* Music Player Section */}
            <Grid
              item
              size={6}
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
        )}
      </Container>
    </>
  );
};

const WrappedPLayList = AppLayout(PlayLists);
export default WrappedPLayList;
