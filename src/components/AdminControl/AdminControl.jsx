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

import AddAdminForm from "./AddAdminForm"

function AdminControl(props) {

  const school = useSelector((store) => store);
//   const admins = useSelector((store) => store.admins)
  const [heading, setHeading] = useState("Add Assessment Cohort");
  const [admins, setAdmins] = useState([]); 


  
  useEffect(() => {
    fetchAdministrators();
  }, []);

  const fetchAdministrators = () => {

    axios.get('/api/admincsv')
      .then((response) => {
        console.log('GET response.data is', response.data)
        // dispatch admins to admin reducer 

      }).catch((err) => {
        console.log('GET error is', err)
      })
  }
  
  //   const [term, setTerm] = useState(1);
  //   const [value1, setValue1] = useState(new Date());
  //   const [value2, setValue2] = useState(new Date());
  //   const [valueYear, setValueYear] = useState(new Date());

  //   const handleSubmit = () => {

  //     const newBatch = {
  //       startDate: value1.toISOString().split("T")[0],
  //       endDate: value2.toISOString().split("T")[0],
  //       fiscalYear: valueYear.toISOString().substring(0, 4),
  //       term: term
  //     };
  //     console.log("New batch is", newBatch);
  //     try {
  //         axios.post("/api/admin/cohort", newBatch);

  //     } catch (error) {
  //         console.log('error on batch post',error);
  //     }

  //   };

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
        <h1>{heading}</h1>

          {/* <AddAdminForm />  */}
      </Box>
    </div>
  );
}

export default AdminControl;
