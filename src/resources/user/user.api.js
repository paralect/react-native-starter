import { apiClient } from 'helpers/api';

export const signUp = userData => apiClient
  .post('account/signup', userData);

export const signIn = (email, password) => apiClient
  .post('account/signin', { email, password });

export const verifyEmailDev = _signupToken => apiClient
  .get(`account/verifyEmail/${_signupToken}`);

export const signOut = () => apiClient
  .post('account/logout');
