import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Alert from "@mui/material/Alert";
import { Typography, TextField, Button, Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
const BASE_URL = "http://localhost:3000/api/v1";
import { InputAdornment } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
export default function (props) {
  const { fetchData } = props;
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [addButtonLoading, setAddButtonLoading] = useState(false);

  const [flightNumber, setFlightNumber] = useState("");
  const [airplaneId, setAirplaneId] = useState("");
  const [departureAirportId, setDepartureAirportId] = useState("");
  const [arrivalAirportId, setArrivalAirportId] = useState("");
  const [arrivalTime, setArrivalTime] = useState(dayjs());
  const [departureTime, setDepartureTime] = useState(dayjs());
  const [price, setPrice] = useState("");
  const [totalSeats, setTotalSeats] = useState("");

  const dataObject = [
    [flightNumber, setFlightNumber],
    [airplaneId, setAirplaneId],
    [departureAirportId, setDepartureAirportId],
    [arrivalAirportId, setArrivalAirportId],
    [arrivalTime, setArrivalTime],
    [departureTime, setDepartureTime],
    [price, setPrice],
    [totalSeats, setTotalSeats],
  ];

  const handleAddButton = async () => {
    setAddButtonLoading(true);

    const postData = {
      flightNumber: flightNumber.trim(),
      airplaneId: airplaneId.trim(),
      departureAirportId: departureAirportId.trim(),
      arrivalAirportId: arrivalAirportId.trim(),
      arrivalTime: arrivalTime.format("YYYY-MM-DDTHH:mm:ss"),
      departureTime: departureTime.format("YYYY-MM-DDTHH:mm:ss"),
      price: price.trim(),
      totalSeats: totalSeats.trim(),
    };
    const url = `${BASE_URL}/flights`;

    try {
      const response = await axios.post(`${BASE_URL}/flights`, postData);
      console.log(response.data);
      setTimeout(() => {
        setAddButtonLoading(false);
        setSuccessMessage(response.data.message);
        setSuccessAlert(true);
        fetchData(url);
      }, 1000);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.err || "Something went wrong");
      setErrorAlert(true);
      setAddButtonLoading(false);
    }
  };

  return (
    <div>
      <div className="form_section">
        <Paper elevation={2} className="form_section_paper">
          <div className="heading">
            <Typography variant="h4">Add Flight</Typography>
          </div>

          <Divider />

          <div className="forAlerts">
            {errorAlert && (
              <ClickAwayListener
                onClickAway={() => {
                  setErrorAlert(false);
                }}
              >
                <Alert severity="error">{errorMessage}</Alert>
              </ClickAwayListener>
            )}

            {successAlert && (
              <ClickAwayListener
                onClickAway={() => {
                  setSuccessAlert(false);
                }}
              >
                <Alert severity="success">{successMessage}</Alert>
              </ClickAwayListener>
            )}
          </div>

          <div className="form_container grid_container">
            <div className="form_item I1">
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                label="Flight Number"
                variant="outlined"
                required
                name="flightNumber"
                value={flightNumber}
                onChange={(event) => setFlightNumber(event.target.value)}
              />
            </div>

            <div className="form_item I2">
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                label="Airplane ID"
                variant="outlined"
                required
                name="airplaneId"
                value={airplaneId}
                onChange={(event) => setAirplaneId(event.target.value)}
              />
            </div>

            <div className="form_item I3">
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                label="Departure Airport ID"
                variant="outlined"
                required
                name="departureAirportId"
                value={departureAirportId}
                onChange={(event) => setDepartureAirportId(event.target.value)}
              />
            </div>

            <div className="form_item I4">
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                label="Arrival Airport ID"
                variant="outlined"
                required
                name="arrivalAirportId"
                value={arrivalAirportId}
                onChange={(event) => setArrivalAirportId(event.target.value)}
              />
            </div>

            <div className="form_item I5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Departure Time"
                    value={departureTime}
                    disablePast
                    onChange={(date) => {
                      setDepartureTime(dayjs(date));
                      console.log(departureTime);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="form_item I6">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Arrival Time"
                    value={arrivalTime}
                    disablePast
                    onChange={(date) => {
                      setArrivalTime(dayjs(date));
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="form_item I7">
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-start-adornment"
                label="Price"
                variant="outlined"
                required
                name="price"
                value={price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>

            <div className="form_item I8">
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                label="Total Seats"
                variant="outlined"
                name="totalSeats"
                value={totalSeats}
                onChange={(event) => setTotalSeats(event.target.value)}
              />
            </div>

            <div className="form_item form_submit_button I9">
              <Button
                sx={{
                  width: "95%",
                }}
                disabled={addButtonLoading}
                onClick={handleAddButton}
                variant="contained"
              >
                {addButtonLoading ? (
                  <CircularProgress color="primary" />
                ) : (
                  <>
                    <AddCircleIcon /> Add
                  </>
                )}
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
