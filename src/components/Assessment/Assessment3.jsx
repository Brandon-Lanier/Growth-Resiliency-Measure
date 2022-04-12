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
import FormLabel from "@mui/material/FormLabel";
import "./Assessment.css";

function Assessment3() {

  const history = useHistory();
  const dispatch = useDispatch();
  const questions = useSelector((store) => store.questions);


  const [value6, setValue6] = useState(0);
  const [value7, setValue7] = useState(0);
  const [value8, setValue8] = useState(0);


  const handleChange6 = (e) => {
    setValue6(e.target.value);
  };

  const handleChange7 = (e) => {
    setValue7(e.target.value);
  };

  const handleChange8 = (e) => {
    setValue8(e.target.value);
  };


  const handleNext = () => {
    if (value6 && value7 && value8) {
      dispatch({ type: "SET_ADAPTABILITY", payload: {6: Number(value6), 7: Number(value7), 8: Number(value8)}});
      history.push('/assessment4')
    } else {
      alert("Please fill out all answers");
    }
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
          {questions[5]?.name}
        </Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value6}
            onChange={handleChange6}
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
          {questions[6]?.name}
        </Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value7}
            onChange={handleChange7}
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
          {questions[7]?.name}
        </Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value8}
            onChange={handleChange8}
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
  );
}

export default Assessment3;