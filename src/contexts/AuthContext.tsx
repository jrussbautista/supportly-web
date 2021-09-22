import { createContext, useState, useContext } from 'react';
import { User } from '../features/users/types';
import * as AuthAPI from '../features/auth/api';
import { LoginFields } from '../features/auth/types';

interface State {
  currentUser: User | null;
  accessToken: null | string;
  isAuthenticated: boolean;
}

interface Context extends State {
  login(fields: LoginFields): Promise<void>;
}

const AuthContext = createContext<Context | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const currentUserLocalStorage = localStorage.getItem('currentUser');
  const initialCurrentUser = currentUserLocalStorage
    ? JSON.parse(currentUserLocalStorage)
    : null;

  const initialAccessToken = localStorage.getItem('accessToken') || null;
  const initialIsAuthenticated = Boolean(initialAccessToken);

  const [state, setState] = useState<State>({
    currentUser: initialCurrentUser,
    accessToken: initialAccessToken,
    isAuthenticated: initialIsAuthenticated,
  });

  const login = async (fields: LoginFields) => {
    const { data } = await AuthAPI.login(fields);
    const { token, user } = data;

    localStorage.setItem('accessToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));

    setState({
      ...state,
      isAuthenticated: true,
      accessToken: token,
      currentUser: user,
    });
  };

  const value = {
    ...state,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a provider');
  }
  return context;
};
