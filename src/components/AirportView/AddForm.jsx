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

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cityId, setCityId] = useState("");

  const handleAddButton = async () => {
    if (name === "" || address === "" || cityId === "") {
      setErrorMessage("Name or Address or City Id is Empty!");
      setErrorAlert(true);
      return;
    }

    setAddButtonLoading(true);

    const postData = {
      name: name.trim(),
      address: address.trim(),
      cityId: cityId.trim(),
    };
    const url = `${BASE_URL}/airports`;

    try {
      const response = await axios.post(`${BASE_URL}/airports`, postData);
      console.log(response.data);
      setTimeout(() => {
        setAddButtonLoading(false);
        setSuccessMessage(response.data.message);
        setSuccessAlert(true);
        setName("");
        setAddress("");
        setCityId("");
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
            <Typography variant="h4">Add Airport</Typography>
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
                label="Name"
                variant="outlined"
                required
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={addButtonLoading}
              />
            </div>

            <div className="form_item">
              <TextField
                sx={{
                  width: "70%",
                }}
                id="outlined-basic"
                label="Address"
                variant="outlined"
                required
                name="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                disabled={addButtonLoading}
              />
            </div>

            <div className="form_item">
              <TextField
                sx={{
                  width: "70%",
                }}
                id="outlined-basic"
                label="City Id"
                variant="outlined"
                required
                name="cityId"
                value={cityId}
                onChange={(event) => setCityId(event.target.value)}
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
