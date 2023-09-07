import LeftBarList from "./components/LeftBarList";
import "./AdminPanel.css";
import CityView from "./components/CityView/CityView.jsx";
import AirplaneView from "./components/AirplaneView/AirplaneView.jsx";
import AirportView from "./components/AirportView/AirportView.jsx";
import FlightView from "./components/FlightView/FlightView.jsx";
import AdminPanelWelcomePage from "./components/AdminPanelWelcomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as React from "react";

function AdminPanel() {
  return (
    <Router>
      <div className="main_page">
        <div className="left_side">
          <LeftBarList></LeftBarList>
        </div>

        <div className="right_side">
          <Routes>
            <Route path="/" element={<AdminPanelWelcomePage />} />
            <Route path="/cities" element={<CityView />} />
            <Route path="/airplanes" element={<AirplaneView />} />
            <Route path="/airports" element={<AirportView />} />
            <Route path="/flights" element={<FlightView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default AdminPanel;
