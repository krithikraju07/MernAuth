import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

export const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [value, setvalue] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setvalue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // console.log(e.target.name, "value", e.target.value);
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/login", {
        email: value.email,
        password: value.password,
      })
      .catch((err) => {
        console.log(err);
      });
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(value);
    //http requests
    sendRequest()
      .then(() => dispatch(authActions.login()))
      .then(() => {
        history("/user");
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
    >
      <form onSubmit={handleSubmit}>
        <Box
          boxShadow={3}
          p={3}
          borderRadius={4}
          width={300}
          textAlign="center"
        >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={value.email}
            onChange={handleInputChange}
            name="email"
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={value.password}
            onChange={handleInputChange}
            name="password"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px" }}
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default Login;
