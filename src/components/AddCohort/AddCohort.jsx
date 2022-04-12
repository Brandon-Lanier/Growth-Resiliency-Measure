// 
// This component creates a new cohort for tests to the database. It should end up creating two lines in the 
// AssessmentBatches table
//
//
//

import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from "@mui/material/Box";

function AddCohort(props) {

//   const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Add Assessment Cohort');

  const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };


  return (
    <div>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',

          justifyContent: 'center'
      }}>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <h2>{heading}</h2>
      <DatePicker
        label="Semester Start"
        value={value}
        onChange={(newValue) => {
            setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        />
            <DatePicker
        label="Semester End"
        value={value}
        onChange={(newValue) => {
            setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
        </Box>
    </div>
  );
}

export default AddCohort;
