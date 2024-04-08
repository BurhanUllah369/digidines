import React, { createContext, useState, useContext } from "react";

const RestaurantsPathsContext = createContext();

export const useRestaurantsPathsContext = () =>
  useContext(RestaurantsPathsContext);

export const RestaurantsPathsProvider = ({ children }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const setSelectedRestaurantName = (name) => {
    setSelectedRestaurant(name.toLowerCase());
  };

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
