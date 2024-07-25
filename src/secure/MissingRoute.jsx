import React from "react";
import { Navigate } from "react-router-dom";

function MissingRoute() {
  return <Navigate to={{ pathname: "/home" }} />;
}

export default MissingRoute;
