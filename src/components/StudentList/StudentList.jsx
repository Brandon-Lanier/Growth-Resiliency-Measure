import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import CsvUpload from "../CsvUpload/CsvUpload";
import Box from "@mui/material/Box";
import "./StudentList.css";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { Typography, Divider } from "@mui/material";
import BackButton from "../BackButton/Backbutton";

const datagridSx = {
  borderRadius: 2,
  "& .MuiDataGrid-main": { borderRadius: 2 },
  "& .MuiDataGrid-virtualScrollerRenderZone": {
    "& .MuiDataGrid-row": {
      "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" }
    }
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "rgba(17, 24, 39, 0.7)",
    color: "#fff",
    fontSize: 16
  },
  '& .MuiDataGrid-cell:hover': {
    color: 'rgba(17, 24, 39, 0.7)',
  }
};


function StudentList() {

  useEffect(() => {
    dispatch({ type: 'SET_STUDENT_PATH'})
  }, [])
  const dispatch = useDispatch();
  const history = useHistory();
  //pull student list from student reducer/store
  const students = useSelector((store) => store.studentReducer.studentReducer);
  const studentDetails = useSelector(
    (store) => store.studentReducer.studentDetailsReducer
  );
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
            storeDetails(params.row); //send what row was clicked to function storeDetails
          }}
        >
          Details
        </Button>
      ),
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
      width: 120,
    },
    {
      field: "studentId",
      headerName: "Student Id #",
      width: 70,
    },
    {
      field: "name",
      headerName: "School",
      width: 140,
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
  function storeDetails(details) {
    console.log(details);
    dispatch({
      type: "SET_DETAILS",
      payload: {
        details,
      },
    });
    dispatch({ type: "FETCH_IND_SCORES", payload: details.id });
    dispatch({ type: "FETCH_TEST_DATES", payload: details.id });
    dispatch({ type: "FETCH_TEST_TOTAL", payload: details.id });
    history.push("/studentdetails");
  }
  //show datagrid of current students and import csv upload button component for display on this page.
  return (
    <div className="component-container">
      <BackButton history={history} />
      <div className="student-list-container">
        <Box sx={{
          boxShadow: 3, 
          width: '300px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 2
          }}>
        <Typography variant="h6" sx={{mt: 1}}>
          Import Students
        </Typography>
        <CsvUpload />
        </Box>
        <Divider sx={{m:2}}/>
      <Typography variant="h5">
          Student List:
        </Typography>
        <div id="grid-container">
          <DataGrid
            rows={students}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            disableSelectionOnClick
            autoHeight={true}
            autoPageSize={true}
            sx={datagridSx}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentList;
