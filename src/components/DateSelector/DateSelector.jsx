import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./DateSelector.css";
import { Typography } from "@mui/material";

function DateSelector({ dateRange, setDateRange, dataSet, setDataSet }) {
  const marks = [
    {
      value: 2018,
      label: "2018",
    },
    {
      value: 2019,
      label: "2019",
    },
    {
      value: 2020,
      label: "2020",
    },
    {
      value: 2021,
      label: "2021",
    },
    {
      value: 2022,
      label: "2022",
    },
  ];

  const handleChange = (event, newValue) => {
    setDateRange(newValue);
  };

  const handleDataSet = (event) => {
    setDataSet(event.target.value);
  };

  return (
    <div id="timeframe-select">
        <Typography variant="h6">
            Select Time Frame
        </Typography>
      <Box sx={{ width: 400 }}>
        <Slider
          getAriaLabel={() => "Date Range"}
          value={dateRange}
          onChange={handleChange}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={2018}
          max={2022}
        />
        
      </Box>
      <Box sx={{ width: 400, display: 'flex', justifyContent: 'center' }}>
        <FormControl>
          {/* <FormLabel id="Dataset-select">Datasets</FormLabel> */}
          <RadioGroup
            row
            aria-labelledby="dataset"
            name="datasets"
            onChange={handleDataSet}
          >
            <FormControlLabel
              value="year"
              control={<Radio />}
              label="Year"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="term"
              control={<Radio />}
              label="Term"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="batch"
              control={<Radio />}
              label="Batch"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </div>
  );
}

export default DateSelector;
