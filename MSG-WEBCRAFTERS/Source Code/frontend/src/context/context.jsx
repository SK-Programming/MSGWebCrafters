import React, { useContext, createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const ContextApi = createContext({
  userInfo: null,
  token: "",
  settoken: () => {},
  setuserInfo: () => {},
  logout: () => {},
});

const Context = ({ children }) => {
  const [userInfo, setuserInfo] = useState(null);
  const [token, settoken] = useState(null);


  useEffect(() => {
    const savedToken = Cookies.get("token");
    const savedUser = Cookies.get("user");

    if (savedToken) {
      settoken(savedToken);
    }
    if (savedUser) {
      try {
        setuserInfo(JSON.parse(savedUser));
      } catch {
        setuserInfo(null);
      }
    }
  }, []);

  
  useEffect(() => {
    if (token) {
      Cookies.set("token", token, { expires: 7 }); 
    }
  }, [token]);

  useEffect(() => {
    if (userInfo) {
      Cookies.set("user", JSON.stringify(userInfo), { expires: 7 });
    }
  }, [userInfo]);

  function logout() {
    Cookies.remove("token");
    Cookies.remove("user");
    settoken(null);
    setuserInfo(null);
    console.log('logged ot')
  }

  return (
    <ContextApi.Provider
      value={{ userInfo, setuserInfo, token, settoken, logout }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default Context;

export const useContextData = () => useContext(ContextApi);
