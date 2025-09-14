// // src/contexts/AuthContext.js
// import React, { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = (email, password) => {
//     if (email === "admin@example.com" && password === "admin123") {
//       setIsAuthenticated(true);
//       return true;
//     }
//     return false;
//   };

//   const logout = () => setIsAuthenticated(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
