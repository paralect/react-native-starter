import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { setOnUnauthorizedCallback } from '@/lib/api';
import { ACCOUNT_QUERY_KEY } from '@/lib/auth';

export function AuthInitializer() {
  const queryClient = useQueryClient();

  useEffect(() => {
    setOnUnauthorizedCallback(() => {
      queryClient.setQueryData(ACCOUNT_QUERY_KEY, null);
    });
  }, [queryClient]);

  return null;
}
