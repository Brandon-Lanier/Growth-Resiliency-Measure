import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function Schools( { fetchAdministrators}) {
  const store = useSelector((store) => store);
  const [schoolName, setSchoolName] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "SET_SCHOOL_PATH" });
  }, []);

  //confirmation modal functions
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setConfirm(false);
    fetchAdministrators();
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = () => {
    axios
      .post("/api/schools", { name: schoolName })
      .then((response) => {
        console.log("Post response.data is", response.data);
        
      })
      .catch((err) => {
        console.log("Post error is", err);
      });
    //open confirmation modal
    setConfirm(true);
    
    setTimeout(handleClose, 1000);
    
  };

  return (
    <div>
      {/* <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <h1>Add School</h1>
      </Box> */}
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add New School
      </Button>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            fullWidth
            label="School Name"
            id="school-name"
            size="normal"
            sx={{ p: 1 }}
            onChange={(event) => setSchoolName(event.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
      <Modal
        open={confirm}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <DoneIcon color="primary" sx={{ mr: 4, fontSize: 30 }} />
            New School Added
          </Typography>
        </Box>
      </Modal>
      
    </div>
  );
}

export default Schools;
