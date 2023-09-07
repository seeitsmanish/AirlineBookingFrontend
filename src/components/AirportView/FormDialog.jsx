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

export default function FormDialog({
  open,
  rowValues,
  setOpenDialog,
  handleRowUpdate,
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ ...rowValues });

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    setLoading(true);
    console.log(formData);
    try {
      const data = await handleRowUpdate(formData);
      //   console.log("success");
      console.log(data);
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
    setFormData({ ...rowValues });
  }, [rowValues]);

  const handleInputChange = (event) => {
    // console.log(formData);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit City</DialogTitle>
      <DialogContent>
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: "30vw",
            height: "auto",
          }}
        >
          <TextField
            name="id"
            label="Id"
            variant="outlined"
            fullWidth
            value={formData.id}
            onChange={handleInputChange}
            disabled
            // Add ID field properties here (e.g., value, onChange, etc.)
          />
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
            // disabled
            // Add ID field properties here (e.g., value, onChange, etc.)
          />
          <TextField
            name="address"
            label="Address"
            variant="outlined"
            fullWidth
            value={formData.address}
            onChange={handleInputChange}
            // Add Name field properties here (e.g., value, onChange, etc.)
          />
          <TextField
            name="cityId"
            label="City Id"
            variant="outlined"
            fullWidth
            value={formData.cityId}
            onChange={handleInputChange}
            // disabled
            // Add ID field properties here (e.g., value, onChange, etc.)
          />
          <TextField
            name="createdAt"
            label="Created At"
            variant="outlined"
            fullWidth
            value={formData.createdAt}
            onChange={handleInputChange}
            disabled
            // Add Created At field properties here (e.g., value, onChange, etc.)
          />
          <TextField
            name="updatedAt"
            label="Updated At"
            variant="outlined"
            fullWidth
            value={formData.updatedAt}
            onChange={handleInputChange}
            disabled
            // Add Deleted At field properties here (e.g., value, onChange, etc.)
          />
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
