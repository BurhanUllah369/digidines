import React, { createContext, useState, useContext, useEffect } from "react";

const SideMenuContext = createContext();

export const useEditRestaurantContext = () => {
  return useContext(SideMenuContext);
};

export const RestaurantSectionProvider = ({ children }) => {
  const initialShowRestaurantSection = parseInt(localStorage.getItem("showRestaurantSection")) || 1;
  const [showRestaurantSection, setShowRestaurantSection] = useState(initialShowRestaurantSection);

  useEffect(() => {
    localStorage.setItem("showRestaurantSection", showRestaurantSection);

    const handleWindowReload = () => {
      localStorage.removeItem("showRestaurantSection");
    };
  
    window.addEventListener("beforeunload", handleWindowReload);
  
    return () => {
      window.removeEventListener("beforeunload", handleWindowReload);
    };

  }, [showRestaurantSection]);

  const toggleRestaurantSection = (e) => {
    setShowRestaurantSection(e);
  };

  return (
    <SideMenuContext.Provider
      value={{ showRestaurantSection, toggleRestaurantSection }}
    >
      {children}
    </SideMenuContext.Provider>
  );
};
