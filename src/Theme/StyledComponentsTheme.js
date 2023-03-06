import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    Green: "#409A88",
    Red: "#EB5252",
    White: "#FFFFFF",
    Silver: "#C0C0C0",
    Black: "#000000",
  },
};

const StyledComponentsTheme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default StyledComponentsTheme;
