import { Stack } from 'expo-router';

export default function ChatsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Chats',
        headerTitle: 'Chats',
      }}
    />
  );
}
