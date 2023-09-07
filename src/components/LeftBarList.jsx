import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
  Business,
  FlightTakeoff,
  LocalAirport,
  LocationCity,
} from "@mui/icons-material";

export default function LeftBarList() {
  return (
    <div className="leftBarList">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "primary.main",
          color: "white",
          position: "static",
          textAlign: "center",
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>
            <Link
              to="/cities"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LocationCity style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Cities" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/airplanes"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LocalAirport style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Airplanes" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/airports"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Business style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Airports" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/flights"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <FlightTakeoff style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Flights" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </nav>
      </Box>
    </div>
  );
}
