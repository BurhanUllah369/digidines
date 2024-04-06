import React, { createContext, useState, useContext } from "react";

const SideMenuContext = createContext();

export const useRestaurantDetailsContext = () => {
  return useContext(SideMenuContext);
};

export const SectionProvider = ({ children }) => {
  const [showSection, setShowSection] = useState(1); 

  const toggleSection = (e) => { 
    setShowSection(e);
  };

  return (
    <SideMenuContext.Provider value={{ showSection, toggleSection }}>
      {children}
    </SideMenuContext.Provider>
  );
};