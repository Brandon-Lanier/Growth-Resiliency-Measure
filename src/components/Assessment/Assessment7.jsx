import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Slide } from "@mui/material";
import ProgressBar from "./ProgressBar";
import "./Assessment.css";

function Assessment7() {

  const history = useHistory();
  const dispatch = useDispatch();
  const questions = useSelector((store) => store.questions);


  const [value20, setValue20] = useState(0);
  const [value21, setValue21] = useState(0);
  const [value22, setValue22] = useState(0);
  
  const progressValue = () => {
    let percent = 27 / assessment.length;
    return percent;
  }

  const handleChange20 = (e) => {
    setValue20(e.target.value);
  };

  const handleChange21 = (e) => {
    setValue21(e.target.value);
  };

  const handleChange22 = (e) => {
    setValue22(e.target.value);
  };


  const handleNext = () => {
    if (value20 && value21 && value22) {
      dispatch({ type: "SET_EXPRESSION", payload: {20: Number(value20), 21: Number(value21), 22: Number(value22)}});
      history.push('/assessment8')
    } else {
      alert("Please fill out all answers");
    }
  };

const handleBack = () => {
    history.goBack();
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
      <div id="progress-bar">
      <ProgressBar progress={66.66}/>
      </div>
      <div className="question-container">
        <Typography variant="b1" className="question-text">
          {questions[19]?.name}
        </Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value20}
            onChange={handleChange20}
          >
            <Typography variant="b2" sx={{ mr: 1, alignSelf: "center" }}>
              Disagree
            </Typography>
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="1"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="2"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value={3}
              control={<Radio />}
              label="3"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value={4}
              control={<Radio />}
              label="4"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value={5}
              control={<Radio />}
              label="5"
              labelPlacement="bottom"
            />
            <Typography variant="b2" sx={{ ml: 1, alignSelf: "center" }}>
              Agree
            </Typography>
          </RadioGroup>
        </FormControl>
      </div>
      <div className="question-container">
        <Typography variant="b1" className="question-text">
          {questions[20]?.name}
        </Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value21}
            onChange={handleChange21}
          >
            <Typography variant="b2" sx={{ mr: 1, alignSelf: "center" }}>
              Disagree
            </Typography>
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="1"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="2"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="3"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label="4"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="5"
              control={<Radio />}
              label="5"
              labelPlacement="bottom"
            />
            <Typography variant="b2" sx={{ ml: 1, alignSelf: "center" }}>
              Agree
            </Typography>
          </RadioGroup>
        </FormControl>
      </div>
      <div className="question-container">
        <Typography variant="b1" className="question-text">
          {questions[21]?.name}
        </Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value22}
            onChange={handleChange22}
          >
            <Typography variant="b2" sx={{ mr: 1, alignSelf: "center" }}>
              Disagree
            </Typography>
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="1"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="2"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="3"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label="4"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="5"
              control={<Radio />}
              label="5"
              labelPlacement="bottom"
            />
            <Typography variant="b2" sx={{ ml: 1, alignSelf: "center" }}>
              Agree
            </Typography>
          </RadioGroup>
        </FormControl>
      </div>
      <div className="assess-buttons-container">
        <Button variant="outlined" sx={{m: 2}} className="assess-buttons" onClick={handleBack}>Back</Button>
        <Button variant="contained" sx={{m: 2}} className="assess-buttons" onClick={handleNext}>Next</Button>
        </div>
    </Container>
    </Slide>
  );
}

export default Assessment7;