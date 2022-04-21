import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import InputLabel from "@mui/material/InputLabel";
import { Select, Typography } from "@mui/material";
import { ConstructionOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";

function StudentEdit() {

  const dispatch = useDispatch();
  const history = useHistory();
  const editStudent = useSelector((store) => store.studentReducer.editStudent.details);

  function handleChange(event) {
    dispatch({ 
                type: 'EDIT_ONCHANGE', 
                payload: { value: event.target.value }
            });

  }

  // Called when the submit button is pressed
  function handleSubmit(event) {
    event.preventDefault();
    console.log(editStudent.id)
    console.log(editStudent)
     
    // PUT REQUEST to /students/:id
    axios.put(`/api/student/editstudent/${editStudent.id}`, editStudent)
        .then( response => {
            // clean up reducer data
                        
            dispatch({ type: 'EDIT_CLEAR' });

            // refresh will happen with useEffect on Home
            history.push('/students'); // back to list
        })
        .catch(error => {
            console.log('error on PUT: ', error);
        })
    
  };



  return (
    <>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <TextField
           onChange={(event) => handleChange(event)}
          id="firstName"
          defaultValue={editStudent?.firstName}
          helperText="First Name"
          variant="standard"
        />
        <TextField
           onChange={(event) => handleChange(event)}
          id="lastName"
          defaultValue={editStudent?.lastName}
          helperText="Last Name"
          variant="standard"
        />
          <TextField
           onChange={(event) => handleChange(event)}
          id="email"
          defaultValue={editStudent?.email}
          helperText="Email"
          variant="standard"
        />
        <TextField
           onChange={(event) => handleChange(event)}
          id="studentId"
          defaultValue={editStudent?.studentId}
          helperText="Student ID #"
          variant="standard"
        />
         <InputLabel id="eip">EIP</InputLabel>
          <Select
            labelId="eip"
            id="eip"
            defaultValue={editStudent?.eip}
            label="EIP"
            onChange={(event) => handleChange(event)}
          >
            <MenuItem value={false}>False</MenuItem>
            <MenuItem value={true}>True</MenuItem>
          </Select>
          {/* <InputLabel id="lunchStatus">Lunch Status</InputLabel>
          <Select
            labelId="lunchStatus"
            id="lunchStatus"
            value={editStudent.status}
            defaultValue={editStudent.status}
            label="Lunch Status"
            onChange={(event) => handleChange(event)}
          >
            <MenuItem value="na">N/A</MenuItem>
            <MenuItem value="free">Free</MenuItem>
            <MenuItem value="reduced">Reduced</MenuItem>
          </Select> */}
        <input type='submit' value='Update Student Information' />
      </form>
    </>
  );
}

export default StudentEdit;
