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
import Slide from "@mui/material/Slide";
import "./Assessment.css";
import userSaga from "../../redux/sagas/user.saga";

import Question from "./question.jsx";
import Assessment9 from "./Assessment9.jsx";

function Assessment() {
  const history = useHistory();
  const dispatch = useDispatch();
  const questions = useSelector((store) => store.questions);
  const assess = useSelector((store) => store.assessment);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch({ type: "FETCH_QUESTIONS" }); // get all questions from DB
    dispatch({ type: "FETCH_BATCH" }); // get batch number from DB.
  }, []);

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

  const [formValues, setFormValues] = useState(defaultValues);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name is ", name);
    console.log("value is", value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setValue(value);
  };

  const autofill = () => {
    console.log("inside autofill");
    for (let i = 1; i < 28; i++) {
      setFormValues({
        ...formValues,
        [i]: (Math.floor(Math.random() * 5) + 1),
      });
    }
    setIndex(26);
    console.log(formValues);
  };

  const submitReview = () => {
    if (index === 26) {
      dispatch({
        type: "SET_ANSWERS",
        payload: formValues,
      });
    }

    setIndex(index + 1);
    setValue();
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
      <div id="progress-bar">
        <ProgressBar progress={0} />
      </div>

      {(questions.length > 0 && questions.length < 26)& (
        <Question
          questions={questions}
          index={index}
          handleChange={handleChange}
          setIndex={setIndex}
          value={value}
          setValue={setValue}
        />
      )}

      {index == 26 && (
        <Assessment9
          questions={questions}
          index={index}
          handleChange={handleChange}
          setIndex={setIndex}
          value={value}
          setValue={setValue}
          submitReview={submitReview}
        />
      )}

      <Button onClick={() => autofill()}>AUTOFILL</Button>
    </>
  );
}

export default Assessment;
