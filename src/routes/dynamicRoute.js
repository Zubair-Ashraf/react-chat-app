import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../context/auth";

export default function DynamicRoutes(props) {
  const { user } = useAuthState();

  console.log(user, "user", props, "props");

  if (props.authenticated && !user) {
    return <Redirect to="/login" />;
  } else if (props.guest && user) {
    return <Redirect to="/" />;
  } else {
    return <Route component={props.component} {...props} />;
  }
}
