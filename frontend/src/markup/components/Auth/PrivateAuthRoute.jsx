import React, { useEffect, useState } from "react";
//import the  navigate from react-router-dom
import { Navigate } from "react-router";
//Import the Util function from the utils folder
import getAuth from "../../../util/auth.header";

const PrivateAuthRoute = ({ roles, children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    //Retrive the logged in user from local storage
    const loggedInEmployee = getAuth();
    //Check if the user is logged in
    loggedInEmployee.then((response) => {
      if (response.employee_token) {
        setIsLogged(true);
        //Check if the user has the required role
        if (
          roles &&
          roles.length > 0 &&
          roles.includes(response.employee_role)
        ) {
          setIsAuthorized(true);
        }
      }
      setIsChecked(true);
    });
  }, [roles]);

  //Check if the user is logged in and has the required role
  if (isChecked) {
    if (!isLogged) {
      return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
      return <Navigate to="/Unautorized" />;
    }
  }
  return children;
};
//export the PrivateAuthRoute component
export default PrivateAuthRoute;
