import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPlan } from "../features/userSlice";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const plan = useSelector(selectPlan);
  
  return (
    <Route
      {...rest}
      render={(props) => {
        return plan?.plan ? <Component {...props} /> : <Redirect to="/profile" />;
      }}
    />
  );
};
export default PrivateRoute;
