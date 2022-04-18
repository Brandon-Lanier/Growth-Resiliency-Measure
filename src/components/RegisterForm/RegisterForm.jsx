import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);

  const schoolOptions = [
    { schoolId: 1, label: "Adams High School" },
    { schoolId: 2, label: "Glenview High School" },
  ];
  const dispatch = useDispatch();

  const defaultValues = {
    studentId: 0,
    firstName: "",
    lastName: "",
    email: "",
    schoolId: 1,
    race: 1,
    graduationYear: 2025,
    eip: true,
    gender: 1,
    lunchStatus: 1,
    password:"",
    username:"",
  };

  const races = [
    { id: 1, label: "Hispanic" },
    { id: 2, label: "Asian" },
    { id: 3, label: "Caucasian" },
    { id: 4, label: "Black" },
    { id: 5, label: "Mixed" },
  ];

  const genders = [
    { id: 1, gender: "Female" },
    { id: 2, gender: "Male" },
    { id: 3, gender: "Non-Binary" },
    { id: 4, gender: "Not Listed" },
    { id: 5, gender: "Prefer not to say" },
  ];

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

  const registerUser = (event) => {
    event.preventDefault();
    setFormValues({
      ...formValues,
      username: formValues.email,
    })
    dispatch({
      type: "REGISTER",
      payload: {
        studentArray: [formValues],
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register Student User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Grid container alignItems="center" justify="center" direction="column">
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
          <TextField
            required
            id="password-input"
            name="password"
            label="Password"
            type="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </Grid>
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
            id="studentID-input"
            name="studentId"
            label="Student ID"
            type="number"
            value={formValues.studentId}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <Select
              name="school"
              value={formValues.schoolId}
              onChange={handleInputChange}
            >
              {schoolOptions.map((school) => (
                <MenuItem key={school.schoolId} value={school.schoolId}>
                  {school.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <Select
              name="gender"
              value={formValues.gender}
              onChange={handleInputChange}
            >
              {genders.map((gender) => (
                <MenuItem key={gender.id} value={gender.id}>
                  {gender.gender}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <Select
              name="race"
              value={formValues.race}
              onChange={handleInputChange}
            >
              {races.map((race) => (
                <MenuItem key={race.id} value={race.id}>
                  {race.label}
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

export default RegisterForm;

{
  /* <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form> */
}
