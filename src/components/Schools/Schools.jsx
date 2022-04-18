import React, { useState } from 'react';
import {useSelector} from 'react-redux';

import AddCohort from '../AddCohort/AddCohort';

import Box from "@mui/material/Box";
import SchoolIcon from "@mui/icons-material/School";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from 'axios';



function Schools(props) {

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Schools Component');

  const handleSubmit = () => {
    axios.post('/api/schools')
    .then((response) => {
      console.log('Post response.data is', response.data)
    }).catch((err) => {
      console.log('Post error is', err)
    })
  }

  return (
    <div>
      <h2>{heading}</h2>
      <h1>BROKEN COMPONENT - NEEDS REVIEW</h1>
      {/* <Box sx={{
          display: 'flex',
          
          justifyContent: 'center'
      }}>
<h1>Add Cohort</h1>
      <AddCohort />
      </Box>
      
      <Box sx={{ width: 500, boxShadow: 1,
            p: 5, display: 'flex', justifyContent: 'center'}}>
        <TextField fullWidth label="School Name" id="school-name" size="normal" sx={{p: 1}}/>
        <Button variant="contained" onClick={handleSubmit}>
          Add New School
        </Button>
      </Box> */}
    </div>
  );
}

export default Schools;
