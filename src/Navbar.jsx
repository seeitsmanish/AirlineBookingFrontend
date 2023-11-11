import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SignIn from "./SignIn";
import Signup from "./SignUp";
import axios from "axios";
import { useState, useEffect } from "react";

export default function () {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const getAuthenticationStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3004/api/v1/isauthenticated",
          {
            headers: { "x-access-token": localStorage.getItem("token") },
          }
        );

        if (response.data) {
          localStorage.setItem("token", response.data);
          setAuthenticated(true);
        } else {
          console.log("Token Not valid!!");
        }
      } catch (error) {
        console.log(error);
        console.log("Something went wrong while fetching authentication data!");
      }
    };
    getAuthenticationStatus();
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <Box style={{ width: "100%" }}>
        <AppBar style={{ width: "100%" }} position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              BOOKING.com
            </Typography>
            {authenticated === true ? (
              <>
                <Button
                  color="inherit"
                  onClick={() => {
                    localStorage.setItem("token", null);
                    setAuthenticated(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
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
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <SignIn
        open={openSignIn}
        setOpen={setOpenSignIn}
        setAuthenticated={setAuthenticated}
      />
      <Signup
        open={openSignUp}
        setOpen={setOpenSignUp}
        setAuthenticated={setAuthenticated}
      />
    </div>
  );
}
