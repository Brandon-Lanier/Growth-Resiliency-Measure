//
// Controls Admins from the super Admin
//
//
//

import React, { useState } from "react";
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

function AdminControl(props) {
  //   const store = useSelector((store) => store);
  const [heading, setHeading] = useState("Add Assessment Cohort");

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
          justifyContent: "center",
          alignContent: "center",
          color: "black",
          pt: 10,
        }}
      >
        <h1>{heading}</h1>
        <p>
          &Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          ducimus eius suscipit dicta hic labore. Quod, exercitationem ducimus
          cum expedita odio, neque perferendis deleniti minima minus accusantium
          aperiam, autem suscipit.
        </p>
      </Box>
    </div>
  );
}

export default AdminControl;
