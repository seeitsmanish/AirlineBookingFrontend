import React, { useState } from "react";
import "./CityView.css";
import Stack from "@mui/material/Stack";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Alert from "@mui/material/Alert";
import { Typography, TextField, Button, Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
const BASE_URL = "http://localhost:3000/";
import FormView from "./FormView";

export default function CityView() {
  const [cityName, setCityName] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [addButtonLoading, setAddButtonLoading] = useState(false);
  const formViewRef = React.useRef();

  const handleOnAddingCity = async () => {
    if (cityName === "") {
      setErrorMessage("City Name required!");
      setErrorAlert(true);
      return;
    }

    setAddButtonLoading(true);

    const postData = {
      name: cityName.trim(),
    };

    try {
      const response = await axios.post(`${BASE_URL}api/v1/cities`, postData);
      console.log(response.data);
      setTimeout(() => {
        setAddButtonLoading(false);
        setSuccessMessage(response.data.message);
        setSuccessAlert(true);
        formViewRef.current.fetchData();
        setCityName("");
      }, 1000);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.err || "Something went wrong");
      setErrorAlert(true);
    }
  };

  return (
    <div>
      <div className="container">
        <Stack spacing={5}>
          <div className="Introduction_section">
            <div className="symbol">
              <LocationCityIcon fontSize="large" />
            </div>
            <div className="resource_name">
              <Typography variant="h4" gutterBottom>
                Cities
              </Typography>
            </div>
          </div>

          <div className="form_section">
            <Paper elevation={2} className="form_section_paper">
              <div className="heading">
                <Typography variant="h4">Add City</Typography>
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
                    label="City Name"
                    variant="outlined"
                    required
                    value={cityName}
                    onChange={(event) => setCityName(event.target.value)}
                    disabled={addButtonLoading}
                  />
                </div>

                <div className="form_item form_submit_button">
                  <Button
                    sx={{
                      width: "95%",
                    }}
                    disabled={addButtonLoading}
                    onClick={handleOnAddingCity}
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

          <div className="grid_view">
            <Paper elevation={2} className="form_section_paper">
              <FormView ref={formViewRef} />
            </Paper>
          </div>
        </Stack>
      </div>
    </div>
  );
}
