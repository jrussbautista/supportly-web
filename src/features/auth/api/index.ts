import apiClient from '../../../utils/api-client';
import { User } from '../../users/types';
import { LoginFields, SignUpFields } from '../types';

export const login = (fields: LoginFields) => {
  return apiClient.post('/auth/login', fields);
};

export const signUp = (fields: SignUpFields) => {
  return apiClient.post('/auth/signup', fields);
};

export const getMe = async (): Promise<User> => {
  const { data } = await apiClient.get('/auth/me');
  return data.user;
};
