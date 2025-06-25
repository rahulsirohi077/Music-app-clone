import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AlbumIcon from '@mui/icons-material/Album';

const SideBar = () => {
  return (
    <Box>
        <Typography variant={"h5"} textAlign={"center"}>Music App</Typography>

        <List>
            <ListItem>
                <ListItemButton
                  sx={{
                    '&:hover': {
                      backgroundColor: '#060606',
                    },
                  }}
                >
                    <ListItemIcon >
                        <HomeIcon sx={{ color: "#ececee" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton
                  sx={{
                    '&:hover': {
                      backgroundColor: '#060606',
                    },
                  }}
                >
                    <ListItemIcon>
                        <SearchIcon sx={{ color: "#ececee" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Search" />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton
                  sx={{
                    '&:hover': {
                      backgroundColor: '#060606',
                    },
                  }}
                >
                    <ListItemIcon>
                        <AlbumIcon sx={{ color: "#ececee" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Library" />
                </ListItemButton>
            </ListItem>
        </List>
    </Box>
  )
}

export default SideBar