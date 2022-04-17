import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from "@mui/x-data-grid";
import CsvUpload from "../CsvUpload/CsvUpload";
import './StudentList.css'
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';
import { getAccordionDetailsUtilityClass } from "@mui/material";
import { ContactlessOutlined } from "@mui/icons-material";

function StudentList() {
  const dispatch = useDispatch();
  const history = useHistory ();
  const students = useSelector((store) => store.studentReducer.studentReducer);
  console.log(students);
  const columns = [
    {
      field: "",
      headerName: "Details",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params: CellParams) => (
        <Button
        variant="outlined"
          onClick={() => {
            storeDetails(params.row)
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
      field: "schoolId",
      headerName: "School",
      width: 80,
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
      field: "lunchStatus",
      headerName: " Lunch Status",
      width: 80,
    },
    {
      field: "eip",
      headerName: " EIP",
      width: 80,
    },
  ];
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
