import React, { createContext, useState, useEffect, useContext } from "react";

const RestaurantsPathsContext = createContext();

export const useRestaurantsPathsContext = () =>
  useContext(RestaurantsPathsContext);

export const RestaurantsPathsProvider = ({ children }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(() => {
    // Retrieve the selected restaurant from local storage, or default to an empty string if not found
    return localStorage.getItem("selectedRestaurant") || "";
  });

  const setSelectedRestaurantName = (name) => {
    setSelectedRestaurant(name.toLowerCase());
  };

  useEffect(() => {
    // Save the selected restaurant to local storage whenever it changes
    localStorage.setItem("selectedRestaurant", selectedRestaurant);
  }, [selectedRestaurant]);

  return (
    <RestaurantsPathsContext.Provider
      value={{
        selectedRestaurant,
        setSelectedRestaurantName,
      }}
    >
      {children}
    </RestaurantsPathsContext.Provider>
  );
};
