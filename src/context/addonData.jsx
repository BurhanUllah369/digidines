import React, { createContext, useState, useContext } from "react";

const SelectedAddonContext = createContext();

export const useSelectedAddonContext = () => useContext(SelectedAddonContext);

export const SelectedAddonProvider = ({ children }) => {
  const [selectedAddonData, setSelectedAddonData] = useState({
    id: "",
    title: "",
    type: "",
    options: [],
  });

  const updateSelectedAddonData = (data) => {
    setSelectedAddonData(data);
    localStorage.setItem("selectedAddonData", JSON.stringify(data));
  };

  const clearSelectedAddonData = () => {
    setSelectedAddonData({
      id: "",
      title: "",
      type: "",
      options: [],
    });
    localStorage.removeItem("selectedAddonData");
  };

  return (
    <SelectedAddonContext.Provider
      value={{
        selectedAddonData,
        updateSelectedAddonData,
        clearSelectedAddonData,
      }}
    >
      {children}
    </SelectedAddonContext.Provider>
  );
};
