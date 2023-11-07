import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  makeAuthenticatedRequest: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

const defaultAuthContext: AuthContextType = {
  login: (token: string) => {},
  logout: () => {},
  isAuthenticated: false,
  makeAuthenticatedRequest: async (input: RequestInfo, init?: RequestInit) => new Response(),
};

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

  const makeAuthenticatedRequest = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const headers = new Headers(init?.headers);
    headers.append('Authorization', `Bearer ${token}`);

    const modifiedInit = init ? { ...init, headers } : { headers };

    return fetch(input, modifiedInit);
  };

  const contextValue = {
    login,
    logout,
    isAuthenticated: !!authToken,
    makeAuthenticatedRequest,
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
