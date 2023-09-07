import "./App.css";
import Navbar from "./components/Navbar";
import AdminPanel from "./AdminPanel";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navbar />
      <AdminPanel />
    </LocalizationProvider>
  );
}

export default App;
