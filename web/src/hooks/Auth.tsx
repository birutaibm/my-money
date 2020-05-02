import React, { createContext, useContext, useState, useCallback } from 'react';

import api from '../services/api';

interface AuthData {
  token?: string;
  user?: object;
}

interface LogInInputDTO {
  email: string;
  password: string;
}

interface AuthContext {
  user: object;
  logIn(data: LogInInputDTO): Promise<void>;
  logOut(): void;
}

const Context = createContext<AuthContext>({} as AuthContext);

export function useAuth(): AuthContext {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

const storageKey = '@MyMoney:Auth';

export const AuthProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(() => {
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : {};
  });

  const logIn = useCallback(async (info: LogInInputDTO) => {
    const { data } = await api.post('sessions', info);
    localStorage.setItem(storageKey, JSON.stringify(data));
    setState(data);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem(storageKey);
    setState({});
  }, []);

  return (
    <Context.Provider value={{ user: state.user, logIn, logOut }}>
      {children}
    </Context.Provider>
  );
};
