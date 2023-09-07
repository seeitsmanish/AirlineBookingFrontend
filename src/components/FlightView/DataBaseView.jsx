import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormDialog from "./FormDialog";
const url = "http://localhost:3000/api/v1/flights";

const DataBaseView = (props) => {
  const { dataObject, fetchData } = props;
  const { data, setData } = dataObject;
  const [openDialog, setOpenDialog] = useState(false);
  const [rowValues, setRowValues] = useState({
    id: "",
    flightNumber: "",
    airplaneId: "",
    arrivalAirportId: "",
    departureAirportId: "",
    arrivalTime: "",
    departureTime: "",
    price: "",
    totalSeats: "",
    createdAt: "",
    updatedAt: "",
  });

  const handleEdit = (params) => {
    const obj = params.row;
    setRowValues({ ...obj });
    console.log();
    setOpenDialog(true);
  };

  const handleDelete = (params) => {
    handleRowDelete(params.row.id);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 10,
    },
    {
      field: "flightNumber",
      headerName: "Flight Number",
      width: 100,
    },
    {
      field: "airplaneId",
      headerName: "Airplane Id",
      width: 100,
    },
    {
      field: "departureAirportId",
      headerName: "Departure Airport Id",
      width: 150,
    },
    {
      field: "arrivalAirportId",
      headerName: "Arrival Airport Id",
      width: 150,
    },
    {
      field: "departureTime",
      headerName: "Departure Time",
      width: 200,
    },
    {
      field: "arrivalTime",
      headerName: "Arrival Time",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "totalSeats",
      headerName: "Total Seats",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            color="primary"
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params)}
          >
            Edit
          </Button>
          <Button
            color="error"
            variant="outlined"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchData(url);
  }, []);

  const handleRowUpdate = async (params) => {
    const updatedItem = { ...params };
    updatedItem["arrivalTime"] = updatedItem["arrivalTime"].format(
      "YYYY-MM-DDTHH:mm:ss"
    );
    updatedItem["departureTime"] = updatedItem["departureTime"].format(
      "YYYY-MM-DDTHH:mm:ss"
    );

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/flights/${updatedItem.id}`,
        updatedItem
      ); // Adjust the URL accordingly
      const fetchedRow = response.data.data;
      setData(
        data.map((item) => (item.id === fetchedRow.id ? fetchedRow : item))
      );
      fetchData("http://localhost:3000/api/v1/flights");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRowDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/v1/flights/${id}`);
    setData(data.filter((item) => item.id !== id));
    fetchData();
  };

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={data} columns={columns} pageSize={5} />
      </div>

      <FormDialog
        open={openDialog}
        rowValues={rowValues}
        setOpenDialog={setOpenDialog}
        handleRowUpdate={handleRowUpdate}
      />
    </>
  );
};

export default DataBaseView;
