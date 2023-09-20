import "./App.css";
import Navbar from "./Navbar";
import AdminPanel from "./AdminPanel/AdminPanel";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Signup from "./SignUp";
import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navbar />
      {/* <AdminPanel /> */}
    </LocalizationProvider>
  );
}

export default App;
