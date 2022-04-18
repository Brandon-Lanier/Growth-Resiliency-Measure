import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import './StudentDetails.css'
import { Radar } from "react-chartjs-2";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function StudentDetails(){
  const [year, setYear] = useState('');
  const [term, setTerm] = useState('');
  const history = useHistory ();
  const dispatch = useDispatch();
  const studentDetails = useSelector((store) => store.studentReducer.studentDetailsReducer);
  console.log(studentDetails.details)
  const [userId, setUserId] = useState (studentDetails.details.id)
  // const [userName, setUserName] = useState (studentDetails.details.firstName + studentDetails.details.lastName)

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  useEffect(() => {
    dispatch({ type: "FETCH_IND_SCORES",
               payload: userId
});
  }, []);

  const data = {
    labels: [
      "Balance",
      "Confidence",
      "Adaptability",
      "Connection",
      "Contribution",
      "Empathy",
      "Expression",
      "Self Control",
    ],
    datasets: [
      {
        label: year+term,
        data: [2, 4.3, 3, 4, 2, 3, 1, 3],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };


    return (
        <>  
         {/* <Card elevation={4}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                 Hello 
                </Typography>
              </CardContent>
          </Card> */}
          <div className="detailsContainer">
          <h3>{studentDetails.details.firstName}<span> </span>{studentDetails.details.lastName}</h3>
          <h3>{studentDetails.details.name}</h3>
          <h4>Class of {studentDetails.details.graduationYear}</h4>
          <FormControl sx={{minWidth: 100}} size="small">
            <InputLabel id="yearLabel">Year</InputLabel>
            <Select
              labelId="yearLabel"
              id="year"
              value={year}
              label="Year"
              onChange={(e) => setYear(e.target.value)}>
              <MenuItem value="all">Select All</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{minWidth: 100}} size="small">
            <InputLabel id="termLabel">Term</InputLabel>
            <Select
              labelId="termLabel"
              id="term"
              value={term}
              label="Term"
              onChange={(e) => setTerm(e.target.value)}>
              <MenuItem value="all">Select All</MenuItem>
              <MenuItem value="fall">Fall</MenuItem>
              <MenuItem value="spring">Spring</MenuItem>
            </Select>
          </FormControl>
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
        </div>
    </>
    )
}

export default StudentDetails;