import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ConstructionOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';

function StudentEdit() {

  const dispatch = useDispatch();
  const history = useHistory();
  const editStudent = useSelector((store) => store.studentReducer.editStudent.details);

  function handleChange(event) {
    dispatch({ 
                type: 'EDIT_ONCHANGE', 
                payload: { property: 'firstName', value: event.target.value }
            });

  }

  // Called when the submit button is pressed
  function handleSubmit(event) {
    event.preventDefault();
    console.log(editStudent.id)
    // PUT REQUEST to /students/:id
    axios.put(`/api/student/${editStudent.id}`, editStudent)
        .then( response => {
            // clean up reducer data            
            dispatch({ type: 'EDIT_CLEAR' });

            // refresh will happen with useEffect on Home
            history.push('/'); // back to list
        })
        .catch(error => {
            console.log('error on PUT: ', error);
        })
    
  };

  console.log(editStudent.firstName)

  return (
    <>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <TextField
           onChange={(event) => handleChange(event)}
          id="standard-helperText"
          defaultValue={editStudent.firstName}
          helperText="First Name"
          variant="standard"
        />
        <TextField
           onChange={(event) => handleChange(event)}
          id="standard-helperText"
          defaultValue={editStudent.firstName}
          helperText="First Name"
          variant="standard"
        />
        <TextField
           onChange={(event) => handleChange(event)}
          id="standard-helperText"
          defaultValue={editStudent.firstName}
          helperText="First Name"
          variant="standard"
        />
        <TextField
           onChange={(event) => handleChange(event)}
          id="standard-helperText"
          defaultValue={editStudent.firstName}
          helperText="First Name"
          variant="standard"
        />
        <TextField
           onChange={(event) => handleChange(event)}
          id="standard-helperText"
          defaultValue={editStudent.firstName}
          helperText="First Name"
          variant="standard"
        />
        <TextField
           onChange={(event) => handleChange(event)}
          id="standard-helperText"
          defaultValue={editStudent.firstName}
          helperText="First Name"
          variant="standard"
        />
        <input type='submit' value='Update Student Information' />
      </form>
    </>
  );
}

export default StudentEdit;
