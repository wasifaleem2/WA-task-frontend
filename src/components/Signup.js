import "../App.css";
import React, { useState } from "react";
import theme from "../Theme";
import { ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button, TextField, Snackbar, Alert } from "@mui/material";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [openSnack, setOpenSnack] = React.useState(false);
  const [alert, setAlert] = useState("success");
  const [alertMsg, setAlertMsg] = useState();

  const Register = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("userEmail", userEmail);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    fetch(`https://watasks.herokuapp.com/api/register`, {
      method: "POST",
      headers: {
        // 'Authorization': 'Bearer' + {token},
        Accept: "multipart/form-data",
        // "Content-Type": "application/json",
      },
      body: formData,
    }).then((result) => {
      console.warn("result", result);
      result.json().then((resp) => {
        console.warn("response", resp);
        setAlert(resp.status);
        setAlertMsg(resp.msg);
        setOpenSnack(true);
        // if(resp.status == "success"){
        //   navigate("/");
        // }
      });
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className="div-main"
        style={{ backgroundColor: `${theme.palette.light.main}` }}
      >
        <Snackbar
          style={{ marginTop: "50px" }}
          open={openSnack}
          autoHideDuration={6000}
          onClose={() => setOpenSnack(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnack(false)}
            severity={`${alert}`}
            sx={{ width: "90%" }}
          >
            {alertMsg}
          </Alert>
        </Snackbar>
        <div className="div-center">
          <div className="credentials">
            <Typography variant="h4" color={theme.palette.light.main}>
              Signup
            </Typography>
            <TextField
              className="sign-input"
              color="success"
              variant="filled"
              label="Enter Name"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              className="sign-input"
              color="success"
              variant="filled"
              label="Enter Email"
              type="text"
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
            <TextField
              className="sign-input"
              color="success"
              variant="filled"
              label="Enter Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <TextField
              className="sign-input"
              color="success"
              variant="filled"
              label="Enter Password"
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />

            <Button
              variant="contained"
              style={{
                width: "75%",
                marginTop: "20px",
                backgroundColor: `${theme.palette.light.main}`,
              }}
              onClick={Register}
            >
              Signup
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
