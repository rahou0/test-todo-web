import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

function BackDrop({ open }) {
  return (
    <Backdrop
      sx={{
        // color: user?.chef_token ? "#3A9F8D" : "#EB5252",
        zIndex: 99999999,
      }}
      open={open}
    >
      <CircularProgress color="secondary" />
    </Backdrop>
  );
}

export default BackDrop;
