import "../App.css";
import theme from "../Theme";
import { ThemeProvider } from "@mui/material/styles";
import { Redirect } from "react-router-dom";
import CreateTask from "../containers/CreateTaskContainer";
import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Snackbar,
  Alert,
  TextField,
  Modal,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function PendingTasks(props) {
  const [userEmail, setUserEmail] = useState(
    props.userData.User.userData.email
  );
  
  const [pendingTasks, setPendingTasks] = useState([]);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  console.log("pending props", props);
  const TaskDone = (id) => {
    console.log(id);
    fetch(`http://localhost:3001/api/completed/${id}`, {
      method: "PUT",
      // headers: {},
      // body: {},
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        setPendingTasks(
          pendingTasks.filter((val) => {
            return val._id != id;
          })
        );
        setAlert(resp.status)
        setAlertMsg(resp.msg)
        setOpenSnack(true)
        console.log(props.load)
      });
    });
  };
  // const Update = (id) => {
  //   const formData = new FormData();
  //   formData.append("date", date);
  //   formData.append("date", time);
  //   fetch(`http://localhost:3001/api/update/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       // 'Authorization': 'Bearer' + {token},
  //       Accept: "application/json",
  //       // "Content-Type": "application/json",
  //     },
  //     body: formData,
  //   }).then((result) => {
  //     result.json().then((resp) => {
  //       console.log(resp);
  //       setPendingTasks(
  //         pendingTasks.filter((val) => {
  //           return val._id != id;
  //         })
  //       );
  //     });
  //   });
  // };

  const DeleteTask = (id) => {
    fetch(`http://localhost:3001/api/deletetask/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn("delete response", resp);
        setPendingTasks(
          pendingTasks.filter((val) => {
            return val._id != id;
          })
        );
        setAlert(resp.status)
        setAlertMsg(resp.msg)
        setOpenSnack(true)
      });
    });
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/getpendingtasks/${userEmail}`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {
        console.warn("all tasks", resp.allTasks[0].title);
        //.sort().reverse() descendeing order
        setPendingTasks(resp.allTasks.sort().reverse());
        setAlert(resp.status)
        setAlertMsg(resp.msg);
        
      });
    });
  }, [props.load]);
  //()=>pull_data

  return (
    <ThemeProvider theme={theme}>
      <div>
      <Snackbar open={openSnack} autoHideDuration={4000} onClose={()=>setOpenSnack(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={()=>setOpenSnack(false)} severity={`${alert}`} sx={{ width: '90%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
        {/* <CreateTask reload="false" /> */}
        <div className="margin-top">
          <div className="center">
            <Container>
              <Typography
                variant="h5"
                color={theme.palette.light.danger}
                sx={{ textAlign: "left" }}
              >
                Tasks Pending
              </Typography>
              <Grid container direction="row">
                {pendingTasks.map((result, key) => (
                  <Grid key={key} item xs={12} md={4}>
                    <Card
                      sx={{
                        margin: 1,
                        textAlign: "left",
                        backgroundColor: `${theme.palette.light.primary}`,
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" color={theme.palette.light.main}>
                            {result.title}
                        </Typography>
                        <Typography
                          style={{
                            display: "inline-block",
                            marginRight: "20px",
                          }}
                          color={theme.palette.light.secondary}
                        >
                          Time:{" "}
                          <span
                            style={{ color: `${theme.palette.light.secondary}` }}
                          >
                            {result.date}
                          </span>
                        </Typography>
                        <Typography style={{ display: "inline-block" }} color={theme.palette.light.secondary}>
                          Date:{" "}
                          <span
                            style={{ color: `${theme.palette.light.secondary}` }}
                          >
                            {result.time}
                          </span>
                        </Typography>
                        <Typography color={theme.palette.light.secondary}>
                          Description:{" "}
                          <span
                            style={{ color: `${theme.palette.light.secondary}` }}
                          >
                            {result.description}
                          </span>
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "right" }}>
                        <Button
                          variant="contained"
                          size="small"
                          style={{ backgroundColor: `${theme.palette.light.main}` }}
                          onClick={() => {
                            TaskDone(result._id);
                          }}
                        >
                          <DoneIcon />
                        </Button>
                        {/* <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={handleChange}
                    >
                      <EditIcon />
                    </Button> */}
                        <Button
                          variant="contained"
                          size="small"
                          style={{ backgroundColor: `${theme.palette.light.danger}` }}
                          onClick={() => {
                            DeleteTask(result._id);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {/* Mu Modal */}
              {/* <Modal
            open={open}
            onClose={handleChange}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="div-main">
              <div className="div-center">
                <Box>
                  <label>Update Date</label>
                  <input className="input" placeholder={"newTime"} type="date" />
                  <br/>
                  <label>Update Time</label>
                  <input className="input" placeholder={"new Date"} type="time"/>
                  <br/>
                  <div style={{ float: "right", spacing:"10" }}>
                  <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={() => {
                        Update(PendingTasks._id);
                      }}
                    >
                      <DoneIcon />
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={handleChange}
                    >
                      <CancelIcon />
                    </Button>
                  </div>
                </Box>
              </div>
            </div>
          </Modal> */}
            </Container>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
