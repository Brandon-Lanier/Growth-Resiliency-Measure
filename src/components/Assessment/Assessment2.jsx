import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Slide, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ProgressBar from "./ProgressBar";
import "./Assessment.css";

function Assessment2() {

  const history = useHistory();
  const dispatch = useDispatch();
  const questions = useSelector((store) => store.questions);


  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);


  const handleChange4 = (e) => {
    setValue4(e.target.value);
  };

  const handleChange5 = (e) => {
    setValue5(e.target.value);
  };

  const progressValue = () => {
    let percent = 27 / assessment.length
    return percent;
  }

  const handleNext = () => {
    if (value4 && value5) {
      dispatch({ type: "SET_CONFIDENCE", payload: {4: Number(value4), 5: Number(value5)}});
      history.push('/assessment3')
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
      <ProgressBar progress={11.11}/>
      </div>
      <div className="question-container">
        <Typography variant="b1" className="question-text">
          {questions[3]?.name}
        </Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value4}
            onChange={handleChange4}
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
          {questions[4]?.name}
        </Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value5}
            onChange={handleChange5}
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

export default Assessment2;

