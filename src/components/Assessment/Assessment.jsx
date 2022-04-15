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
import ProgressBar from "./ProgressBar";
import Slide from '@mui/material/Slide';
import "./Assessment.css";


function Assessment() {

  const history = useHistory();
  const dispatch = useDispatch();
  const questions = useSelector((store) => store.questions);
  const assess = useSelector((store) => store.assessment)

  useEffect(() => {
    dispatch({ type: "FETCH_QUESTIONS" }); // get all questions from DB
    dispatch({ type: "FETCH_BATCH" }); // get batch number form DB.
  }, []);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");


  const handleChange1 = (e) => {
    setValue1(e.target.value);
  };

  const handleChange2 = (e) => {
    setValue2(e.target.value);
  };

  const handleChange3 = (e) => {
    setValue3(e.target.value);
  };

  const handleNext = () => {
    if (value1 && value2 && value3) {
      dispatch({
        type: "SET_BALANCE",
        payload: { 1: Number(value1), 2: Number(value2), 3: Number(value3) },
      });
      history.push("/assessment2");
    } else {
      alert('Please enter a value for each statement.')
    }
  };

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
      <ProgressBar progress={0}/>
      </div>
      <div className="question-container">
        <Typography variant="b1" className="question-text">
          {questions[0]?.name}
        </Typography>
        <FormControl className="form-control">
          <RadioGroup
            row
            aria-labelledby="radio-buttons"
            name="assessment-radio-buttons"
            value={value1}
            onChange={handleChange1}
          >
            {/* <Typography variant="b2" sx={{ mr: 1, alignSelf: "center" }}>
              Disagree
            </Typography> */}
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
          </RadioGroup>
          <div className="agree-cont">
          <Typography variant="b2">Disagree</Typography>
          <Typography variant="b2">Agree</Typography>
        </div>
        </FormControl>
       
      </div>
      <div className="question-container">
        <Typography variant="b1" className="question-text">
          {questions[1]?.name}
        </Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value2}
            onChange={handleChange2}
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
          {questions[2]?.name}
        </Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value3}
            onChange={handleChange3}
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
        <Button
          variant="contained"
          className="assess-buttons"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </Container>
    </Slide>
  );
}

export default Assessment;
