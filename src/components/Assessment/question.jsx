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


function Question({questions , index, setIndex , handleChange, value, setValue}) {

    
    
   
    
    const handleNext = () => {
        if(value == ''){
          alert('MUST ANSWER QUESTION');
          return;
        }
        setValue('');
        setIndex(index + 1);
    }

    const handleBack = () => {
        setIndex(index - 1);
        setValue('');
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
            <FormControl className="form-control">
              <RadioGroup
                row
                aria-labelledby="radio-buttons"
                
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
                  name={questions[index].id}
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="2"
                  labelPlacement="bottom"
                  name={questions[index].id}
                />
                <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label="3"
                  labelPlacement="bottom"
                  name={questions[index].id}
                />
                <FormControlLabel
                  value={4}
                  control={<Radio />}
                  label="4"
                  labelPlacement="bottom"
                  name={questions[index].id}
                />
                <FormControlLabel
                  value={5}
                  control={<Radio />}
                  label="5"
                  labelPlacement="bottom"
                  name={questions[index].id}
                />
              </RadioGroup>
              <div className="agree-cont">
              <Typography variant="b2">Disagree</Typography>
              <Typography variant="b2">Agree</Typography>
            </div>
          <div className="assess-buttons-container">
            <Button
              variant="contained"
              className="assess-buttons"
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              className="assess-buttons"
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
            </FormControl>
           
          </div>
          
        </Container>
        </Slide>
      );
    }
    
    export default Question;