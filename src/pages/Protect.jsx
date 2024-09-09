/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../App";
function Protect({ componentProp: ComponentProp }) {
  const { token } = useContext(LoginContext);
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <ComponentProp/>;
}

export default Protect;
