import React, { createContext, useState, useContext } from "react";

const SideMenuContext = createContext();

export const useEditRestaurantContext = () => {
  return useContext(SideMenuContext);
};

export const RestaurantSectionProvider = ({ children }) => {
  const [showRestaurantSection, setShowRestaurantSection] = useState(1); 

  const toggleRestaurantSection = (e) => { 
    setShowRestaurantSection(e);
  };

  return (
    <SideMenuContext.Provider value={{ showRestaurantSection, toggleRestaurantSection }}>
      {children}
    </SideMenuContext.Provider>
  );
};