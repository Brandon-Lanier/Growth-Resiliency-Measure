//
// This component creates a new batch for tests to the database. It should end up creating two lines in the
// AssessmentBatches table
//
//
//
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';

import axios from "axios";

function AddBatch(props) {
  //   const store = useSelector((store) => store);
  const [heading, setHeading] = useState("Add Assessment Cohort");

  const [term, setTerm] = useState(1);
  const [batch, setBatch] = useState(1);
  const [value1, setValue1] = useState(new Date());
  const [value2, setValue2] = useState(new Date());
  const [valueYear, setValueYear] = useState(new Date());

  const dispatch = useDispatch();


  const handleSubmit = () => {
    const newBatch = {
      startDate: value1.toISOString().split("T")[0],
      endDate: value2.toISOString().split("T")[0],
      fiscalYear: valueYear.toISOString().substring(0, 4),
      term: term,
      batch: batch,
    };
    console.log("New batch is", newBatch);
    try {
      axios.post("/api/admin/cohort", newBatch);
    } catch (error) {
      console.log("error on batch post", error);
    }
    dispatch({ type: "FETCH_ACTIVE_BATCH" });
    //open confirmation modal
    setOpenConfirmation(true);
    // add timeout
  };

  //confirmation modal functions
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
    setOpen(false);
  }
  const styleConfirmation = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    backgroundColor: '#fff',
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Create New Assessment
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box style={style}>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
              <Stack spacing={2}>
                <Typography variant="h6">
                  New Assessment
                </Typography>
                <FormControl >
                  <InputLabel id="demo-simple-select-label">
                    Term / Semester
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={term}
                    label="Term / Semester "
                    onChange={(event) => setTerm(event.target.value)}
                  >
                    <MenuItem value={1}>Fall</MenuItem>
                    <MenuItem value={2}>Spring</MenuItem>
                  </Select>
                </FormControl>
                <FormControl >
                  <InputLabel id="demo-simple-select-label">
                    Batch
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={batch}
                    label="batch "
                    onChange={(event) => setBatch(event.target.value)}
                  >
                    <MenuItem value={1}>Batch 1</MenuItem>
                    <MenuItem value={2}>Batch 2</MenuItem>
                  </Select>
                </FormControl>
                <DatePicker
                  label="Start"
                  value={value1}
                  margin={2}
                  onChange={(newValue) => {
                    setValue1(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  label="End"
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

                {/* confirmation modal */}
                <Modal
                  open={openConfirmation}
                  onClose={handleCloseConfirmation}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={styleConfirmation}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      <DoneIcon color="primary" sx={{ mr: 4, fontSize: 30 }} />
                      New Assessment Added
                    </Typography>
                  </Box>
                </Modal>

                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>

              </Stack>
            </Box>
          </Box>
        </LocalizationProvider>
      </Modal>
    </div>
  );
}

export default AddBatch;
