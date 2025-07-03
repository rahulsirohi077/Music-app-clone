import { Box, Stack, Typography, IconButton, Button } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AlbumIcon from '@mui/icons-material/Album';

const SideBar = () => {
  return (
    <Box
      width={{ xs: "100%", sm: "100%" }}
      minHeight="100vh"
      sx={{
        bgcolor: "#18171c",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        variant='h5'
        sx={{
          textAlign: "center",
          fontSize: { xs: "1.1rem", sm: "2rem" }
        }}
      >
        Music App
      </Typography>
      <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
        <Button
          fullWidth
          startIcon={
            <HomeIcon sx={{ color: "#ececee", fontSize: { xs: 22, sm: 26 } }} />
          }
          sx={{
            justifyContent: "flex-start",
            borderRadius: ".5rem",
            gap: { sm: ".5rem", xs: "0rem" },
            px: { xs: 1, sm: 1.2 },
            py: { xs: 0.5, sm: 1 },
            color: "#ececee",
            fontWeight: 500,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            background: "none",
            textTransform: "none",
            transition: "background 0.2s",
            "&:hover, &:focus-visible": {
              backgroundColor: "#060606",
            },
          }}
          tabIndex={0}
        >
          Home
        </Button>
        <Button
          fullWidth
          startIcon={
            <SearchIcon sx={{ color: "#ececee", fontSize: { xs: 22, sm: 26 } }} />
          }
          sx={{
            justifyContent: "flex-start",
            borderRadius: ".5rem",
            gap: { sm: ".5rem", xs: "0rem" },
            px: { xs: 1, sm: 1.2 },
            py: { xs: 0.5, sm: 1 },
            color: "#ececee",
            fontWeight: 500,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            background: "none",
            textTransform: "none",
            transition: "background 0.2s",
            "&:hover, &:focus-visible": {
              backgroundColor: "#060606",
            },
          }}
          tabIndex={0}
        >
          Search
        </Button>
        <Button
          fullWidth
          startIcon={
            <AlbumIcon sx={{ color: "#ececee", fontSize: { xs: 22, sm: 26 } }} />
          }
          sx={{
            justifyContent: "flex-start",
            borderRadius: ".5rem",
            gap: { sm: ".5rem", xs: "0rem" },
            px: { xs: 1, sm: 1.2 },
            py: { xs: 0.5, sm: 1 },
            color: "#ececee",
            fontWeight: 500,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            background: "none",
            textTransform: "none",
            transition: "background 0.2s",
            "&:hover, &:focus-visible": {
              backgroundColor: "#060606",
            },
          }}
          tabIndex={0}
        >
          Library
        </Button>
      </Stack>
    </Box>
  )
}

export default SideBar