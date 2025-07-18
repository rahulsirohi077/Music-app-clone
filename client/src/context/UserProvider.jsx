import { useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [openSidebar,setOpenSidebar] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser,openSidebar,setOpenSidebar }}>
      {children}
    </UserContext.Provider>
  );
};