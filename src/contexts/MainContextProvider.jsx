import { createContext, useContext, useEffect, useState } from "react";

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const initialIsAdmin = sessionStorage.getItem("isAdmin") === "true";
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");

  const setAdminStatus = (status) => {
    setIsAdmin(status);
    sessionStorage.setItem("isAdmin", JSON.stringify(status));
  };

  const handleLogout = () => {
    // Clear relevant states when the user logs out
    setIsAdmin(false);
    setUserIsLoggedIn(false);
    setActiveTitle("");

    // Clear localStorage values
    localStorage.removeItem("activeTitle");

    // Clear sessionStorage values
    sessionStorage.removeItem("isAdmin");
  };

  useEffect(() => {
    const storedActiveTitle = localStorage.getItem("activeTitle");
    if (!userIsLoggedIn) {
      localStorage.removeItem("activeTitle");
      setActiveTitle("");
    } else if (storedActiveTitle) {
      setActiveTitle(storedActiveTitle);
    }
  }, [userIsLoggedIn]);

  useEffect(() => {
    localStorage.setItem("activeTitle", activeTitle);
  }, [activeTitle]);

  return (
    <MainContext.Provider
      value={{
        isAdmin,
        setAdminStatus,
        activeTitle,
        setActiveTitle,
        userIsLoggedIn,
        setUserIsLoggedIn,
        handleLogout, // Added handleLogout function
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
