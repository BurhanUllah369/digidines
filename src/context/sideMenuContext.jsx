import React, { createContext, useState, useContext } from "react";

const SideMenuContext = createContext();

export const useSideMenuContext = () => {
  return useContext(SideMenuContext);
};

export const SideMenuProvider = ({ children }) => {
  const [sideMenu, setSideMenu] = useState(false); 

  const toggleSideMenu = () => { 
    setSideMenu(prevState => !prevState);
  };

  return (
    <SideMenuContext.Provider value={{ sideMenu, toggleSideMenu }}>
      {children}
    </SideMenuContext.Provider>
  );
};
