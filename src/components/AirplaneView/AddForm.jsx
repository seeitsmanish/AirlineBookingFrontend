import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Alert from "@mui/material/Alert";
import { Typography, TextField, Button, Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
const BASE_URL = "http://localhost:3000/api/v1";

export default function (props) {
  const { fetchData } = props;
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [addButtonLoading, setAddButtonLoading] = useState(false);
  const formViewRef = React.useRef();

  const [modelNumber, setModelNumber] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleAddButton = async () => {
    if (modelNumber === "" || capacity === "") {
      setErrorMessage("Model Number or Capacity is Empty!");
      setErrorAlert(true);
      return;
    }

    setAddButtonLoading(true);

    const postData = {
      modelNumber: modelNumber.trim(),
      capacity: capacity.trim(),
    };
    const url = `${BASE_URL}/airplanes`;

    try {
      const response = await axios.post(`${BASE_URL}/airplanes`, postData);
      console.log(response.data);
      setTimeout(() => {
        setAddButtonLoading(false);
        setSuccessMessage(response.data.message);
        setSuccessAlert(true);
        setModelNumber("");
        setCapacity("");
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
            <Typography variant="h4">Add Airplane</Typography>
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

          <div className="form_container">
            <div className="form_item">
              <TextField
                sx={{
                  width: "70%",
                }}
                id="outlined-basic"
                label="Model Number"
                variant="outlined"
                required
                name="modelNumber"
                value={modelNumber}
                onChange={(event) => setModelNumber(event.target.value)}
                disabled={addButtonLoading}
              />
            </div>

            <div className="form_item">
              <TextField
                sx={{
                  width: "70%",
                }}
                id="outlined-basic"
                label="Capacity"
                variant="outlined"
                required
                name="capacity"
                value={capacity}
                onChange={(event) => setCapacity(event.target.value)}
                disabled={addButtonLoading}
              />
            </div>

            <div className="form_item form_submit_button">
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
