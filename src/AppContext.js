import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  const toogleIsActive = () => setIsActive((prevValue) => !prevValue);

  // eslint-disable-next-line prettier/prettier
  return <AppContext.Provider value={{ isActive, toogleIsActive }}>{children}</AppContext.Provider>;
};

export default AppProvider;
