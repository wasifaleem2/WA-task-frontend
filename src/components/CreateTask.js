import "../App.css";
import theme from "../Theme";
import { ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate, Redirect } from "react-router-dom";
import PendingTasks from "../containers/PendingTasksContainer"
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Container,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Alert,
  Snackbar,
  IconButton,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.light.main,
//   }
// }));

export default function CreateTask(props) {
  // const classes = useStyles();
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(
    props.userData.User.userData.email
  );
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [alert, setAlert] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [reload, setReload] = useState(0);

  const Add = () => {
    const formData = new FormData();
    formData.append("userEmail", userEmail);
    formData.append("title", title);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("description", description);
    formData.append("isCompleted", isCompleted);
    // let newTask = { userEmail, title, date, time, description };

    fetch(`https://watasks.herokuapp.com/api/addtask`, {
      method: "POST",
      headers: {
        // 'Authorization': 'Bearer' + {token},
        Accept: "application/json",
        // "Content-Type": "application/json",
      },
      body: formData,
    }).then((result) => {
      result.json().then((resp) => {
        console.warn("response", resp);
        setAlert(resp.status);
        setAlertMsg(resp.msg);
        setOpenSnack(true)
        setReload(reload + 1)
        // if(resp.status== true){
        //   navigate("/");
        // }
        // history.replace('/');

        
      });
    });
  };
  const pull_data = (data) => {}

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({}));

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
      </Snackbar>
      <div className="margin-top">
        <Container>
          <Grid container item xs={12} md={4} direction="column">
            <Card
              sx={{
                margin: 1,
                textAlign: "left",
                backgroundColor: `${theme.palette.light.main}`,
              }}
            >
              <CardHeader
                action={
                  <ExpandMore onClick={() => setExpanded(!expanded)}>
                    <AddIcon />
                  </ExpandMore>
                }
                title={
                  <Typography variant="h6" color={theme.palette.light.primary}>
                    Add Task
                  </Typography>
                }
              />
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <div>
                    <center>
                      <input
                        type="text"
                        className="input"
                        placeholder="Task Name"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <input
                        type="date"
                        className="input"
                        placeholder="Task Date"
                        onChange={(e) => setDate(e.target.value)}
                      />
                      <input
                        type="time"
                        className="input"
                        placeholder="Task Time"
                        onChange={(e) => setTime(e.target.value)}
                      />
                      <textarea
                        rows="3"
                        className="input"
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </center>
                  </div>
                </CardContent>
                <CardActions sx={{ justifyContent: "right" }}>
                  <Button
                    variant="contained"
                    size="small"
                    style={{ backgroundColor: `${theme.palette.light.danger}` }}
                  >
                    <CancelIcon /> Cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    style={{
                      backgroundColor: `${theme.palette.light.secondary}`,
                    }}
                    onClick={Add}
                  >
                    <DoneIcon /> Save
                  </Button>
                </CardActions>
              </Collapse>
            </Card>
          </Grid>
        </Container>
      </div>
      <PendingTasks load={pull_data}/>
    </ThemeProvider>
  );
}
