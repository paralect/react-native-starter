import { apiClient } from '@/lib/api';
import { API_PATHS } from '@/lib/api';
import { storage } from '@/lib/storage';
import type {
  ForgotPasswordParams,
  ResetPasswordParams,
  ResendEmailParams,
  SignInParams,
  SignInResponse,
  SignUpParams,
  SignUpResponse,
  UpdateUserParams,
  User,
} from './types';

export async function signIn(params: SignInParams): Promise<SignInResponse> {
  const { data } = await apiClient.post<SignInResponse>(API_PATHS.accountSignIn, params);
  if (data.accessToken) {
    await storage.setToken(data.accessToken);
  }
  return data;
}

export async function signUp(params: SignUpParams): Promise<SignUpResponse> {
  const { data } = await apiClient.post<SignUpResponse>(API_PATHS.accountSignUp, params);
  return data;
}

export async function signOut(): Promise<void> {
  try {
    await apiClient.post(API_PATHS.accountSignOut);
  } finally {
    await storage.removeToken();
  }
}

export async function getAccount(): Promise<User | null> {
  const token = await storage.getToken();
  if (!token) return null;
  try {
    const { data } = await apiClient.get<User>(API_PATHS.account);
    return data;
  } catch {
    return null;
  }
}

export async function forgotPassword(params: ForgotPasswordParams): Promise<void> {
  await apiClient.post(API_PATHS.accountForgotPassword, params);
}

export async function resetPassword(params: ResetPasswordParams): Promise<void> {
  await apiClient.put(API_PATHS.accountResetPassword, params);
}

export async function verifyEmail(token: string): Promise<SignInResponse> {
  const { data } = await apiClient.post<SignInResponse>(API_PATHS.accountVerifyEmail, { token });
  if (data.accessToken) {
    await storage.setToken(data.accessToken);
  }
  return data;
}

export async function resendEmail(params: ResendEmailParams): Promise<void> {
  await apiClient.post(API_PATHS.accountResendEmail, params);
}

export async function updateAccount(params: UpdateUserParams): Promise<User> {
  const { data } = await apiClient.put<User>(API_PATHS.account, params);
  return data;
}
