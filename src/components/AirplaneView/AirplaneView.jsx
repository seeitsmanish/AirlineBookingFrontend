import React from "react";
import { useState } from "react";
import "./AirplaneView.css";
import { LocalAirport } from "@mui/icons-material";
import { Typography } from "@mui/material";
import AddForm from "./AddForm";
import DataBaseView from "./DataBaseView";
import axios from "axios";

export default function AirplaneView() {
  const [data, setData] = useState([]);
  const fetchData = async (url) => {
    const response = await axios.get(url); // Adjust the URL accordingly
    console.log(response.data);
    setData(response.data.data);
  };

  const dataObject = {
    data: data,
    setData: setData,
  };
  return (
    <div className="container">
      {/* Introduction Section */}
      <div className="Introduction_section">
        <div className="symbol">
          <LocalAirport fontSize="large" />
        </div>
        <div className="resource_name">
          <Typography variant="h4" gutterBottom>
            Airplanes
          </Typography>
        </div>
      </div>

      {/* Form View */}
      <AddForm fetchData={fetchData} />
      <DataBaseView dataObject={dataObject} fetchData={fetchData} />
    </div>
  );
}
