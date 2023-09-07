import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import React, { useEffect, useState } from "react";
import { InputAdornment } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
// import "./FlightView.css";

export default function FormDialog({
  open,
  rowValues,
  setOpenDialog,
  handleRowUpdate,
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [id, setId] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [airplaneId, setAirplaneId] = useState("");
  const [departureAirportId, setDepartureAirportId] = useState("");
  const [arrivalAirportId, setArrivalAirportId] = useState("");
  const [arrivalTime, setArrivalTime] = useState(dayjs());
  const [departureTime, setDepartureTime] = useState(dayjs());
  const [price, setPrice] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const formData = {
    id: id,
    flightNumber: flightNumber,
    airplaneId: airplaneId,
    departureAirportId: departureAirportId,
    arrivalAirportId: arrivalAirportId,
    arrivalTime: arrivalTime,
    departureTime: departureTime,
    price: price,
    totalSeats: totalSeats,
    createdAt: createdAt,
    updatedAt: updatedAt,
  };

  const setFormdata = (rowData) => {
    setId(rowData.id);
    setFlightNumber(rowData.flightNumber);
    setAirplaneId(rowData.airplaneId);
    setDepartureAirportId(rowData.departureAirportId);
    setArrivalAirportId(rowData.arrivalAirportId);
    setArrivalTime(dayjs(rowData.arrivalTime));
    setDepartureTime(dayjs(rowData.departureTime));
    setPrice(rowData.price);
    setTotalSeats(rowData.totalSeats);
    setCreatedAt(rowValues.createdAt);
    setUpdatedAt(rowValues.updatedAt);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    setLoading(true);
    console.log(formData);
    try {
      // for database update
      const data = await handleRowUpdate(formData);
      console.log(data);

      // for updating view
      setFormdata(formData);

      // For animation
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
          handleCloseDialog();
        }, 1000);
      }, 2000);
    } catch (error) {
      console.log("Failed");
      handleCloseDialog();
    }
  };

  const handleClose = () => {
    console.log(rowValues);
    handleCloseDialog();
  };

  // Update the state when initialFormData changes (e.g., when editing a different row)
  useEffect(() => {
    setFormdata(rowValues);
  }, [rowValues]);

  // const handleInputChange = (event) => {
  //   // console.log(formData);
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>Edit Flight</DialogTitle>
      <DialogContent>
        <div className="grid_container_form_dialogue">
          <div className="field I1">
            <TextField
              name="id"
              label="Id"
              variant="outlined"
              fullWidth
              value={id}
              // onChange={handleInputChange}
              disabled
              // Add ID field properties here (e.g., value, onChange, etc.)
            />
          </div>

          <div className="field I2">
            <TextField
              name="flightNumber"
              label="Flight Number"
              variant="outlined"
              fullWidth
              value={flightNumber}
              onChange={(event) => {
                setFlightNumber(event.target.value);
              }}
              // disabled
              // Add ID field properties here (e.g., value, onChange, etc.)
            />
          </div>

          <div className="field I3">
            <TextField
              name="airplaneId"
              label="Airplane Id"
              variant="outlined"
              fullWidth
              value={airplaneId}
              onChange={(event) => {
                setAirplaneId(event.target.value);
              }}
              // disabled
              // Add ID field properties here (e.g., value, onChange, etc.)
            />
          </div>
          <div className="field I4">
            <TextField
              name="departureAirportId"
              label="Departure Id"
              variant="outlined"
              fullWidth
              value={departureAirportId}
              onChange={(event) => {
                setDepartureAirportId(event.target.value);
              }}
            />
          </div>

          <div className="field I5">
            <TextField
              name="arrivalAirportId"
              label="Arrivel Airport Id"
              variant="outlined"
              fullWidth
              value={arrivalAirportId}
              onChange={(event) => {
                setArrivalAirportId(event.target.value);
              }}
            />
          </div>

          <div className="field I6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Departure Time"
                  value={departureTime}
                  // disablePast
                  onChange={(date) => {
                    setDepartureTime(dayjs(date));
                    console.log(departureTime);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className="field I7">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Arrival Time"
                  value={arrivalTime}
                  // disablePast
                  onChange={(date) => {
                    setArrivalTime(dayjs(date));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className="field I8">
            <TextField
              name="price"
              label="Price"
              variant="outlined"
              fullWidth
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              // disabled
              // Add ID field properties here (e.g., value, onChange, etc.)
            />
          </div>

          <div className="field I9">
            <TextField
              name="totalSeats"
              label="Total Seats"
              variant="outlined"
              fullWidth
              value={totalSeats}
              onChange={(event) => {
                setTotalSeats(event.target.value);
              }}
              // disabled
              // Add ID field properties here (e.g., value, onChange, etc.)
            />
          </div>

          <div className="field I10">
            <TextField
              name="createdAt"
              label="Created At"
              variant="outlined"
              fullWidth
              value={createdAt}
              onChange={(event) => {
                setCreatedAt(event.target.value);
              }}
              disabled
              // Add ID field properties here (e.g., value, onChange, etc.)
            />
          </div>

          <div className="field I11">
            <TextField
              name="updatedAt"
              label="Updated At"
              variant="outlined"
              fullWidth
              value={updatedAt}
              onChange={(event) => {
                setUpdatedAt(event.target.value);
              }}
              disabled
              // Add ID field properties here (e.g., value, onChange, etc.)
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSave}
          variant="outlined"
          color="success"
          disabled={loading || success}
          startIcon={
            loading ? (
              <CircularProgress size={20} />
            ) : success ? (
              <CheckIcon />
            ) : null
          }
        >
          {loading ? "Loading" : success ? "Success" : "Save"}
        </Button>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="error"
          disabled={loading || success}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
