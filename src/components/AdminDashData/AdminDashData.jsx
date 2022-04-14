import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./AdminDashData.css";
import { Button, Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


function AdminDashData() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_STUDENT_SCORES" });
  }, []);

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

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
        label: "All Students",
        data: [2, 4.3, 3, 4, 2, 3, 1, 3],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const [year, setYear] = useState('');
  const [term, setTerm] = useState('');
  const [grade, setGrade] = useState("");
  const [ethnicity, setEthnicity] = useState('');
  const [gender, setGender] = useState('');
  const [eip, setEip] = useState('');

  const generateReport = () => {
    console.log(year, term, grade, ethnicity, gender, eip);
  }


  return (
    <>
      <div className="dash-filter-data-container">
        {/* <Stack direction="row" spacing={4}> */}
          <FormControl sx={{minWidth: 100}} size="small">
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
          <FormControl sx={{minWidth: 100}} size="small">
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
          <FormControl sx={{minWidth: 100}} size="small">
            <InputLabel id="gradeLabel">Grade</InputLabel>
            <Select
              labelId="gradeLabel"
              id="grade"
              value={grade}
              label="Grade"
              onChange={(e) => setGrade(e.target.value)}
            >
              <MenuItem value="all">Select All</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={9}>9</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{minWidth: 100}} size="small">
            <InputLabel id="ethnicityLabel">Ethnicity</InputLabel>
            <Select
              labelId="ethnicityLabel"
              id="ethnicity"
              value={ethnicity}
              label="Ethnicity"
              onChange={(e) => setEthnicity(e.target.value)}
            >
              <MenuItem value="all">Select All</MenuItem>
              <MenuItem value="asian">Asian</MenuItem>
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="caucausian">Caucasian</MenuItem>
              <MenuItem value="hispanic">Hispanic</MenuItem>
              <MenuItem value="mixed">Mixed</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{minWidth: 100}} size="small">
            <InputLabel id="genderLabel">Gender</InputLabel>
            <Select
              labelId="ethnicityLabel"
              id="ethnicity"
              value={gender}
              label="Gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="all">Select All</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="non-binary">Non-Binary</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{minWidth: 100}} size="small">
            <InputLabel id="eip">EIP</InputLabel>
            <Select
              labelId="eip"
              id="eip"
              value={eip}
              label="EIP"
              onChange={(e) => setEip(e.target.value)}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={generateReport}>
              Generate Report
          </Button>
        {/* </Stack> */}
      </div>
      <div className="dash-graph-container">
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
      <div>
          
      </div>
    </>
  );
}

export default AdminDashData;
