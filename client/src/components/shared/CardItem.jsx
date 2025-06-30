import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import React from "react";

const CardItem = ({src,alt,artistName,plays}) => {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        height: "95%",
        bgcolor: "transparent",
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        sx={{ height: "60%", objectFit: "cover", borderRadius: 2 }}
        image={src}
        alt={alt}
      />
      <CardContent sx={{ p: 0, height: "100%" }}>
        <Stack>
          <Typography
            variant="caption"
            textAlign={"center"}
            sx={{ fontSize:{ md:"0.7rem",sm:"0.5rem",xs:"0.3rem" } }}
            color="#bcbbbf"
          >
            {artistName}
          </Typography>
          <Typography
            variant="caption"
            textAlign={"center"}
            sx={{ fontSize: {md:"0.7rem",sm:"0.5rem",xs:"0.4rem" }}}
            color="#65666c"
          >
            {plays}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardItem;
