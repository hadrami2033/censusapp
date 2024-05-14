import { createTheme } from "@mui/material/styles";
import components from "./ComponentOverRide";
import shadows from "./Shadows";
import typography from "./Typoraphy";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#21275f",
      light: "#21275f",
      dark: "#c5c5cf",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#21275f",
      light: "#fcf1ed",
      dark: "#c5c5cf",
      contrastText: "#ffffff",
    },
    success: {
      main: "#079ff0",

      dark: "#74beff",
      contrastText: "#ffffff",
    },
    danger: {
      main: "#e46a76",
      light: "#fdf3f5",
      dark: "#F1B4BA",
    },
    info: {
      main: "#0bb2fb",
      light: "#a7e3f4",
    },
    error: {
      main: "#e46a76",

      dark: "#e45a68",
    },
    warning: {
      main: "#e9e50f",

      dark: "#dcb014",
      contrastText: "#ffffff",
    },
    text: {
      secondary: "#777e89",
      danger: "#fc4b6c",
    },
    grey: {
      A100: "#ecf0f2",
      A200: "#99abb4",
      A400: "#767e89",
      A700: "#e6f4ff",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "rgba(0, 0, 0, 0.03)",
    },
    background: {
      default: "#fafbfb",
    },
  },
  mixins: {
    toolbar: {
      color: "#949db2",
      "@media(min-width:1280px)": {
        minHeight: "64px",
        padding: "0 30px",
      },
      "@media(max-width:1280px)": {
        minHeight: "64px",
      },
    },
  },
  components,
  shadows,
  typography,
});

export default theme;
