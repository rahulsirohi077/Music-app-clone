import { useState } from 'react';
import { UserContext } from './UserContext';
import type { User } from '../types';

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | boolean>(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, openSidebar, setOpenSidebar }}>
      {children}
    </UserContext.Provider>
  );
};