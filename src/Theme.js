import { createTheme } from "@mui/material/styles";
// import { purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode:"light",
    light: {
      main: "#13ECAE",
      back:"white",
      dark: "seagreen",
      primary: "#FFFFFF",
      secondary: "#078F87",
      danger:"rgb(207, 15, 8)",
    },
    // light: {
    //   main: "#03C68F",
    //   dark: "orange",
    //   back: "black",
    //   primary: "#505353",
    //   secondary: "#13ECAE",
    //   danger:"rgb(207, 15, 8)",
    // },
    icon: {
      main: "#FFFFFF",
    },
  },
});

export default theme;
