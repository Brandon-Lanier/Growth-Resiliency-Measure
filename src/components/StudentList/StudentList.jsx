import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from "@mui/x-data-grid";
import CsvUpload from "../CsvUpload/CsvUpload";
import Box from "@mui/material/Box";
import './StudentList.css'
import Button from "@mui/material/Button";
import { useHistory } from 'react-router-dom';
import { getAccordionDetailsUtilityClass } from "@mui/material";
import { ContactlessOutlined } from "@mui/icons-material";

function StudentList() {
  const dispatch = useDispatch();
  const history = useHistory ();
  //pull student list from student reducer/store
  const students = useSelector((store) => store.studentReducer.studentReducer);
  console.log(students);
  const columns = [
    //create a button for each line.
    {
      field: "",
      headerName: "Details",
      sortable: false,
      width: 90,
      disableClickEventBubbling: true,
      renderCell: (params: CellParams) => (
        <Button
        variant="outlined"
          onClick={() => {
            storeDetails(params.row)//send what row was clicked to function storeDetails
          }}
        >
          Details
        </Button>
      )
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 110,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 110,
    },
    {
      field: "graduationYear",
      headerName: "Grad Year",
      width: 80,
    },
    {
      field: "studentId",
      headerName: "Student Id #",
      width: 90,
    },
    {
      field: "name",
      headerName: "School",
      width: 160,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "race",
      headerName: "Race",
      width: 80,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 80,
    },
    {
      field: "status",
      headerName: "Lunch Status",
      width: 100,
    },
    {
      field: "eip",
      headerName: " EIP",
      width: 60,
    },
  ];
  //dispatch selected student and history.push to details page 
function storeDetails(details){
  console.log(details)
  dispatch({
    type: 'SET_DETAILS',
    payload: {
        details
    }
})
history.push('/studentdetails')
}
//show datagrid of current students and import csv upload button component for display on this page.
  return (
    <>
    <div className="student-list-container">
    <CsvUpload />
      <div id="grid-container">
      <DataGrid
        rows={students}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        disableSelectionOnClick
        autoHeight={true}
        autoPageSize={true}
      />
      </div>
    </div>

    </>
  );
}

export default StudentList;
