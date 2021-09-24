import apiClient from '../../../utils/api-client';
import { LoginFields, SignUpFields } from '../types';

export const login = (fields: LoginFields) => {
  return apiClient.post('/auth/login', fields);
};

export const signUp = (fields: SignUpFields) => {
  return apiClient.post('/auth/signup', fields);
};
