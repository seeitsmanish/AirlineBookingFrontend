import React from "react";
import { Typography } from "@mui/material";
export default function AdminPanelWelcomePage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <center>
        <Typography variant="h1" component="h2">
          Welcome to Admin Panel!
        </Typography>
      </center>
    </div>
  );
}
