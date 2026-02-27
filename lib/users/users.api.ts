import { apiClient } from '@/lib/api';
import { API_PATHS } from '@/lib/api';
import type { User } from '@/lib/auth';

interface UsersResponse {
  results: User[];
  countItems: number;
  pageCount: number;
}

export async function getUsers(params?: { page?: number; perPage?: number }): Promise<User[]> {
  const { data } = await apiClient.get<UsersResponse>(API_PATHS.users, {
    params: { page: 1, perPage: 20, ...params },
  });
  return data.results;
}
