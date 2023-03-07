import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useCookies } from "react-cookie";

function NavBar() {
  const onLogout = () => {
    removeCookie("logged_in");
  };
  const [cookie, setCookie, removeCookie] = useCookies("logged_in");

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ background: "#fff" }} disableGutters>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />

        <Button color="primary" sx={{ mr: 4 }} onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
