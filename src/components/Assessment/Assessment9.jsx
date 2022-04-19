import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Slide } from "@mui/material";
import ProgressBar from "./ProgressBar";
import "./Assessment.css";

function Assessment9({questions , index, setIndex , handleChange, value, setValue}) {

  const history = useHistory();
  const dispatch = useDispatch();
  

  const handleNext = () => {
    if(value == ''){
      alert('MUST ANSWER QUESTION');
      return;
    }
    setValue('');
    setIndex(index + 1);
}

const handleBack = () => {
    setIndex(index -1);
}

  return (
    <Slide direction="left" in="open" mountOnEnter unmountOnExit>
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        mt: 10
      }}
    >
      <div className="question-container">
      <Typography variant="h5" className="question-text">
              {questions[index].name}
            </Typography>
        <TextField
          id="qualitative"
          label="Let Us Know"
          multiline
          rows={4}
          value={value}
          onChange={handleChange}
          inputProps={{ maxLength: 255 }}
          sx={{mt: 3}}
        />
        </div>
      <div className="assess-buttons-container">
        <Button variant="outlined" sx={{m: 2}} className="assess-buttons" onClick={handleBack}>Back</Button>
        <Button variant="contained" sx={{m: 2}} className="assess-buttons" onClick={handleNext}>Next</Button>
        </div>
    </Container>
    </Slide>
  );
}

export default Assessment9;