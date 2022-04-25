import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import axios from "axios";
import { Box } from "@mui/material";

export default function Form({ schools, handleClose, admins }) {
  const history = useHistory();

  const schoolOptions = [];

  for (let school of schools) {
    schoolOptions.push({ label: school.name, value: school.id });
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

    // Checks if username is already taken. THis prevents admins from covering multiple schools at this point.
    if (admins.filter((admin) => admin.email === formValues.email).length > 0) {
      console.log("MATCHING ADMIN USERNAME!!!");
      alert("Username already taken!");
      return;
    }

    console.log(formValues);
    axios
      .post("/api/admincsv", formValues)
      .then((response) => {
        console.log("success");
        handleClose();
      })
      .catch((err) => {
        console.log("error on post", err);
        handleClose();
      });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 5, gap: 2, borderRadius: 10 }}>
      <TextField
        required
        id="first-name-input"
        name="firstName"
        label="First Name"
        autoComplete="off"
        type="text"
        value={formValues.firstName}
        onChange={handleInputChange}
      />

      <TextField
        required
        id="last-name-input"
        name="lastName"
        label="Last Name"
        type="text"
        autoComplete="off"
        value={formValues.lastName}
        onChange={handleInputChange}
      />

      <TextField
        required
        id="email-input"
        name="email"
        label="Email"
        type="text"
        autoComplete="off"
        value={formValues.email}
        onChange={handleInputChange}
      />

      <FormControl>
            <InputLabel id="schoolLabel">School</InputLabel>
        <Select
          labelId="schoolLabel"
          name="school"
          value={formValues.school}
          onChange={handleInputChange}
          label="School"
        >
          {schoolOptions.map((school) => (
            <MenuItem key={school.value} value={school.value}>
              {school.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="outlined" onClick={handleClose}>
        Cancel
      </Button>
    </Box>
  );
}
//   export default Form;
