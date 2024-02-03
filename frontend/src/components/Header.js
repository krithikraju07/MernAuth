import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store";

axios.defaults.withCredentials = true;

export const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error("unable to logout retry!!");
  };

  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };

  const [value, setValue] = useState(0);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h3">MERN AUTH</Typography>
        <Box sx={{ marginLeft: "auto" }}>
          <Tabs
            value={value}
            onChange={(e, val) => setValue(val)}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#8ed1fc",
              },
            }}
          >
            {!isLoggedIn && (
              <>
                <Tab
                  to="/login"
                  label="Login"
                  component={Link}

                />
                <Tab
                  to="/signup"
                  label="Signup"
                  component={Link}

                />
              </>
            )}
            {isLoggedIn && (
              <Tab
                component={Link}
                to="/"
                onClick={handleLogout}
                label="Logout"
              />
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;