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
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import "./Assessment.css";
import userSaga from "../../redux/sagas/user.saga";

import Question from "./question.jsx";
import Assessment9 from "./Assessment9.jsx";

function Assessment() {
  useEffect(() => {
    dispatch({ type: "FETCH_QUESTIONS" }); // get all questions from DB
    dispatch({ type: "FETCH_BATCH" }); // get batch number from DB.
  }, []);

  const history = useHistory();
  const dispatch = useDispatch();
  // const questions = useSelector((store) => store.questions);
  const assess = useSelector((store) => store.assessment);
  const [index, setIndex] = useState(0);

  const defaultValues = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
    24: 0,
    25: 0,
    26: 0,
    27: "",
  };

  // console.log(questions);
  // const [formValues, setFormValues] = useState([]);
  // let formValues = Array(27);

  const [value, setValue] = useState("");
  const [formValues, setFormValues] = useState([...Array(0)]);

  const handleChange = (e) => {
    if (index < 26) {
      const { name, value } = e.target;
      console.log(formValues);
      // console.log("name is ", name);
      console.log("value is", value);
      let tempArray = formValues;
      tempArray[index] = value;
      setFormValues(tempArray);
      setValue(value);
      console.log(formValues);
    } else {
      // This inserts the qualitative at the index of 26
      const { name, value } = e.target;
      console.log("value is", value);
      setValue(value);
      let tempArray = formValues;
      tempArray[26] = value;
      setFormValues(tempArray);
      // console.log(formValues);
    }
  };

  // ['5', '3', '3', '3', '1', '2', '1', '1', '4', '4', '5', '1', '1', '2', '4', '4', '2', '2', '2', '5', '4', '3', '3', '1', '3', '4']

  // Autofill button - does not work
  const autofill = () => {
    console.log("inside autofill");
    let randomArray = [];
    for (let i = 1; i < 27; i++) {
      console.log("inside for loop", i);
      let score = Math.floor(Math.random() * 5) + 1;
      console.log("score is", score);
      randomArray.push(String(score));
    }
    setIndex(26);
    console.log(randomArray);
    setFormValues(randomArray);
  };

  const submitReview = () => {
    console.log("inside submit,", formValues);
    // console.log('value is', value);
    // setFormValues(formValues => [...formValues,value]);
    // formValues.push(value);
    if (index === 26) {
      dispatch({
        type: "SET_ANSWERS",
        payload: formValues,
      });
      history.push("/review");
    }

    // setIndex(index + 1);
    // setValue();
  };

  // if (value1 && value2 && value3) {
  //   dispatch({
  //     type: "SET_BALANCE",
  //     payload: { 1: Number(value1), 2: Number(value2), 3: Number(value3) },
  //   });
  //   history.push("/assessment2");
  // } else {
  //   alert("Please enter a value for each statement.");
  // }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: " column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          id="progress-bar"
          sx={{
            width: "100%",
          }}
        >
          <ProgressBar progress={(index / 27) * 100} />
        </Box>

        {index > 25 ? (
          <Assessment9
            index={index}
            handleChange={handleChange}
            setIndex={setIndex}
            value={value}
            setValue={setValue}
            submitReview={submitReview}
            setFormValues={setFormValues}
            formValues={formValues}
          />
        ) : (
          <Question
            index={index}
            handleChange={handleChange}
            setIndex={setIndex}
            value={value}
            setValue={setValue}
            formValues={formValues}
          />
        )}

        <Box
          sx={{
            m: 10,
            width: 200,
            height: 200,
          }}
          onClick={() => autofill()}
        ></Box>
      </Box>
    </>
  );
}

export default Assessment;
