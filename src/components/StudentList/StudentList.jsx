import { useState } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import CsvUpload from "../CsvUpload/CsvUpload";
import Box from "@mui/material/Box";

function StudentList() {
  const store = useSelector((store) => store);
  const students = useSelector((store) => store.studentReducer);
  console.log(students);
  const columns = [
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "graduationYear",
      headerName: "Grad Year",
      width: 110,
      editable: true,
    },
    {
      field: "schoolId",
      headerName: "School",
      width: 110,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 110,
      editable: true,
    },
    {
      field: "race",
      headerName: "Race",
      width: 110,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 110,
      editable: true,
    },
    {
      field: "lunchStatus",
      headerName: " Lunch Status",
      width: 110,
      editable: true,
    },
    {
      field: "eip",
      headerName: " EIP",
      width: 110,
      editable: true,
    },
  ];

  return (
    <Box
    
    sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignContent: 'center',
      p: 10,
      m: 10,
    }}
    >

      <CsvUpload />

      <DataGrid
        rows={students}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
        disableSelectionOnClick
        fullWidth
        />
        </Box>
    
  );
}

export default StudentList;
