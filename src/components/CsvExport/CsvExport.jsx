import * as React from 'react';
import {useState, useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CSVLink } from "react-csv";
import axios from 'axios';


function CsvExport() {
  const [year, setYear] = useState(``);
  const [term, setTerm] = useState('');
  const [grade, setGrade] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [gender, setGender] = useState(``);
  const [lunch, setLunch] = useState('');
  const [csvObj, setCsvObj] = useState([]);

  const handleYear = (event) => {
    setYear(event.target.value);
  }

  const handleTerm = (event) => {
    setTerm(event.target.value);
  }

  const handleGrade = (event) => {
    setGrade(event.target.value);
  }

  const handleEthnicity = (event) => {
    setEthnicity(event.target.value);
  }

  const handleGender = (event) => {
    setGender(event.target.value);
  }

  const handleLunch = (event) => {
    setLunch(event.target.value);
  }


  useEffect(() => {
    fetchCsvDataObj();
  }, []);

  const fetchCsvDataObj = () => {
    axios.get('/api/studentCsv')
      .then((response) => {
        console.log('GET response.data is', response.data)
        setCsvObj(response.data)
      }).catch((err) => {
        console.log('GET error is', err)
      })
  }

  return (
    <Box pt={15}
      sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center"
          }}>
      <Stack sx={{width: "25%"}}
        spacing={2}
        direction="column">
        <FormControl>
          <InputLabel id="select-helper-label">Year</InputLabel>
          <Select labelId="select-helper-label" id="select-helper-label"
            value={year}
            label="year"
            onChange={handleYear}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-helper-label">Term</InputLabel>
          <Select labelId="select-helper-label" id="select-helper-label"
            value={term}
            label="term"
            onChange={handleTerm}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-helper-label">Grade</InputLabel>
          <Select labelId="select-helper-label" id="select-helper-label"
            value={grade}
            label="grade"
            onChange={handleGrade}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-helper-label">Ethnicity</InputLabel>
          <Select labelId="select-helper-label" id="select-helper-label"
            value={ethnicity}
            label="ethnicity"
            onChange={handleEthnicity}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={6}>Hispanic</MenuItem>
            <MenuItem value={7}>Asian</MenuItem>
            <MenuItem value={8}>Caucasian</MenuItem>
            <MenuItem value={9}>Black</MenuItem>
            <MenuItem value={10}>Mixed</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-helper-label">Gender</InputLabel>
          <Select labelId="select-helper-label" id="select-helper-label"
            value={gender}
            label="gender"
            onChange={handleGender}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Female</MenuItem>
            <MenuItem value={2}>Male</MenuItem>
            <MenuItem value={3}>Non-Binary</MenuItem>
            <MenuItem value={4}>Not Listed</MenuItem>
            <MenuItem value={5}>Prefer Not To Say</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-helper-label">Lunch Status</InputLabel>
          <Select labelId="select-helper-label" id="select-helper-label"
            value={lunch}
            label="lunch status"
            onChange={handleLunch}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={2}>No</MenuItem>
          </Select>
        </FormControl>
        <CSVLink data={csvObj}>Download Data</CSVLink>
      </Stack>
    </Box>

  )

}

export default CsvExport;
