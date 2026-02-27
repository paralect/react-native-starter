export interface Chat {
  id: string;
  userId: string;
  title: string;
  createdOn: string;
  updatedOn: string;
}

export interface Message {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  createdOn: string;
}
