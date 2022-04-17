
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Form({ schools, handleClose }) {

  const history = useHistory();

  const schoolOptions = [];

  for (let school of schools) {
    schoolOptions.push({ label: school.name, value: school.id });
    console.log("schooolOptions are", schoolOptions);
  }

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    schoolId: 1,
  };

  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("name is ", name);
    console.log("value is", value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    axios
      .post("/api/admincsv", formValues)
      .then((response) => {
        console.log("success");
        handleClose();
      })
      .catch((err) => {console.log("error on post", err);
      handleClose();});
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <TextField
            required
            id="first-name-input"
            name="firstName"
            label="First Name"
            type="text"
            value={formValues.firstName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            id="last-name-input"
            name="lastName"
            label="Last Name"
            type="text"
            value={formValues.lastName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            id="email-input"
            name="email"
            label="Email"
            type="text"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item>
          <FormControl>
            <Select
              name="school"
              value={formValues.school}
              onChange={handleInputChange}
            >
              {schoolOptions.map((school) => (
                <MenuItem key={school.value} value={school.value}>
                  {school.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
}
//   export default Form;
