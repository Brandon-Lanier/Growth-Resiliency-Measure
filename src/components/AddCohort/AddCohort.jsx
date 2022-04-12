//
// This component creates a new cohort for tests to the database. It should end up creating two lines in the
// AssessmentBatches table
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
import axios from "axios";

function AddCohort(props) {
  //   const store = useSelector((store) => store);
  const [heading, setHeading] = useState("Add Assessment Cohort");

  const [value1, setValue1] = useState(new Date());
  const [value2, setValue2] = useState(new Date());
  const [valueYear, setValueYear] = useState(new Date());

  const handleSubmit = () => {
    const newBatch = {
      startDate: value1.toISOString().split("T")[0],
      endDate: value2.toISOString().split("T")[0],
      fiscalYear: valueYear.toISOString().substring(0, 4),
    };
    console.log("New batch is", newBatch);
    try {
        axios.post("/api/admin/cohort", newBatch);

    } catch (error) {
        console.log('error on batch post',error);
    }


  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
          sx={{
            boxShadow: 1,
            p: 5,
          }}
        >
          <Stack spacing={3}>
            <h2>{heading}</h2>
            <DatePicker
              label="Semester Start"
              value={value1}
              margin={2}
              onChange={(newValue) => {
                setValue1(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="Semester End"
              value={value2}
              onChange={(newValue) => {
                setValue2(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              views={["year"]}
              label="School Year"
              value={valueYear}
              onChange={(newValue) => {
                setValueYear(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Box>
      </LocalizationProvider>
    </div>
  );
}

export default AddCohort;
