import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import "./LoginForm.css";
import { Button, Stack, Typography } from "@mui/material";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <div className="loginForm">
      <Stack spacing={3}>
      <Typography variant="h5">Login</Typography>
      <Box>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <TextField
          id="email"
          label="Email Address"
          value={username}
          fullWidth
          utoComplete="off"
          auto
          onChange={(event) => setUsername(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          sx={{mt: 2}}
          id="password"
          label="Password"
          type="password"
          fullWidth
          utoComplete="off"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <VisibilityOff />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Box>
      <Button variant="contained" onClick={login}>
        Login
      </Button>
      </Stack>
    </div>
  );
}

export default LoginForm;
