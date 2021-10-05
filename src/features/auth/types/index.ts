import { User } from '../../users/types';

export interface LoginFields {
  email: string;
  password: string;
}

export interface SignUpFields extends LoginFields {
  firstName: string;
  lastName: string;
}

export interface Me {
  user: User;
  token: string;
}
