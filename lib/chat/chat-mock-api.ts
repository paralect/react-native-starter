import type { Chat, Message } from './types';

const mockChats: Chat[] = [
  {
    id: 'chat_1',
    userId: 'user_1',
    title: 'Flutter Development',
    createdOn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedOn: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'chat_2',
    userId: 'user_1',
    title: 'API Integration',
    createdOn: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedOn: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

const mockMessages: Record<string, Message[]> = {
  chat_1: [
    {
      id: 'msg_1',
      chatId: 'chat_1',
      role: 'user',
      content: 'How do I implement state management in Flutter?',
      createdOn: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'msg_2',
      chatId: 'chat_1',
      role: 'assistant',
      content:
        'Flutter offers several state management solutions. The most popular ones are:\n\n1. **Riverpod** - Modern, type-safe state management\n2. **Provider** - Simple and lightweight\n3. **Bloc** - Event-driven architecture',
      createdOn: new Date(Date.now() - 2 * 60 * 60 * 1000 - 60000).toISOString(),
    },
  ],
  chat_2: [
    {
      id: 'msg_3',
      chatId: 'chat_2',
      role: 'user',
      content: 'What is the best way to handle API calls in Flutter?',
      createdOn: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    },
  ],
};

let chatCounter = 2;
let messageCounter = 3;

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export const chatMockApi = {
  async getChats(): Promise<Chat[]> {
    await delay(500);
    return [...mockChats].sort(
      (a, b) => new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime()
    );
  },

  async createChat(title?: string): Promise<Chat> {
    await delay(300);
    chatCounter++;
    const chat: Chat = {
      id: `chat_${chatCounter}`,
      userId: 'user_1',
      title: title ?? 'New Chat',
      createdOn: new Date().toISOString(),
      updatedOn: new Date().toISOString(),
    };
    mockChats.unshift(chat);
    mockMessages[chat.id] = [];
    return chat;
  },

  async getMessages(chatId: string): Promise<Message[]> {
    await delay(400);
    return [...(mockMessages[chatId] ?? [])].sort(
      (a, b) => new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime()
    );
  },

  async sendMessage(chatId: string, content: string): Promise<Message> {
    await delay(200);
    messageCounter++;
    const userMsg: Message = {
      id: `msg_user_${messageCounter}`,
      chatId,
      role: 'user',
      content,
      createdOn: new Date().toISOString(),
    };
    if (!mockMessages[chatId]) mockMessages[chatId] = [];
    mockMessages[chatId].push(userMsg);

    await delay(300);
    messageCounter++;
    const assistantMsg: Message = {
      id: `msg_assistant_${messageCounter}`,
      chatId,
      role: 'assistant',
      content: `Mock response to: "${content.slice(0, 50)}${content.length > 50 ? '...' : ''}"`,
      createdOn: new Date().toISOString(),
    };
    mockMessages[chatId].push(assistantMsg);

    const chat = mockChats.find((c) => c.id === chatId);
    if (chat) chat.updatedOn = new Date().toISOString();

    return assistantMsg;
  },

  async deleteChat(chatId: string): Promise<void> {
    await delay(300);
    const idx = mockChats.findIndex((c) => c.id === chatId);
    if (idx >= 0) mockChats.splice(idx, 1);
    delete mockMessages[chatId];
  },
};
