import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, Button, Slide, Container } from "@mui/material";
import ProgressBar from "./ProgressBar";

import "./Assessment.css";

function Review() {
  const history = useHistory();
  const dispatch = useDispatch();
  const answers = useSelector((store) => store.assessment);
  const batch = useSelector((store) => store.batch);

  const handleSubmit = () => {
    console.log("batch is", batch);
    console.log("answers are", answers);
    dispatch({ type: "POST_SCORES", payload: [1, answers] });
    history.push("/confirmation");
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <Slide direction="left" in="open" mountOnEnter unmountOnExit>
      <Container sx={{ mt: 10 }}>
        <div className="question-container">
          <Typography variant="b1">
            Almost Done! Please hit the submit button to finish your assessment.
          </Typography>
          <div id="progress-bar">
            <ProgressBar progress={100} />
          </div>
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
      </Container>
    </Slide>
  );
}

export default Review;
