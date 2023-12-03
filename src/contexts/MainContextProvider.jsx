import { createContext, useContext, useEffect, useState } from "react";

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  // Load isAdmin state from sessionStorage on initial render
  const initialIsAdmin = sessionStorage.getItem("isAdmin") === "true";
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

  const setAdminStatus = (status) => {
    setIsAdmin(status);
    // Save isAdmin state to sessionStorage
    sessionStorage.setItem("isAdmin", JSON.stringify(status));
  };

  return (
    <MainContext.Provider
      value={{ isAdmin, setAdminStatus }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
