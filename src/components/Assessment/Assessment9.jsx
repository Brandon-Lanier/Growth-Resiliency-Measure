import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import "./Assessment.css";

function Assessment9() {

  const history = useHistory();
  const dispatch = useDispatch();
  const questions = useSelector((store) => store.questions);



  const [value27, setValue27] = useState('');
  

  const handleChange27 = (e) => {
    setValue27(e.target.value);
  };

  const handleNext = () => {
      dispatch({ type: "SET_QUALITATIVE", payload: value27});
      history.push('/review');
  };

const handleBack = () => {
    history.goBack();
}

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="question-container">
        <Typography variant="b1" className="question-text">
          {questions[26]?.name}
        </Typography>
        <TextField
          id="qualitative"
          label="Let Us Know"
          multiline
          rows={4}
          value={value27}
          onChange={handleChange27}
          inputProps={{ maxLength: 255 }}
          sx={{mt: 3}}
        />
        </div>
      <div className="assess-buttons-container">
        <Button variant="outlined" sx={{m: 2}} className="assess-buttons" onClick={handleBack}>Back</Button>
        <Button variant="contained" sx={{m: 2}} className="assess-buttons" onClick={handleNext}>Next</Button>
        </div>
    </Container>
  );
}

export default Assessment9;