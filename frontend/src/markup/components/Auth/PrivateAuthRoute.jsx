import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import getAuth from "../../../util/auth.header";

const PrivateAuthRoute = ({ roles, children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInEmployee = getAuth();
    loggedInEmployee.then((response) => {
      console.log(response); // Debugging
      if (response.employee_token) {
        setIsLogged(true);
        if (roles && roles.includes(response.employee_role)) {
          setIsAuthorized(true);
        }
      }
      setIsChecked(true);
      setLoading(false);
    });
  }, [roles]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (isChecked) {
    if (!isLogged) {
      return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
      return <Navigate to="/Unauthorized" />;
    }
  }

  return children;
};

export default PrivateAuthRoute;
