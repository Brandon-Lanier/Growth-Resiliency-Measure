import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Flower from "./flower.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./StudentHomePage.css";
import { Typography } from "@mui/material";

export default function StudentHomepage() {
  const student = useSelector(
    (store) => store.studentReducer.studentDetailsReducer[0]
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const questions = useSelector((store) => store.questions);
  const batch = useSelector((store) => store.batch);

  useEffect(() => {
    dispatch({ type: "FETCH_BATCH" });
    dispatch({ type: "GET_STUDENT_DETAILS" });
  }, []);

  // if assessment is available for student, push to assessment page
  // otherwise stay on this page showing no assessments available
  // if(batch) {
  //     history.push('/assessment')
  // }

  return (
    <div className="student-landing">
      <Typography variant="h4">Welcome, {student?.firstName}!</Typography>
      {!batch === "none" ? (
        <Box>
          <Typography variant="b1">No Assessment Available</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 2,
            backgroundColor: '#d7f5db',
            p: 2,
            m: 2,
            width: "85%",
            borderRadius: 3
          }}
        >
          <Typography variant="h6" sx={{mb: 3}}>Assessment Available</Typography>
          <Button
            onClick={() => history.push("/assessment")}
            variant="contained"
          >
            Begin Assessment!
          </Button>
        </Box>
      )}
        <img src={Flower} alt="flower" id="flower" className="rotate" />
    </div>
  );
}
