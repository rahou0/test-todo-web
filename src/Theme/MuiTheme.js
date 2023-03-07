import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 18,
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.75,
    },
    body2: {
      lineHeight: 1.6,
      fontSize: 14,
      fontWeight: 400,
    },
  },
  palette: {
    primary: { main: "#a18aff", secondary: "#3fd4f4" },
    secondary: { main: "#3fd4f4" },
    error: { main: "#fe859e" },
    success: { main: "#14C38E" },
    text: {
      success: "#14C38E",
      info: "#3fd4f4",
    },
  },
});
