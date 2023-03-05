import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AuthMiddleware from "./Helpers/AuthMiddleware";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import PageLayout from "./components/PageLayout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <CookiesProvider>
          <PageLayout>
            <AuthMiddleware>
              <App />
            </AuthMiddleware>
          </PageLayout>
        </CookiesProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
