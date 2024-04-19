import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// useUser will return the chosen context in our component
// if we had for exemple an X constant in our Component , we can export it in other comps by :
// import {useUser}
// const {X} = useUser(); this way , it will automaticaly understand the context of usage and call the X const from the
// the comp

export const useUser = () => {
  return useContext(UserContext);
};
