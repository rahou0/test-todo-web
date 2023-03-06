import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import PageLayout from "./components/Global/PageLayout";
import StyledComponentsTheme from "./Theme/StyledComponentsTheme";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./Theme/MuiTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <StyledComponentsTheme>
    <ThemeProvider theme={muiTheme}>
      <Provider store={store}>
        <Router>
          <CookiesProvider>
            <PageLayout>
              <App />
            </PageLayout>
          </CookiesProvider>
        </Router>
      </Provider>
    </ThemeProvider>
  </StyledComponentsTheme>
  // </React.StrictMode>
);
