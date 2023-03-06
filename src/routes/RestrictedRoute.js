import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const [cookies] = useCookies(["logged_in"]);
  const isLoggedIn = cookies?.logged_in;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Redirect to={{ pathname: "/" }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RestrictedRoute;
