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
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const fileReader = new FileReader();
  
    const handleOnChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const csvFileToArray = string => {
      const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
      const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
      
      const array = csvRows.map(i => {
        const values = i.split(",");
        const obj = csvHeader.reduce((object, header, index) => {
          object[header] = values[index];
          return object;
        }, {});
        return obj;
      });
      setArray(array);
    };
  
    const handleOnSubmit = (e) => {
      e.preventDefault();
  
      if (file) {
        fileReader.onload = function (event) {
          const text = event.target.result;
          csvFileToArray(text);
          handleOpen();
        };
  
        fileReader.readAsText(file);
      }
    };
    const headerKeys = Object.keys(Object.assign({}, ...array));

    function closeModal(){
        handleClose();
    }
    function submitAndClose(){
        event.preventDefault();
  dispatch({
    type: 'CSV_STUDENTS',
    payload: {
        // userId: userId,
        // studentId: studentId,
        // lastName: lastName,
        // graduationYear: graduationYear,
        // email: email,
        // race: race,
        // eip: eip,
        // gender: gender,
        // lunchStatus: lunchStatus,
        // schoolId: schoolId,

        array
    }});
    dispatch({ type: 'GET_STUDENTS' });
        handleClose();
}
    

console.log(array)
console.log(file)
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
          <thead>
            <tr key={"header"}>
              {headerKeys.map((key) => (
                <th>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {array.map((item) => (
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

      <div style={{}}>
        <form>
            <h5>Upload Student CSV List</h5>
          <input
            type={"file"}
            id={"csvFileInput"}
            accept={".csv"}
            onChange={handleOnChange}
          />
  
          <button
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            Import CSV
          </button>
        </form>
  
        <br />
        </div>
        <CSVReader
      onUploadAccepted={(results: any) => {
        console.log('---------------------------');
        console.log(results.data);
        console.log('---------------------------');
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

// export default function CsvUpload() {




//   return (
    // <CSVReader
    //   onUploadAccepted={(results: any) => {
    //     console.log('---------------------------');
    //     console.log(results.data);
    //     console.log('---------------------------');
    //   }}
    // >
    //   {({
    //     getRootProps,
    //     acceptedFile,
    //     ProgressBar,
    //     getRemoveFileProps,
    //   }: any) => (
    //     <>>
    //         <button type='button' {...getRootProps()}>
    //           Browse file
    //         </button>
    //         <button {...getRemoveFileProps()}>
    //           Remove
    //         </button>
          
    //       <ProgressBar />
    //     </>
    //   )}
    // </CSVReader>
//   );
// }
