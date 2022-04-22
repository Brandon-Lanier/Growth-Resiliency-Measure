import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Slide } from "@mui/material";
import { Button, Container, Typography, Box } from "@mui/material";
import { useHistory } from "react-router-dom";



function Confirmation() {
  const history = useHistory();
  const dispatch = useDispatch();
  const scores = useSelector((store) => store.scores);

const clickHandler = () => {
  history.push("/home");
  dispatch({ type: "LOGOUT" })
}

  useEffect(() => {
    dispatch({ type: "FETCH_STUDENT_SCORES" });
  }, []);

  return (
    <Slide direction="left" in="open" mountOnEnter unmountOnExit>
    <div className="result-container">
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 10,
        
      }}>

      <Typography variant="h5">Assessment Complete!</Typography>
      <Button variant="contained" sx={{m:10}} onClick={clickHandler} >Logout</Button>
      </Box>
      {/* {scores?.map((def, index) => {
          return (
        <div key={index}>
          <p>{def?.measure}</p>
          <p>{Number(def?.avgScore).toFixed(2)}</p>
        </div>
          )
      })} */}
    </div>
    </Slide>
  );
}

export default Confirmation;
