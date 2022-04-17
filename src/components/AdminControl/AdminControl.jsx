//
// Controls Admins from the super Admin
//
//
//

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import axios from "axios";

import AddAdminDialog from "./AddAdminDialog";
import AdminTable from "./AdminTable";

function AdminControl(props) {
  //   const school = useSelector((store) => store);
  //   const admins = useSelector((store) => store.admins)
  const [heading, setHeading] = useState("Add Assessment Cohort");
  const [admins, setAdmins] = useState([]);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetchAdministrators();
  }, []);

  const fetchAdministrators = () => {
    axios
      .get("/api/admincsv")
      .then((response) => {
        console.log("GET response.data is", response.data);
        setAdmins(response.data.admins);
        setSchools(response.data.schools);
      })
      .catch((err) => {
        console.log("GET error is", err);
      });
  };

  const removeAdmin = (id) => {
    axios.delete(`/api/admincsv/${id}`)
    .then((res) => {
        console.log('Deleted administrator row');
        fetchAdministrators();
    })
    .catch((err) => {
        console.log('Error on delete admin');
    });
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          color: "black",
          pt: 10,
        }}
      >
        <h1>Super Admin</h1>

        <AddAdminDialog schools={schools} get={fetchAdministrators}/>
        
        {schools.map((school) => (
          <>
            <h1>{school.name}</h1>
            <AdminTable
              key={school.id}
              admins={admins}
              school={school}
              removeAdmin={removeAdmin}
            />
            
          </>
        ))}
      </Box>
    </div>
  );
}

export default AdminControl;
