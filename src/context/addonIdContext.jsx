import React, { createContext, useState, useEffect, useContext } from "react";

const AddonIdContext = createContext();

export const useAddonIdContext = () => useContext(AddonIdContext);

export const AddonIdProvider = ({ children }) => {
  const [selectedAddonId, setSelectedAddonId] = useState(() => {
    return localStorage.getItem("selectedAddonId") || "";
  });

  const updateAddonId = (id) => {
    setSelectedAddonId(id);
  };

  useEffect(() => {
    localStorage.setItem("selectedAddonId", selectedAddonId);
  }, [selectedAddonId]);

  return (
    <AddonIdContext.Provider
      value={{
        selectedAddonId,
        updateAddonId,
      }}
    >
      {children}
    </AddonIdContext.Provider>
  );
};
