import apiClient from '../../../utils/api-client';
import { LoginFields } from '../types';

export const login = (fields: LoginFields) => {
  return apiClient.post('/auth/login', fields);
};
