import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AdminDashData from "../AdminDashData/AdminDashData";
import { CardActionArea } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

function Dashboard() {

  
  const students = useSelector((store) => store.studentReducer);
  const batch = useSelector((store) => store.adminBatch);


  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_STUDENTS" });
    dispatch({type: "FETCH_ADMIN_ACTIVE_BATCH"})
  }, []);

  let batchComplete = () => {
    let percent = (batch.length / students.length) * 100;
    return percent
  }

  return (
    <Container sx={{ flexGrow: 1, mt: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card elevation={4}>
            <CardActionArea onClick={() => history.push("/students")}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Total Students:
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {students ? students?.length : 0}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card elevation={4}>
            <CardActionArea onClick={() => history.push("/assessments")}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Active Assessments
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {batchComplete()}%
                </Typography>
                <Box sx={{ width: "100%" }}>
                <LinearProgress variant="determinate" value={batchComplete()} />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <AdminDashData />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
