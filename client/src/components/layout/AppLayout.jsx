import { Drawer, Grid } from "@mui/material";
import React from "react";
import SideBar from "../shared/SideBar";
import { UserContext } from "../../context/UserContext";

// eslint-disable-next-line no-unused-vars
const AppLayout = (WrappedComponent) => {
  // const { openSideBar, setOpenSideBar } = useContext(UserContext);

  // const handleSideBarClose = () => {
  //   setOpenSideBar(false);
  // };

  return (props) => (
    <>
      {/* Drawer */}
      {/* <Drawer open={openSideBar} onClose={handleSideBarClose}>
        <SideBar />
      </Drawer> */}
      {/* main app layout */}
      <Grid container height={"100vh"} color={"#ececee"}>
        <Grid
          item
          size={2}
          height={"100%"}
          bgcolor={"#18171c"}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <SideBar />
        </Grid>
        <Grid
          item
          size={{ sm: 12, md: 10 }}
          height={"100%"}
          sx={{
            backgroundImage: "linear-gradient(to bottom, #050505, #18171c)",
          }}
        >
          <WrappedComponent {...props} />
        </Grid>
      </Grid>
    </>
  );
};

export default AppLayout;
