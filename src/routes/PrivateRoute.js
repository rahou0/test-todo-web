import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [cookies] = useCookies(["logged_in"]);

  const isLoggedIn = cookies?.logged_in;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default PrivateRoute;
