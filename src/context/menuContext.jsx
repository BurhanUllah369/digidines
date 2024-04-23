import React, { createContext, useState, useContext, useEffect } from 'react';

const MenuContext = createContext();

export const useMenuContext = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [selectedMenuId, setSelectedMenuId] = useState(
    localStorage.getItem('selectedMenuId') || null
  );

  const selectMenu = (menuId) => {
    setSelectedMenuId(menuId);
    localStorage.setItem('selectedMenuId', menuId);
  };

  useEffect(() => {
    const storedMenuId = localStorage.getItem('selectedMenuId');
    if (storedMenuId) {
      setSelectedMenuId(storedMenuId);
    }
  }, []); 

  return (
    <MenuContext.Provider value={{ selectedMenuId, selectMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
