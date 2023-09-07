import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormDialog from "./FormDialog";
const url = "http://localhost:3000/api/v1/airports/";

const DataBaseView = (props) => {
  const { dataObject, fetchData } = props;
  const { data, setData } = dataObject;
  const [openDialog, setOpenDialog] = useState(false);
  const [rowValues, setRowValues] = useState({
    id: "",
    name: "",
    address: "",
    cityId: "",
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
      width: 100,
    },
    { field: "name", headerName: "Name", width: 300 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "cityId", headerName: "City Id", width: 100 },
    { field: "createdAt", headerName: "Created At", width: 250 },
    { field: "updatedAt", headerName: "Updated At", width: 250 },
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

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/airports/${updatedItem.id}`,
        updatedItem
      ); // Adjust the URL accordingly
      const fetchedRow = response.data.data;
      setData(
        data.map((item) => (item.id === fetchedRow.id ? fetchedRow : item))
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRowDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/v1/airports/${id}`);
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
