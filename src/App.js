import React from "react";
import { Switch } from "react-router-dom";

//pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

//routes manager
import PrivateRoute from "./routes/PrivateRoute";
import RestrictedRoute from "./routes/RestrictedRoute";

function App() {
  return (
    <Switch>
      <RestrictedRoute path="/login" component={LoginPage} />
      <RestrictedRoute path="/register" component={RegisterPage} />
      <PrivateRoute path="/" component={HomePage} />
    </Switch>
  );
}

export default App;
