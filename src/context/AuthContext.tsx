
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: {
    email: string | null;
    name: string | null;
    provider: string | null;
  } | null;
  loading: boolean;
  logout: () => void;
  login: (email: string, name: string, provider: string) => void;
}

// Initialize with default values
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  loading: true,
  logout: () => {},
  login: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (loggedIn) {
      setIsLoggedIn(true);
      setUser({
        email: localStorage.getItem('userEmail'),
        name: localStorage.getItem('userName'),
        provider: localStorage.getItem('loginProvider'),
      });
    }
    
    // Set loading to false after checking auth state
    setLoading(false);
  }, []);

  const login = (email: string, name: string, provider: string) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    localStorage.setItem('loginProvider', provider);
    setIsLoggedIn(true);
    setUser({ email, name, provider });
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('loginProvider');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
