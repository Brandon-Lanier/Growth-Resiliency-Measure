import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useCSVReader } from 'react-papaparse';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { CSVLink } from "react-csv";

function CsvUpload() {
  const { CSVReader } = useCSVReader();
  const dispatch = useDispatch();
  const [studentArray, setStudentArray] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const csvTemplate = [{
    studentId: 'number',
    firstName: 'text',
    lastName: 'text',
    graduationYear: 'number',
    email: 'text',
    race: 'number (1-5)',
    eip: 'true or false',
    schoolId: 'number',
    gender: 'number (1-5)',
    lunchStatus: 'number (1-3)'
  }]

  function closeModal() {
    handleClose();
  }

  function submitAndClose() {
    dispatch({
      type: "CSV_STUDENTS",
      payload: {
        studentArray
      },
    });
    dispatch({ type: "GET_STUDENTS" });
    handleClose();
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    backgroundColor: '#fff',
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box style={style} sx={{p: 4}}>
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
        <Stack direction="row" spacing={2}>
        <Button onClick={closeModal} variant="outlined" startIcon={<DeleteIcon />}>
        Cancel</Button>
        <Button onClick={submitAndClose} variant="contained" endIcon={<SendIcon />}>
        Submit</Button>
        </Stack>
        </Box>
      </Modal>

        <CSVReader
          config={{header: true}}
      onUploadAccepted={(results: any) => {
        console.log('---------------------------');
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
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Button variant="contained"  sx={{width: "200px", m: 3}} type='button' endIcon={<SendIcon />}{...getRootProps()}>
              Upload CSV
            </Button>
            <CSVLink data={csvTemplate} className="data-link">Download Template</CSVLink>
          <ProgressBar />
        </Box>
      )}
    </CSVReader>
      </div>
    );
  }
export default CsvUpload;
