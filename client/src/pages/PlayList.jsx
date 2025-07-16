import React, { useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { fetchAllPlaylists } from "../apis/playlistAPI";

const PlayLists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylistsData = async () => {
      const res = await fetchAllPlaylists();
      if (res && res.playlists) {
        setPlaylists(res.playlists);
      }
    };
    fetchPlaylistsData();
  }, []);

  return (
    <>
      <Container sx={{ p: 2 }}>
        <Box
          sx={{
            bgcolor: blue[500],
            color: "white",
            height: "200px",
            borderRadius: 2,
          }}
        >
          <Typography variant="h1" align="center">
            PlayLists
          </Typography>
        </Box>
        <Box mt={3}>
          <Stack spacing={2}>
            {playlists.map((playlist) => (
              <Card
                key={playlist._id}
                sx={{
                  bgcolor: grey[900],
                  color: "white",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <Typography variant="h5">{playlist.name}</Typography>
                  <Typography variant="caption" color="grey.500">
                    {playlist.trackCount} tracks
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Container>
    </>
  );
};

const WrappedPLayList = AppLayout(PlayLists);
export default WrappedPLayList;
