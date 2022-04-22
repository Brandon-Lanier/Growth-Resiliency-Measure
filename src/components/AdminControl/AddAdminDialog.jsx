import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Modal, Box } from '@mui/material';
import AddAdminForm from './AddAdminForm';


export default function FormDialog({schools, get, admins}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    get();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: '#fff',
    width: '50%',
    border: "2px solid #303030",
    boxShadow: 24,
    borderRadius: 10,
    p: 5,
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add School Administrator
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>
        <AddAdminForm schools={schools} admins={admins} handleClose={handleClose}/> 
      </Box>
      </Modal>
    </div>
  );
}
