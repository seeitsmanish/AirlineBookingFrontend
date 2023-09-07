import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormDialog from "./FormDialog";

const FormView = React.forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [rowValues, setRowValues] = useState({
    id: "",
    name: "",
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
    { field: "name", headerName: "Name", width: 200 },
    { field: "createdAt", headerName: "CreatedAt", width: 250 },
    { field: "updatedAt", headerName: "UpdatedAt", width: 250 },
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
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/cities"); // Adjust the URL accordingly
    console.log(response.data);
    setData(response.data.data);
  };

  const handleRowUpdate = async (params) => {
    const updatedItem = { ...params };
    const response = await axios.patch(
      `http://localhost:3000/api/v1/cities/${updatedItem.id}`,
      updatedItem
    ); // Adjust the URL accordingly
    const fetchedRow = response.data.data;
    setData(
      data.map((item) => (item.id === fetchedRow.id ? fetchedRow : item))
    );
    fetchData();
  };

  const handleRowDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/v1/cities/${id}`);
    setData(data.filter((item) => item.id !== id));
    fetchData();
  };

  React.useImperativeHandle(ref, () => ({
    fetchData,
  }));

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
});

export default FormView;
