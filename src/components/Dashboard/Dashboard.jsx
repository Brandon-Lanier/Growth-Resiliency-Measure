import { CardHeader, Container, Divider } from "@mui/material";
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
import StudentImg from "./students.png";

function Dashboard() {
  const students = useSelector((store) => store.studentReducer.studentReducer);
  const batch = useSelector((store) => store.adminBatch.activeAdminBatch);
  const schools = useSelector((store) => store.schools);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "SET_DASHBOARD_PATH" });
    dispatch({ type: "GET_STUDENTS" });
    dispatch({ type: "FETCH_ADMIN_ACTIVE_BATCH" });
    dispatch({ type: "FETCH_ADMIN_BATCH" });
    dispatch({ type: "FETCH_ALL_SCHOOLS" }); // get list of all schools
  }, []);

  let batchComplete = () => {
    let percent = (batch.length / students.length) * 100;
    console.log(percent);
    return percent.toFixed(2);
  };

  console.log("schools", schools);
  return (
    <Container sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Card elevation={4} sx={{height: '100px'}}>
            <CardHeader sx={{ backgroundColor: "#d7f5db", p: 1 }}
            title={"Total Students:"}
            titleTypographyProps={{ variant: 'b1' }}
            />
            <CardActionArea onClick={() => history.push("/students")}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {students ? students?.length : 0}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={7}>
          <Card elevation={4} sx={{height: '100px'}}>
            <CardActionArea onClick={() => history.push("/assessmentoverview")}>
            <CardHeader sx={{ backgroundColor: "#d7f5db", p: 1 }}
            title={"Active Assessments:"}
            titleTypographyProps={{ variant: 'b1' }}
            />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {batchComplete()}% Completed.
                </Typography>
                <Box sx={{ width: "100%" }}>
                  <LinearProgress
                    variant="determinate"
                    value={batchComplete()}
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Divider />
          <AdminDashData />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
