import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import './StudentHomePage.css';

export default function StudentHomepage() {
  const student = useSelector((store) => store.studentReducer.studentDetailsReducer[0]);
  const history = useHistory();
  const dispatch = useDispatch();
  const questions = useSelector((store) => store.questions);
  const batch = useSelector((store) => store.batch);

  useEffect(() => {
    dispatch({ type: "FETCH_BATCH" });
    dispatch({ type: "GET_STUDENT_DETAILS"})
  }, []);

  // if assessment is available for student, push to assessment page
  // otherwise stay on this page showing no assessments available
  // if(batch) {
  //     history.push('/assessment')
  // }

  return (
    <>
    <div className="welcome-message">
    <h2>Welcome, {student?.firstName}!</h2>
    </div>
    <div className="batch-not-available">
      <h3>{!batch && 'No assessments available'}</h3>
      </div>
      {batch && (
          <Box
          sx={{
              pt: 10,
              pl: 10,
          }}>

        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 1,
            p: 5,
            
        }}>
          <h1>Assessment Available</h1>
          <Button onClick={() => history.push("/assessment")}>
            Take it here!
          </Button>
        </Box>
      </Box>
      )}
    </>
  );
}
