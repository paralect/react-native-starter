export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  avatarUrl?: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  user: User;
  emailVerificationToken?: string;
}

export interface SignInResponse {
  accessToken: string;
  user: User;
}

export interface ForgotPasswordParams {
  email: string;
}

export interface ResetPasswordParams {
  token: string;
  password: string;
}

export interface ResendEmailParams {
  email: string;
}

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}
