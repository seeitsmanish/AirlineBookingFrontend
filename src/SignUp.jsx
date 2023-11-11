import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function Signup({ open, setOpen, setAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp() {
    try {
      const res = await fetch("http://localhost:3004/api/v1/signup", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
      localStorage.setItem("token", data.data.token);
      setAuthenticated(true);
      handleClose();
    } catch (error) {
      console.log("Something went wrong during signUp", error);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };
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
          <Typography variant={"h6"}>
            Welcome to Booking.com! Sign up below
          </Typography>
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
              onClick={handleSignUp}
            >
              Signup
            </Button>
          </Card>
        </div>
      </Dialog>
    </div>
  );
}

export default Signup;
