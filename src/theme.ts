import createTheme from "@mui/material/styles/createTheme";
import createPalette from "@mui/material/styles/createPalette";

const palette = createPalette({
  primary: {
    // carnelian
    main: "#b31b1b",
    // dark gray
    dark: "#222222",
    // white
    light: "#ffffff",
    // light gray
    contrastText: "#f7f7f7",
  },
  secondary: {
    // blue
    main: "#006699",
    // navy
    dark: "#073949",
  },
  success: {
    // green
    main: "#4b7b2b",
    // dark warm gray
    dark: "#a2998b",
    // sea gray
    light: "#9fad9f",
  },
  warning: {
    // orange
    main: "#d47500",
  },
  error: {
    // red
    main: "#df1e12",
  },
  info: {
    // buttons
    main: "#e2e2e2",
  },
});

// A custom theme for this app
export default createTheme({
  palette: palette,
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h1: {
      fontSize: 24,
    },
    h2: {
      fontSize: 18,
      fontWeight: 400,
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 12,
    },
  },
  spacing: 4,
});
