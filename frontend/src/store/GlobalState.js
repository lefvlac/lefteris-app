import React, { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext({
  isLoggedIn: false,
  onLogin: (token) => {},
  onLogout: () => {},
});

//Provider
export const GlobalProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employers, setEmployers] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const addEmployer = (employer) => {
    setEmployers([...employers, employer]);
  };

  useEffect(() => {
    const storedInfo = localStorage.getItem("token");
    if (storedInfo) {
      setIsLoggedIn(true);
    }
  }, []);
  const loginHandler = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const contextValue = {
    isLoggedIn: isLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    employers,
    setEmployers,
    addEmployer,
    selectedEmployer,
    setSelectedEmployer,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {props.children}
    </GlobalContext.Provider>
  );
};
