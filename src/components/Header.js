import * as React from "react";
import { Link } from "react-router-dom";
import theme from "../Theme";
import { ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu, MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log("header props", props);
  const Logout = ()=>{
    props.userDataHandler()
    setAnchorEl(null);
    }
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{backgroundColor:`${theme.palette.light.main}`}}>
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            color="light.primary"
            // sx={{ flexGrow: 1 }}
          >
            Tasks
          </Typography>
          {/* <Button color="icon">ll</Button> */}
          {props.userData.User.isLoggedIn ? (
            <div style={{ width: "100%" }}>
              <Box sx={{ float: "right" }}>
                <IconButton component={Link} size="small" to="/" sx={{ color: `${theme.palette.light.primary}` }}>
                  <HomeIcon/>
                </IconButton>
                <IconButton component={Link} to="/done" sx={{ color: `${theme.palette.light.primary}`  }}>
                  <DoneAllIcon/>
                </IconButton>
                <Button
                  style={{ color: `${theme.palette.light.primary}` }}
                  onClick={handleMenu}
                >
                  <AccountCircleIcon/>
                  {props.userData.User.userData.name}
                </Button>
                <Menu
                id="menu-appbar"
                // anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={Logout}>Logout</MenuItem>
              </Menu>
              </Box>
            </div>
          ) : (
            // sx={{ display: { xs: "none", sm: "block" } }}
            <div style={{ width: "100%" }}>
              <Box sx={{ float: "right" }}>
                <Button component={Link} to="/signin" sx={{ color: "#fff" }}>
                  Signin
                </Button>
                <Button component={Link} to="/signup" sx={{ color: "#fff" }}>
                  Signup
                </Button>
              </Box>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
