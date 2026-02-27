import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  forgotPassword,
  getAccount,
  resetPassword,
  resendEmail,
  signIn,
  signOut,
  signUp,
  updateAccount,
  verifyEmail,
} from './auth.api';
import type {
  ForgotPasswordParams,
  ResetPasswordParams,
  ResendEmailParams,
  SignInParams,
  SignUpParams,
  UpdateUserParams,
} from './types';

export const ACCOUNT_QUERY_KEY = ['account'] as const;

export function useAccount() {
  return useQuery({
    queryKey: ACCOUNT_QUERY_KEY,
    queryFn: getAccount,
    staleTime: 60 * 1000,
    retry: false,
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      queryClient.setQueryData(ACCOUNT_QUERY_KEY, data.user);
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUp,
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ACCOUNT_QUERY_KEY });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData(ACCOUNT_QUERY_KEY, null);
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (params: ForgotPasswordParams) => forgotPassword(params),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (params: ResetPasswordParams) => resetPassword(params),
  });
}

export function useVerifyEmail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (token: string) => verifyEmail(token),
    onSuccess: (data) => {
      queryClient.setQueryData(ACCOUNT_QUERY_KEY, data.user);
    },
  });
}

export function useResendEmail() {
  return useMutation({
    mutationFn: (params: ResendEmailParams) => resendEmail(params),
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UpdateUserParams) => updateAccount(params),
    onSuccess: (data) => {
      queryClient.setQueryData(ACCOUNT_QUERY_KEY, data);
    },
  });
}
