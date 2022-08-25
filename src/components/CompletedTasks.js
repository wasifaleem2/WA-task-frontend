import "../App.css";
import theme from "../Theme";
import { ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  CardContent,
  CardActions,
  Typography,
  Button,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PendingTasks(props) {
  const [userEmail, setUserEmail] = useState(
    props.userData.User.userData.email
  );
  const [alertShow, setAlertShow] = useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [alert, setAlert] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  console.log("completed", props.userData.User.userData.email);
  const DeleteTask = (id) => {
    fetch(`https://watasks.herokuapp.com/api/deletetask/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn("delete response", resp);
        setCompletedTasks(
          completedTasks.filter((val) => {
            return val._id != id;
          })
        );
        setAlert(resp.status);
        setAlertMsg(resp.msg);
        setOpenSnack(true)
      });
    });
  };

  useEffect(() => {
    fetch(`https://watasks.herokuapp.com/api/getcompletedtasks/${userEmail}`, {
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
        setCompletedTasks(resp.allTasks.sort().reverse());
        // setAlert(resp.status);
        // setAlertMsg(resp.msg);
      });
    });
  }, [props]);

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={openSnack}
        autoHideDuration={4000}
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
      </Snackbar>{" "}
      <div className="margin-top">
        <Container>
          <Typography
            variant="h5"
            color={theme.palette.light.main}
            sx={{ textAlign: "left" }}
          >
            Tasks Completed
          </Typography>
          <Grid container direction="row">
            {completedTasks.map((result, key) => (
              <Grid key={key} item xs={12} md={4}>
                <Card
                  sx={{
                    margin: 1,
                    textAlign: "left",
                    backgroundColor: `${theme.palette.light.primary}`,
                  }}
                >
                  <CardContent>
                    <Typography variant="h4" color={theme.palette.light.main}>
                      {result.title}
                    </Typography>
                    <Typography color={theme.palette.light.secondary}>
                      Description:{" "}
                      <span
                        style={{ color: `${theme.palette.light.secondary}` }}
                      >
                        {result.description}
                      </span>
                    </Typography>
                    <Typography color={theme.palette.light.danger}>
                      Completed At
                    </Typography>
                    <Typography
                      style={{
                        display: "inline-block",
                        marginRight: "20px",
                      }}
                      color={theme.palette.light.secondary}
                    >
                      Date:{" "}
                      <span
                        style={{ color: `${theme.palette.light.secondary}` }}
                      >
                        {result.date}
                      </span>
                    </Typography>
                    <Typography
                      style={{ display: "inline-block" }}
                      color={theme.palette.light.secondary}
                    >
                      Time:{" "}
                      <span
                        style={{ color: `${theme.palette.light.secondary}` }}
                      >
                        {result.time}
                      </span>
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "right" }}>
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        backgroundColor: `${theme.palette.light.danger}`,
                      }}
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
        </Container>
      </div>
    </ThemeProvider>
  );
}
