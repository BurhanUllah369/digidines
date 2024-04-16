import React, { createContext, useState, useEffect, useContext } from "react";

const RestaurantsPathsContext = createContext();

export const useRestaurantsPathsContext = () =>
  useContext(RestaurantsPathsContext);

export const RestaurantsPathsProvider = ({ children }) => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(() => {
    return localStorage.getItem("selectedRestaurantId") || "";
  });

  const [selectedRestaurantName, setSelectedRestaurantName] = useState(() => {
    return localStorage.getItem("selectedRestaurantName") || "";
  });

  const restaurantId = (id) => {
    setSelectedRestaurantId(id);
  };

  const restaurantName = (name) => {
    setSelectedRestaurantName(name.toLowerCase());
  }

  useEffect(() => {
    localStorage.setItem("selectedRestaurantId", selectedRestaurantId);
    localStorage.setItem("selectedRestaurantName", selectedRestaurantName);
  }, [selectedRestaurantId, selectedRestaurantName]);

  return (
    <RestaurantsPathsContext.Provider
      value={{
        selectedRestaurantId,
        restaurantId,
        restaurantName,
        selectedRestaurantName,
      }}
    >
      {children}
    </RestaurantsPathsContext.Provider>
  );
};
