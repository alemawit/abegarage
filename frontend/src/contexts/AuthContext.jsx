// authContext.jsx

import React, { useState, useEffect, useContext } from "react";
import employeeAuthHeader from "../util/auth.header";

// Create the AuthContext
const AuthContext = React.createContext();

// Export the AuthContext Hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the AuthProvider
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    const loggedInEmployee = employeeAuthHeader();

    loggedInEmployee.then((response) => {
      if (response?.employee_token) {
        setIsLogged(true);
        setRole(response.employee_role);

        // Set admin status for role 1
        if (response.employee_role === 1) {
          setIsAdmin(true);
        }
        // Check for manager role (assuming it's role 2)
        if (response.employee_role === 2) {
          setIsManager(true);
        }

        setEmployee(response);
      }
    });
  }, []);

  const value = {
    isLogged,
    isAdmin,
    isManager,
    role,
    setIsAdmin,
    setIsLogged,
    setRole,
    employee,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
