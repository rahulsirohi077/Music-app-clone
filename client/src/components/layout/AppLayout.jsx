import { Grid } from "@mui/material";
import React from "react";
import SideBar from "../shared/SideBar";

// eslint-disable-next-line no-unused-vars
const AppLayout = (WrappedComponent) => {
  return (props) => (
    <Grid container height={"100vh"} color={"#ececee"}>
      <Grid item size={2} height={"100%"} bgcolor={"#18171c"}>
        <SideBar/>
      </Grid>
      <Grid
        item
        size={10}
        height={"100%"}
        sx={{ backgroundImage: "linear-gradient(to bottom, #050505, #18171c)" }}
      >
        <WrappedComponent {...props} />
      </Grid>
    </Grid>
  );
};

export default AppLayout;
