import "../App.css";
import React, { useState } from "react";
import theme from "../Theme";
import { ThemeProvider } from "@mui/material/styles";
import { Typography, Button, TextField, Alert, Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { orange } from "@mui/material/colors";

// const useStyles = makeStyles(theme => ({
//   textField:{
//     border: "1px solid orange"
//   }
// }))

export default function Signin(props) {
  // const classes = useStyles();
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("wasifaleem@gmail.com");
  const [password, setPassword] = useState();
  const [openSnack, setOpenSnack] = React.useState(false);
  const [alert, setAlert] = useState("success");
  const [alertMsg, setAlertMsg] = useState();

  const Login = async () => {
    const formData = new FormData();
    formData.append("userEmail", userEmail);
    formData.append("password", password);

    fetch(`https://watasks.herokuapp.com/api/login`, {
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
        
        if (resp.status == "success") {
          props.userDataHandler({
            name: resp.name,
            email: resp.email,
            token: resp.token,
          });
          localStorage.setItem('userinfo', JSON.stringify(props.userDataHandler));
          navigate("/");
        }
        else{
          setAlert(resp.status)
          setAlertMsg(resp.msg)
          setOpenSnack(true)
        }
      });
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <div
        className="div-main"
        style={{ backgroundColor: `${theme.palette.light.main}` }}
      >
        <Snackbar style={{marginTop:"50px"}} open={openSnack} autoHideDuration={6000} onClose={()=>setOpenSnack(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={()=>setOpenSnack(false)} severity={`${alert}`} sx={{ width: '90%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
        <div className="div-center">
          <div className="credentials">
            <Typography variant="h4" color={theme.palette.light.main}>
              {" "}
              Signin
            </Typography>
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
              label="Enter Password"
              variant="filled"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              variant="contained"
              onClick={Login}
              style={{
                width: "75%",
                marginTop: "20px",
                backgroundColor: `${theme.palette.light.main}`,
              }}
            >
              Signin
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
