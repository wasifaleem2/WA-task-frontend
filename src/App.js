import React from "react";
import "./App.css";
import theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";
import CreateTask from "./containers/CreateTaskContainer";
import PendingTasks from "./containers/PendingTasksContainer";
import CompletedTasks from "./containers/CompletedTasksContainer";
import Signin from "./containers/SigninContainer";
import Signup from "./containers/SignupContainer";
import {Routes, Route} from 'react-router-dom'
import HeaderContainer from "./containers/HeaderContainer";
import ProtectedRoute from "./ProtectedRoute"
// import A_AllUsers from "./admin/A_AllUsers";
// import A_AllTasks from "./admin/A_AllTasks";
//http://localhost:3001
//https://watasks.herokuapp.com
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{backgroundColor:`${theme.palette.light.back}`, minHeight:"100vh", height:"100%"}}>
        <HeaderContainer />
        {/* <CreateTask/> */}
        <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/done"
          element={
            <ProtectedRoute>
              <CompletedTasks />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/adminshowallusers" element={<A_AllUsers />} />
        <Route path="/adminshowalltasks" element={<A_AllTasks/>} /> */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
