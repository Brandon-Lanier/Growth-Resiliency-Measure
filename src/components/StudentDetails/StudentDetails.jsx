import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import "./StudentDetails.css";
import { Radar } from "react-chartjs-2";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import BackButton from "../BackButton/Backbutton";
import { Grid, Box, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from '@mui/material/IconButton';

function StudentDetails() {
  //pull first and last assessment date from the DB
  const testDates = useSelector((store) => store.scores.testDates);
  let firstTest = testDates[0]?.firstTestDate;
  let lastTest = testDates[0]?.lastTestDate;

  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const studentDetails = useSelector(
    (store) => store.studentReducer.studentDetailsReducer
  );
  const scores = useSelector((store) => store.scores.indScoresReducer);
  const totalTests = useSelector((store) => store.scores.testTotal);
  console.log(totalTests[0]?.count);
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  let handleEditClick = () => {
    //dispatch student info to redux store.
    dispatch({ type: "SET_EDIT_STUDENT", payload: studentDetails });
    history.push("/studentedit");
    //route to edit form
  };

  const data = {
    labels: [
      "Balance",
      "Connection",
      "Contribution",
      "Empathy",
      "Confidence",
      "Self Control",
      "Expression",
      "Adaptability",
    ],
    datasets: [
      // {
      //   label: [
      //     `${scores[0]?.year}-Assessment#${scores[0]?.assessmentBatchId}`,
      //   ],
      //   data: [
      //     scores[0]?.avgScore,
      //     scores[1]?.avgScore,
      //     scores[2]?.avgScore,
      //     scores[3]?.avgScore,
      //     scores[4]?.avgScore,
      //     scores[5]?.avgScore,
      //     scores[6]?.avgScore,
      //     scores[7]?.avgScore,
      //   ],
      //   backgroundColor: "rgba(100, 176, 88 ,0.2)",
      //   borderColor: "rgba(100, 176, 88,1)",
      //   borderWidth: 1,
      // },
      // {
      //   label: [
      //     `${scores[8]?.year}-Assessment#${scores[8]?.assessmentBatchId}`,
      //   ],
      //   data: [
      //     scores[8]?.avgScore,
      //     scores[9]?.avgScore,
      //     scores[10]?.avgScore,
      //     scores[11]?.avgScore,
      //     scores[12]?.avgScore,
      //     scores[13]?.avgScore,
      //     scores[14]?.avgScore,
      //     scores[15]?.avgScore,
      //   ],
      //   backgroundColor: "rgba(176, 86, 171, 0.2)",
      //   borderColor: "rgba(176, 86, 171, 1)",
      //   borderWidth: 1,
      // },
      {
        label: [
          `${scores[16]?.year}-Assessment#${scores[16]?.assessmentBatchId}`,
        ],
        data: [
          scores[16]?.avgScore,
          scores[17]?.avgScore,
          scores[18]?.avgScore,
          scores[19]?.avgScore,
          scores[20]?.avgScore,
          scores[21]?.avgScore,
          scores[22]?.avgScore,
          scores[23]?.avgScore,
        ],
        backgroundColor: "rgba(200,0,0,0.2)",
        borderColor: "rgba(200,0,0,1)",
        borderWidth: 1,
      },
      {
        label: [
          `${scores[24]?.year}-Assessment#${scores[24]?.assessmentBatchId}`,
        ],
        data: [
          scores[24]?.avgScore,
          scores[25]?.avgScore,
          scores[26]?.avgScore,
          scores[27]?.avgScore,
          scores[28]?.avgScore,
          scores[29]?.avgScore,
          scores[30]?.avgScore,
          scores[31]?.avgScore,
        ],
        backgroundColor: "rgba(88, 122, 176, .2)",
        borderColor: "rgba(88, 122, 176, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="component-container">
      <Grid container spacing={1}>
        {/* <Card elevation={4}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                 Hello 
                </Typography>
              </CardContent>
          </Card> */}
        <Grid item xs={5}>
          <Box xs={{ boxShadow: 2, pl: 5 }}>
            <Typography variant="h3">
              {studentDetails?.details?.firstName}
              <span> </span>
              {studentDetails?.details?.lastName}
              <span> </span>
              <IconButton onClick={handleEditClick}>
              <EditIcon />
              </IconButton>
            </Typography>
            {/* <Button variant="contained" onClick={handleEditClick}>
              Edit Student 
            </Button> */}
            <Stack spacing={2} sx={{mt: 2}}>
            <Typography variant="h6">{studentDetails?.details.name}</Typography>
            <Typography variant="b1">Class of {studentDetails?.details.graduationYear}</Typography>
            <Typography variant="b1">First assessment: {firstTest}</Typography>
            <Typography variant="b1">Most recent assessment: {lastTest}</Typography>
            <Typography variant="b1">Total assessments taken: {totalTests[0]?.count}</Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <FormControl sx={{ minWidth: 100 }} size="small">
            <InputLabel id="yearLabel">Year</InputLabel>
            <Select
              labelId="yearLabel"
              id="year"
              value={year}
              label="Year"
              onChange={(e) => setYear(e.target.value)}
            >
              <MenuItem value="all">Select All</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 100 }} size="small">
            <InputLabel id="termLabel">Term</InputLabel>
            <Select
              labelId="termLabel"
              id="term"
              value={term}
              label="Term"
              onChange={(e) => setTerm(e.target.value)}
            >
              <MenuItem value="all">Select All</MenuItem>
              <MenuItem value="fall">Fall</MenuItem>
              <MenuItem value="spring">Spring</MenuItem>
            </Select>
          </FormControl>
          </Box>
          <br></br>
          <div className="dash-filter-graph-container">
            <Radar
              data={data}
              options={{
                events: ["click"],
                scales: {
                  r: {
                    angleLines: {
                      display: true,
                    },
                    max: 5,
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default StudentDetails;
