// import React, { useState, useEffect, useContext } from "react";
// // import auth header
// import employeeAuthHeader from "../util/auth.header";

// // Create the AuthContext
// const AuthContext = React.createContext();

// // Export the AuthContext Hook
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// // Create the AuthProvider
// export const AuthProvider = ({ children }) => {
//   const [isLogged, setIsLogged] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [role, setRole] = useState(null); // <-- NEW: Store the user's role
//   const [employee, setEmployee] = useState(null);
//   const [manager, setManager] = useState(false);

//   useEffect(() => {
//     // Retrieve the logged-in user from local storage
//     const loggedInEmployee = employeeAuthHeader();

//     loggedInEmployee.then((response) => {
//       if (response.employee_token) {
//         setIsLogged(true);

//         // Set role based on employee_role
//         setRole(response.employee_role); // <-- NEW: Store the role

//         // If employee_role is 3, set admin status
//         if (response.employee_role === 3) {
//           setIsAdmin(true);
//         }
//         if(response.employee_role === 2) {
//           setManager(true);
//         }

//         setEmployee(response);
//       }
//     });
//   }, []);

//   const value = { isLogged, isAdmin, role, setIsAdmin, setIsLogged, employee };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

import React, { useState, useEffect, useContext } from "react";
// Import auth header
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
  const [role, setRole] = useState(null); // Store the user's role
  const [employee, setEmployee] = useState(null);
  const [isManager, setIsManager] = useState(false); // Fixed: renamed `manager` to `isManager`

  useEffect(() => {
    // Retrieve the logged-in user from local storage
    const loggedInEmployee = employeeAuthHeader();

    loggedInEmployee.then((response) => {
      if (response?.employee_token) {
        setIsLogged(true);

        // Set role based on employee_role
        setRole(response.employee_role);

        // Check roles
        if (response.employee_role === 3) {
          setIsAdmin(true);
        }
        if (response.employee_role === 2) {
          setIsManager(true);
        }

        setEmployee(response);
      }
    });
  }, []);

  // Add `setRole` and `isManager` to the context value
  const value = {
    isLogged,
    isAdmin,
    isManager, // Now available in useAuth()
    role,
    setIsAdmin,
    setIsLogged,
    setRole, // Allow updating role
    employee,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
