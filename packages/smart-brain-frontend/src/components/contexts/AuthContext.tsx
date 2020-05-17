import React, { ReactNode } from 'react';
import { FaSpinner } from 'react-icons/fa';

import { useAuthToken } from '../common/hooks/useAuthToken';

export interface User {
  id: string;
  name: string;
  email: string;
  entries: number;
  joined: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = React.createContext<AuthContextType>({
  user: { id: '', name: '', email: '', entries: 0, joined: '' },
  setUser: () => ({})
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, setUser, isLoading } = useAuthToken();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <FaSpinner className="test-test" size={40} />
      </div>
    );
  }

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export { AuthProvider, useAuth };
