import React, { useState } from 'react';
import {useSelector} from 'react-redux';

import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../BackButton/Backbutton';

function Schools(props) {

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Schools Component');
  const [schoolName, setSchoolName] = useState()

  const history = useHistory();

  const handleSubmit = () => {
    axios.post('/api/schools', {name: schoolName})
    .then((response) => {
      console.log('Post response.data is', response.data)
    }).catch((err) => {
      console.log('Post error is', err)
    })
  }

  return (
    <div>
      <BackButton history={history}/>
      <h2>{heading}</h2>
      <Box sx={{
          display: 'flex',        
          justifyContent: 'center'
      }}>
        <h1>Add School</h1>
      </Box>     
      <Box sx={{ width: 500, boxShadow: 1,
            p: 5, display: 'flex', justifyContent: 'center'}}>
        <TextField fullWidth label="School Name" id="school-name" size="normal" sx={{p: 1}}
        onChange={(event) => setSchoolName(event.target.value)}/>
        <Button variant="contained" onClick={handleSubmit}>
          Add New School
        </Button>
      </Box>
    </div>
  );
}

export default Schools;
