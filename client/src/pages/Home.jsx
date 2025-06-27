import React, { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import NavBar from "../components/shared/NavBar";
import { grey, red } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Home = () => {
  const [liked, setLiked] = useState(false);

  return (
    <Stack sx={{ height: "100vh" }}>
      <NavBar />
      <Container
        maxWidth={false}
        component="main"
        sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
      >
        {/* hero Section */}
        <Stack spacing={6}>
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
          height={"100%"}
          // width={"100%"}
          // sx={{
          //   height: { xs: "40vh", sm: "45vh", md: "55vh" },
          // }}
        >
          {/* left section */}
          <Grid
            container
            item
            size={7}
            spacing={2}
            height={"100%"}
            direction={"column"}
            // sx={{
            //   flex:1,
            //   flexDirection:"column"
            // }}
            bgcolor={red[500]}
          >
            {/* Artist section */}
            <Grid
              item
              size={12}
              bgcolor={grey[500]}
              sx={{
                // flex:1,
                height:"30%"
              }}
            >
              Artist
            </Grid>
            {/* genre and top charts */}
            <Grid
              container
              item
              spacing={3}
              size={12}
              direction={"row"}
              sx={{
                flex:1,
                // height:"60%"
              }}
            >
              {/* genre */}
              <Grid item size={5} bgcolor={grey[500]}>
                Genre
              </Grid>
              {/* top charts */}
              <Grid item size={7} bgcolor={grey[500]}>
                Top Charts
              </Grid>
            </Grid>
          </Grid>
          {/* right section */}
          {/* Player */}
          <Grid item size={5} bgcolor={grey[500]} height={"100%"}>
            Music Player
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};

const WrappedHome = AppLayout(Home);
export default WrappedHome;
