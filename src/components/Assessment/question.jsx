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
import userSaga from "../../redux/sagas/user.saga";


function Question({questions , index, setIndex , handleChange}) {

    const [value, setValue] = useState();
    
    const handleNext = () => {
        setIndex(index + 1);
        setValue();
    }

    const handleBack = () => {
        setIndex(index - 1);
        setValue();
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
            <Typography variant="b1" className="question-text">
              {questions[index].name}
            </Typography>
            <FormControl className="form-control">
              <RadioGroup
                row
                aria-labelledby="radio-buttons"
                name={questions[index].id}
                value={value}
                onChange={handleChange}
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
    
    export default Question;