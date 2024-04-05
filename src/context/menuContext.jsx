import React, { createContext, useState, useContext, useEffect } from "react";

const MenuContext = createContext();

export const useMenuContext = () => {
  return useContext(MenuContext);
};

export const MenuProvider = ({ children }) => {
  const [showMenuItems, setShowMenuItems] = useState();

  const toggleMenuItems = (visibility) => {
    setShowMenuItems(visibility);
  };

  return (
    <MenuContext.Provider value={{ showMenuItems, toggleMenuItems }}>
      {children}
    </MenuContext.Provider>
  );
};
