import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext); // Fixed the context name
};

export const UserProvider = ({ children }) => { // Renamed from MenuProvider to UserProvider for clarity
  const [user, setUser] = useState(); // Renamed from user to currentUser for clarity

  const updateUserDetails = (name) => { // Renamed from userDetails to updateUserDetails for clarity
    setUser(name);
  };

  return (
    <UserContext.Provider value={{ user, updateUserDetails }}> {/* Updated context value */}
      {children}
    </UserContext.Provider>
  );
};
