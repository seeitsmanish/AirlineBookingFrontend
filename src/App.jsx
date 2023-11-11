import "./App.css";
import Navbar from "./Navbar";
import AdminPanel from "./AdminPanel/AdminPanel";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchBar from "./SearchBar";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navbar />
      <SearchBar />
    </LocalizationProvider>
  );
}

export default App;
