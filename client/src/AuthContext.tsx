import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  authToken: null,
  login: (token: string) => {},
  logout: () => {},
};

// Create context with the default value
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const isTokenExpired = (tokenTimestamp: number) => {
  const currentTime = new Date().getTime();
  const expirationTime = tokenTimestamp + 60 * 60 * 1000; // 60 minutes
  return currentTime > expirationTime;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenTimestamp = parseInt(localStorage.getItem('tokenTimestamp') || '0', 10);
    
    if (token && !isTokenExpired(tokenTimestamp)) {
      setAuthToken(token);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenTimestamp');
    }
  }, []);

  const login = (token: string) => {
    const timestamp = new Date().getTime();
    localStorage.setItem('token', token);
    localStorage.setItem('tokenTimestamp', timestamp.toString());
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
    setAuthToken(null);
  };

  const contextValue = {
    authToken,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
