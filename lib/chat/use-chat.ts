import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatMockApi } from './chat-mock-api';
import type { Chat } from './types';

export function useChats() {
  return useQuery({
    queryKey: ['chats'],
    queryFn: () => chatMockApi.getChats(),
  });
}

export function useCreateChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title?: string) => chatMockApi.createChat(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
}

export function useChatMessages(chatId: string | undefined) {
  return useQuery({
    queryKey: ['chats', chatId, 'messages'],
    queryFn: () => chatMockApi.getMessages(chatId!),
    enabled: !!chatId,
  });
}

export function useSendMessage(chatId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => chatMockApi.sendMessage(chatId!, content),
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      queryClient.invalidateQueries({ queryKey: ['chats', chatId, 'messages'] });
    },
  });
}

export function useDeleteChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chatId: string) => chatMockApi.deleteChat(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
}
