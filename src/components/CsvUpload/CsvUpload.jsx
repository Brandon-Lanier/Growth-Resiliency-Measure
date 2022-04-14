import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useCSVReader } from 'react-papaparse';

function CsvUpload() {
  const { CSVReader } = useCSVReader();
    const dispatch = useDispatch();
    const [studentArray, setStudentArray] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const fileReader = new FileReader();
  
    const handleOnChange = (e) => {
 
    };
  
    
    const handleOnSubmit = (e) => {
      e.preventDefault();
  
    
      }


    function closeModal(){
        handleClose();
    }
    function submitAndClose(){
  dispatch({
    type: 'CSV_STUDENTS',
    payload: {
        // userId: studentArray[0][0],
        // studentId: studentArray[0][1],
        // firstName: studentArray[0][2],
        // lastName: studentArray[0][3],
        // graduationYear: studentArray[0][4],
        // email: studentArray[0][5],
        // race: studentArray[0][6],
        // eip: studentArray[0][7],
        // schoolId: studentArray[0][8],
        // gender: studentArray[0][9],
        // lunchStatus: studentArray[0][10],
        studentArray
    }});
    dispatch({ type: 'GET_STUDENTS' });
        handleClose();
}
    


    return (
        <>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={{
        // width: 800,
        // height: 900,
        backgroundColor: 'White',
        }}>
        <button onClick={closeModal}>Close without submitting</button>
        <button onClick={submitAndClose}>Submit and Close</button>
        <table>
          <tbody>
            {studentArray.map((item) => (
              <tr key={item.id}>
                {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </Box>
      </Modal>


       
            <h5>Upload Student CSV List</h5>
        <CSVReader
          config={{header: true}}
      onUploadAccepted={(results: any) => {
        console.log('---------------------------');
        // results.data.shift();
        console.log(results.data)
        setStudentArray(results.data)
        console.log('---------------------------');
        handleOpen();
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>>
            <button type='button' {...getRootProps()}>
              Browse file
            </button>
            <button {...getRemoveFileProps()}>
              Remove
            </button>
          
          <ProgressBar />
        </>
      )}
    </CSVReader>
      </>
    );
  }
export default CsvUpload



