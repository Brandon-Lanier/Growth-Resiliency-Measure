import React, { useState } from 'react';
import {useSelector} from 'react-redux';

import AddCohort from '../AddCohort/AddCohort';

import Box from "@mui/material/Box";

function Schools(props) {

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Schools Component');

  return (
    <div>
      <h2>{heading}</h2>
      <Box sx={{
          display: 'flex',
          
          justifyContent: 'center'
      }}>
<h1>Add Cohort</h1>
      <AddCohort />
      </Box>
    </div>
  );
}

export default Schools;
