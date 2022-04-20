import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar, getElementAtEvent } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./AdminDashData.css";
import { Button, Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import { Select, Typography } from "@mui/material";
import schoolsReducer from "../../redux/reducers/schools.reducer";
import DateSelector from "../DateSelector/DateSelector";

function AdminDashData() {
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  useEffect(() => {
    dispatch({ type: "FETCH_STUDENT_SCORES" });
    dispatch({ type: "FETCH_ALL_SCORES" });
    dispatch({ type: "FETCH_ALL_SCHOOLS" });
  }, []);

  const dispatch = useDispatch();

  const [dataSet, setDataSet] = useState("year");
  const [dateRange, setDateRange] = useState([2021, 2022]);
  const scores = useSelector((store) => store.scores.adminAllScores);
  const schools = useSelector((store) => store.schools);
  const report = useSelector((store) => store.report);

  const getData = () => {
    if (report != []) {
      console.log('REPORT IS', report);
      let firstDataset = report[0];
      let labels = firstDataset?.map((item) => item.measureName);


      // KELSEY WORK HERE //

      let datasetNumbers = []
      function getIndividualDataset(report) {
        for (let dataset of report) {
          let array = [];
          for (let object of dataset) {
            array.push(object.averageScore)
          }
          datasetNumbers.push(array)
        }
      }
      getIndividualDataset(report);
      console.log('DATASETNUMBERS ARE', datasetNumbers);

      let datasets = [];
      let colorPalette = ['230, 25, 75', '60, 180, 75', '255, 225, 25', '0, 130, 200', '245, 130, 48', '145, 30, 180', '70, 240, 240', '240, 50, 230', '210, 245, 60', '250, 190, 212', '0, 128, 128', '220, 190, 255', '170, 110, 40', '255, 250, 200', '128, 0, 0', '170, 255, 195', '128, 128, 0', '255, 215, 180', '0, 0, 128', '128, 128, 128']
      function returnIndividualDataset(datasets) {
        for (let i = 0; i < datasetNumbers.length; i++) {
          datasets.push({
            label: report[i][0].fiscalYear,
            data: datasetNumbers[i],
            backgroundColor: `rgba(${colorPalette[i]}, 0.2)`,
            borderColor: `rgba(${colorPalette[i]}, 1)`,
            borderWidth: 1,
          })
        }
        console.log('DATASETS ARE', datasets)
      }
      returnIndividualDataset(datasets)
      
      // KELSEY WORK ENDS //
      
      let data = {
        labels: labels,
        datasets: datasets,
      };
      return data;
    } else {
      let data = {
        labels: [],
        datasets: [
          {
            label: "No Data Available",
            data: [0],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      };
      return data;
    }
  };

  const [year, setYear] = useState(0);
  const [schoolId, setSchoolId] = useState(1);
  const [term, setTerm] = useState(0);
  const [grade, setGrade] = useState("all");
  const [ethnicity, setEthnicity] = useState("all");
  const [gender, setGender] = useState("all");
  const [eip, setEip] = useState("all");
  const [lunchStatus, setLunchStatus] = useState("all");
  const [batch, setBatch] = useState("all");

  const generateReport = () => {
    dispatch({
      type: "GENERATE_REPORT",
      payload: {
        schoolId: schoolId,
        yearStart: dateRange[0],
        yearEnd: dateRange[1],
        timeFrames: dataSet,
        grade: grade,
        ethnicity: ethnicity,
        gender: gender,
        eip: eip,
        lunchStatus: lunchStatus,
      },
    });
  };

  return (
    <>
      <div className="dash-filter-data-container">
        <DateSelector
          dateRange={dateRange}
          setDateRange={setDateRange}
          dataSet={dataSet}
          setDataSet={setDataSet}
        />
      </div>
      <div className="dash-filter-data-container">
        <Typography variant="h6">
          Filters:
        </Typography>
      </div>
      <div className="dash-filter-data-container">
        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel id="schoolLabel">School</InputLabel>
          <Select
            labelId="schoolLabel"
            id="School"
            value={schoolId}
            label="School"
            onChange={(e) => setSchoolId(e.target.value)}
          >
            {schools.map((school) => {
              return <MenuItem value={school.id}>{school.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        {/* <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel id="yearLabel">Year</InputLabel>
          <Select
            labelId="yearLabel"
            id="year"
            value={year}
            label="Year"
            onChange={(e) => setYear(e.target.value)}
          >
            <MenuItem value={0}>Year</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
          </Select>
        </FormControl> */}
        {/* <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel id="termLabel">Term</InputLabel>
          <Select
            labelId="termLabel"
            id="term"
            value={term}
            label="Term"
            onChange={(e) => setTerm(e.target.value)}
          >
            <MenuItem value={0}>Term</MenuItem>
            <MenuItem value={1}>Fall</MenuItem>
            <MenuItem value={2}>Spring</MenuItem>
          </Select>
        </FormControl> */}
        <FormControl sx={{ minWidth: 100 }} size="small">
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
        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel id="ethnicityLabel">Ethnicity</InputLabel>
          <Select
            labelId="ethnicityLabel"
            id="ethnicity"
            value={ethnicity}
            label="Ethnicity"
            onChange={(e) => setEthnicity(e.target.value)}
          >
            <MenuItem value="all">Select All</MenuItem>
            <MenuItem value={2}>Asian</MenuItem>
            <MenuItem value={4}>Black</MenuItem>
            <MenuItem value={3}>Caucasian</MenuItem>
            <MenuItem value={1}>Hispanic</MenuItem>
            <MenuItem value={5}>Mixed</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel id="genderLabel">Gender</InputLabel>
          <Select
            labelId="ethnicityLabel"
            id="ethnicity"
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="all">Select All</MenuItem>
            <MenuItem value={1}>Female</MenuItem>
            <MenuItem value={2}>Male</MenuItem>
            <MenuItem value={3}>Non-Binary</MenuItem>
            <MenuItem value={4}>Not Listed</MenuItem>
            <MenuItem value={5}>Prefer Not To Say</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel id="eip">EIP</InputLabel>
          <Select
            labelId="eip"
            id="eip"
            value={eip}
            label="EIP"
            onChange={(e) => setEip(e.target.value)}
          >
            <MenuItem value="all">Select All</MenuItem>
            <MenuItem value={false}>False</MenuItem>
            <MenuItem value={true}>True</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel id="lunchStatus">Lunch Status</InputLabel>
          <Select
            labelId="lunchStatus"
            id="lunchStatus"
            value={lunchStatus}
            label="School"
            onChange={(e) => setLunchStatus(e.target.value)}
          >
            <MenuItem value="all">Select All</MenuItem>
            <MenuItem value="na">N/A</MenuItem>
            <MenuItem value="free">Free</MenuItem>
            <MenuItem value="reduced">Reduced</MenuItem>
          </Select>
        </FormControl>
        {/* <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel id="batch">Batch</InputLabel>
          <Select
            labelId="batch"
            id="batch"
            value={batch}
            label="batch"
            onChange={(e) => setBatch(e.target.value)}
          >
            <MenuItem value="all">Select All</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
          </Select>
        </FormControl> */}
       
        {/* </Stack> */}
      </div>
      <Button variant="contained" onClick={generateReport}>
          Generate Report
        </Button>
      <div className="dash-graph-container">
        <Radar
          data={getData()}
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
    </>
  );
}

export default AdminDashData;
