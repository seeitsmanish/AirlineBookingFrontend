import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const countOfTravellers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Gives functionality of debounced update for a passed state
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

// Main export function
export default function SearchBar() {
  // for alerts
  const [alerts, setAlerts] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // for search and debounced search
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [cities, setCities] = useState([]);

  // search form attributes
  const [departureCity, setDepartureCity] = useState(null);
  const [destinationCity, setDestinationCity] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [numberOfTravellers, setNumberOfTravellers] = useState(1);

  // for Fetching cities for Autocomplete
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/searchCities?name=${debouncedSearch}`
        );
        console.log(response);
        setCities(response.data.data);
      } catch (error) {
        console.log("Error while fetching cities");
        console.log(error);
      }
    };
    fetchCities();
  }, [debouncedSearch]);

  // For performing validations of search form fields
  const performValidationsAndSetAlerts = () => {
    let alertMessage = "";
    if (departureCity == null) {
      alertMessage += "Departure City, ";
    }
    if (destinationCity == null) {
      alertMessage += "Destination City, ";
    }
    if (departureDate == null) {
      alertMessage += "Departure Date, ";
    }

    if (alertMessage.length > 0) {
      setAlertMessage(`${alertMessage} is/are required!`);
      setAlertSeverity("error");
      setAlerts(true);

      return false;
    }

    return true;
  };

  // for fetching flights
  const searchForFlights = async () => {
    const isEveryFieldOk = performValidationsAndSetAlerts();
    if (isEveryFieldOk == false) return;
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10) || 1; // Ensure a valid integer is set
    setNumberOfTravelers(value);
  };

  return (
    <Paper
      elevation={3}
      style={{
        margin: "150px 150px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        padding: "50px",
        border: "2px solid #1A76D2",
        borderRadius: "10px",
      }}
    >
      {/* For alerts at the top of box */}
      {alerts && (
        <ClickAwayListener
          onClickAway={() => {
            setAlerts(false);
          }}
        >
          <Alert severity={alertSeverity}>{alertMessage}</Alert>
        </ClickAwayListener>
      )}

      {/* This Div contains all the fields of search box */}
      <div
        className="fields"
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "space-evenly",
        }}
      >
        {/* Departure  */}
        <Autocomplete
          style={{
            width: "20%",
          }}
          getOptionLabel={(option) => option.name}
          placeholder="Departure"
          options={cities}
          value={departureCity}
          onChange={(event, newValue) => {
            setDepartureCity(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Departure"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          )}
        />

        {/* Destionation  */}
        <Autocomplete
          style={{ width: "20%" }}
          getOptionLabel={(option) => option.name}
          placeholder="Destination"
          options={cities}
          value={destinationCity}
          onChange={(event, newValue) => {
            setDestinationCity(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Destination"
              value={destinationCity}
              onChange={(event) => setSearch(event.target.value)}
            />
          )}
        />

        {/* Departure Date */}
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          style={{ width: "20%" }}
        >
          <DatePicker
            style={{ width: "20%" }}
            value={departureDate}
            onChange={(newValue) => {
              setDepartureDate(newValue);
            }}
            label="Departure date"
            disablePast
          />
        </LocalizationProvider>

        {/* Return Date */}
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          style={{ width: "20%" }}
        >
          <DatePicker
            style={{ width: "20%" }}
            label="Return Date "
            value={returnDate}
            onChange={(newValue) => {
              setReturnDate(newValue);
            }}
            disablePast
          />
        </LocalizationProvider>

        {/* No of Travellers */}
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="number-select-label">No of Travllers</InputLabel>
          <Select
            labelId="number-select-label"
            id="number-select"
            value={numberOfTravellers}
            onChange={(event) => {
              setNumberOfTravellers(event.target.value);
            }}
            label="Select a Number"
          >
            {countOfTravellers.map((traveller) => (
              <MenuItem key={traveller} value={traveller}>
                {traveller}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Search Button */}
      <div
        className="searchbutton"
        style={{
          width: "100%",
        }}
      >
        <center>
          <Button
            style={{
              width: "30%",
              height: "50px",
              fontSize: "18px",
            }}
            variant="contained"
            onClick={searchForFlights}
          >
            <Typography>🔍 Search Flights</Typography>
          </Button>
        </center>
      </div>
    </Paper>
  );
}
