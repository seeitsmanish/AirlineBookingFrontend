import React from "react";
import { useState } from "react";
import "./AirportView.css";
import BusinessIcon from "@mui/icons-material/Business";
import { Typography } from "@mui/material";
import AddForm from "./AddForm";
import DataBaseView from "./DataBaseView";
import axios from "axios";

export default function AirportView() {
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
          <BusinessIcon fontSize="large" />
        </div>
        <div className="resource_name">
          <Typography variant="h4" gutterBottom>
            Airports
          </Typography>
        </div>
      </div>

      {/* Form View */}
      <AddForm fetchData={fetchData} />
      <DataBaseView dataObject={dataObject} fetchData={fetchData} />
    </div>
  );
}
