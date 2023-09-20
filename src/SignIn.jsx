import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function SignIn({ open, setOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            aria-label="cross"
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
        </div>
        <div
          style={{
            paddingTop: 30,
            marginBottom: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant={"h6"}>Welcome Back! SignIn Below!</Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
            <TextField
              onChange={(evant11) => {
                let elemt = evant11.target;
                setEmail(elemt.value);
              }}
              fullWidth={true}
              label="Email"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              fullWidth={true}
              label="Password"
              variant="outlined"
              type={"password"}
            />
            <br />
            <br />

            <Button
              size={"large"}
              variant="contained"
              sx={{
                width: "100%",
              }}
              onClick={() => {
                function callback2(data) {
                  localStorage.setItem("token", data.data);
                }
                function callback1(res) {
                  res.json().then(callback2);
                }
                fetch("http://localhost:3004/api/v1/signin", {
                  method: "POST",
                  body: JSON.stringify({
                    email: email,
                    password: password,
                  }),
                  headers: {
                    "Content-type": "application/json",
                  },
                }).then(callback1);
              }}
            >
              SignIn
            </Button>
          </Card>
        </div>
      </Dialog>
    </div>
  );
}

export default SignIn;
