import React, { createContext, useState, useContext, useEffect } from "react";

const SideMenuContext = createContext();

export const useSideMenuContext = () => {
  return useContext(SideMenuContext);
};

export const SideMenuProvider = ({ children }) => {
  const [sideMenu, setSideMenu] = useState(false);

  useEffect(() => {
    const updateSideMenu = () => {
      const screenWidth = window.innerWidth;
      setSideMenu(screenWidth > 1024);
    };

    updateSideMenu();

    window.addEventListener("resize", updateSideMenu);

    return () => {
      window.removeEventListener("resize", updateSideMenu);
    };
  }, []);

  const toggleSideMenu = () => {
    setSideMenu((prevState) => !prevState);
  };

  return (
    <SideMenuContext.Provider value={{ sideMenu, toggleSideMenu }}>
      {children}
    </SideMenuContext.Provider>
  );
};

export default SideMenuProvider;
