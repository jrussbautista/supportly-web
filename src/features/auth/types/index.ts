export interface LoginFields {
  email: string;
  password: string;
}

export interface SignUpFields extends LoginFields {
  firstName: string;
  lastName: string;
}
