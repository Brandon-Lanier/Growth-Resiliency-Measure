import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AddAdminForm from './AddAdminForm';


export default function FormDialog({schools, get}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    get();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add School Administrator
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Adminstrator</DialogTitle>
        <DialogContent>
        <AddAdminForm schools={schools} handleClose={handleClose}/> 
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
