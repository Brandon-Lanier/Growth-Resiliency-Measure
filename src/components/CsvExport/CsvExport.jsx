import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function CsvExport() {
  const [year, setYear] = useState('');
  const [term, setTerm] = useState('');
  const [grade, setGrade] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [gender, setGender] = useState('');

  const handleYear = (event) => {
    setYear(event.target.value);
  }

  const handleTerm = (event) => {
    setTerm(event.target.value);
  }

  const handleGrade = (event) => {
    setGrade(event.target.value);
  }



  return(
    <div>
      <FormControl >
        <InputLabel id="select-helper-label">Year</InputLabel>
        <Select
        labelId="select-helper-label"
        id="select-helper-label"
        value={year}
        label="year"
        onChange={handleYear}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
        </Select>
        <FormHelperText>Year</FormHelperText>
      </FormControl>
    
      <FormControl >
        <InputLabel id="select-helper-label">Term</InputLabel>
        <Select
        labelId="select-helper-label"
        id="select-helper-label"
        value={term}
        label="term"
        onChange={handleTerm}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
        </Select>
        <FormHelperText>Term</FormHelperText>
      </FormControl>
      <FormControl >
        <InputLabel id="select-helper-label">Grade</InputLabel>
        <Select
        labelId="select-helper-label"
        id="select-helper-label"
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
        <FormHelperText>Grade</FormHelperText>
      </FormControl>
    </div>

  )
 
}

export default CsvExport;