import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import SignIn from "./SignIn";
import Signup from "./SignUp";
import axios from "axios";

function isAuthenticated() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);

  const token = localStorage.getItem("token");
  if (token === null || token === undefined) {
    setLoading(false);
    setAuthenticated(false);

    return [loading, authenticated];
  }
  axios
    .get("http://localhost:3004/api/v1/isauthenticated", {
      headers: { "x-access-token": token },
    })
    .then((data) => {
      console.log(data);
    });
  return [loading, authenticated];
}

export default function () {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const data = isAuthenticated();
  console.log(data);

  const renderComponent = () => {
    return (
      <>
        {authenticated === false ? (
          <>
            <Button
              color="inherit"
              onClick={() => {
                setOpenSignIn(true);
              }}
            >
              SignIn
            </Button>

            <Button
              color="inherit"
              onClick={() => {
                setOpenSignUp(true);
              }}
            >
              SignUp
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.setItem("token", null);
              }}
            >
              Logout
            </Button>
          </>
        )}
      </>
    );
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              BOOKING.com
            </Typography>

            {loading ? <></> : renderComponent()}
          </Toolbar>
        </AppBar>
      </Box>

      <SignIn open={openSignIn} setOpen={setOpenSignIn} />
      <Signup open={openSignUp} setOpen={setOpenSignUp} />
    </div>
  );
}
