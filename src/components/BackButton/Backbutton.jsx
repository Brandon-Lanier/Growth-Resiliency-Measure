import { useHistory } from "react-router-dom";
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function BackButton({history}) {


  return (
    <div className="arrow-back">
      <IconButton onClick={() => history.goBack()}>
        <ArrowBackIosNewIcon />
      </IconButton>
    </div>
  );
}


export default BackButton;
