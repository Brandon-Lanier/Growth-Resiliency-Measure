import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal, Box, Stack, Typography, Button, Fade } from "@mui/material";
import "./Assessment.css";

function Review() {

  const history = useHistory();
  const dispatch = useDispatch();
  const answers = useSelector((store) => store.assessment);

  const handleSubmit = () => {
    console.log(answers);
    dispatch({ type: "POST_SCORES", payload: answers });
  };

  const handleBack = () => {
    history.goBack();
  }

  return (
    <div className="question-container">
      <Typography variant="b1">Almost Done! Please hit the submit button to finish your assessment.</Typography>
      <div className="assess-buttons-container">
        <Button
          variant="outlined"
          sx={{ m: 2 }}
          className="assess-buttons"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          sx={{ m: 2 }}
          className="assess-buttons"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Review;
