import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function CsvExport() {
  const [year, setYear] = useState('');
  const [term, setTerm] = useState('');
  const [grade, setGrade] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [gender, setGender] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
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
        onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
        </Select>
        
      </FormControl>
    </div>
  )
 
}

export default CsvExport;