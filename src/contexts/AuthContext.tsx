import { createContext, useState, useContext, useEffect } from 'react';

import * as AuthAPI from '../features/auth/api';
import { getMe } from '../features/auth/api';
import { LoginFields, SignUpFields } from '../features/auth/types';
import { User } from '../features/users/types';
import { removeAuthHeaderToken, setAuthHeaderToken } from '../utils/api-client';

interface State {
  currentUser: User | null;
  accessToken: null | string;
  isAuthenticated: boolean;
}

interface Context extends State {
  login(fields: LoginFields): Promise<void>;
  signUp(fields: SignUpFields): Promise<void>;
  logOut(): void;
}

const AuthContext = createContext<Context | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const currentUserLocalStorage = localStorage.getItem('currentUser');
  const initialCurrentUser = currentUserLocalStorage ? JSON.parse(currentUserLocalStorage) : null;

  const initialAccessToken = localStorage.getItem('accessToken') || null;
  const initialIsAuthenticated = Boolean(initialAccessToken);

  const initialState: State = {
    currentUser: initialCurrentUser,
    accessToken: initialAccessToken,
    isAuthenticated: initialIsAuthenticated,
  };

  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        if (accessToken) {
          const currentUser = await getMe();
          setState((state) => ({ ...state, currentUser }));
        }
      } catch (error) {
        console.log(error);
        setState({ currentUser: null, accessToken: null, isAuthenticated: false });
      }
    };
    loadCurrentUser();
  }, []);

  const login = async (fields: LoginFields) => {
    const { data } = await AuthAPI.login(fields);
    const { token, user } = data;

    localStorage.setItem('accessToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setAuthHeaderToken(token);

    setState({
      ...state,
      isAuthenticated: true,
      accessToken: token,
      currentUser: user,
    });
  };

  const signUp = async (fields: SignUpFields) => {
    const { data } = await AuthAPI.signUp(fields);
    const { token, user } = data;

    localStorage.setItem('accessToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setAuthHeaderToken(token);

    setState({
      ...state,
      isAuthenticated: true,
      accessToken: token,
      currentUser: user,
    });
  };

  const logOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    removeAuthHeaderToken();
    window.location.href = '/login';
  };

  const value = {
    ...state,
    login,
    signUp,
    logOut,
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
