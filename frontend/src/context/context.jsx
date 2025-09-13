import React, { useContext, createContext, useState } from "react";

export const ContextApi = createContext({
  user: "",
  token: "",
  settoken: "",
  setuserInfo:"",
});

const Context = ({ children }) => {
  const [userInfo, setuserInfo] = useState(null);
  const [token, settoken] = useState(null);
  function logout() {
    localStorage.removeItem("token");
    settoken(null);
    setuserInfo(null);
  }
  return (
    <ContextApi.Provider value={{ setuserInfo, userInfo, settoken, token ,logout}}>
      {children}
    </ContextApi.Provider>
  );
};

export default Context;

export const useContextData = () => {
  const data = useContext(ContextApi);
  return data;
};
