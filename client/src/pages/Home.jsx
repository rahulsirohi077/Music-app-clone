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
import { grey, red, yellow } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardItem from "../components/shared/CardItem";
import { artistData } from "../data/artists";
import { genreData } from "../data/genre";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
// import { chartsData } from "../data/charts";
import Player from "../components/Player";
import { useEffect } from "react";
import { fetchMusicList } from "../apis/trackAPI";
const STATIC_URL = import.meta.env.VITE_APP_STATIC_URL;

const Home = () => {
  const [liked, setLiked] = useState(false);
  const [chartsData, setChartsData] = useState([]);

  useEffect(() => {
    const fetchMusic = async () => {
      const response = await fetchMusicList();
      setChartsData(response?.musicList || []);
    };
    fetchMusic();
  }, []);

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

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
            // No calculations needed! Flex automatically takes remaining space
            flex: 1,
            minHeight: 0, // Important for flex children with overflow
          }}
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
            // bgcolor={red[500]}
          >
            {/* Artist section */}
            <Grid
              item
              size={12}
              bgcolor={"#212028"}
              // height={"35%"}
              sx={{
                // flex: 1,
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
                  // height={"85%"}
                  // width={"100%"}
                  display={"flex"}
                  // bgcolor={yellow[500]}
                  // height={"100%"}
                  sx={{
                    flex: 1,
                    minHeight: 0, // Important for flex children with overflow
                    // height: "100%",

                    // miaxHeght: "calc(100% - 32px)", // Subtract Typography height + margin
                  }}
                  // flexDirection={"row"}
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
              sx={
                {
                  // minHeight: 0, // Important for flex children with overflow
                  // flex: 1,
                  // maxHeight: "calc(100% - 32px)", // Subtract Typography height + margin
                  // height: "60%",
                }
              }
            >
              {/* genre */}
              <Grid
                // container
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
                  // bgcolor={red[500]}
                  container
                  direction={"row"}
                  spacing={1}
                  sx={{
                    flex: 1,
                    overflow: "auto",
                    mt: 0, // Remove top margin
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
                        mb: 1, // Small bottom margin between items
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
                  minHeight: 0, // Allows the grid to shrink below content height
                  /* Hide scrollbar for Chrome, Safari and Opera */
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  /* Hide scrollbar for IE, Edge and Firefox */
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE and Edge
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
                        size={2}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
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
                        >
                          <PlayCircleOutlineIcon />
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
            // padding={2}
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
              <Player />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};

const WrappedHome = AppLayout(Home);
export default WrappedHome;
