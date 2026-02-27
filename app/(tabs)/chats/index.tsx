import { useCreateChat, useChats, useDeleteChat } from '@/lib/chat';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Chat } from '@/lib/chat';

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 86400000) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (diff < 604800000) return d.toLocaleDateString([], { weekday: 'short' });
  return d.toLocaleDateString();
}

export default function ChatsListScreen() {
  const router = useRouter();
  const { data: chats, isLoading } = useChats();
  const createChat = useCreateChat();
  const deleteChat = useDeleteChat();
  const [newTitle, setNewTitle] = useState('');

  const handleCreate = async () => {
    try {
      const chat = await createChat.mutateAsync(newTitle || undefined);
      setNewTitle('');
      router.push(`/(tabs)/chats/${chat.id}`);
    } catch {
      Alert.alert('Error', 'Failed to create chat');
    }
  };

  const handleDelete = (chat: Chat) => {
    Alert.alert('Delete Chat', `Delete "${chat.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteChat.mutate(chat.id),
      },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView edges={['top']} className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
    <View className="flex-1">
      <View className="border-border flex-row gap-2 border-b px-4 py-3">
        <Input
          className="flex-1"
          placeholder="New chat title"
          value={newTitle}
          onChangeText={setNewTitle}
          editable={!createChat.isPending}
        />
        <Button onPress={handleCreate} disabled={createChat.isPending}>
          <Text>{createChat.isPending ? '...' : 'Add'}</Text>
        </Button>
      </View>
      <FlatList
        data={chats ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            className="border-border flex-row items-center justify-between border-b px-4 py-3 active:bg-muted/50"
            onPress={() => router.push(`/(tabs)/chats/${item.id}`)}
            onLongPress={() => handleDelete(item)}>
            <View className="flex-1">
              <Text className="font-medium">{item.title}</Text>
              <Text className="text-muted-foreground text-sm">
                {formatDate(item.updatedOn)}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Text className="text-muted-foreground">No chats yet</Text>
            <Text className="text-muted-foreground mt-2 text-sm">
              Create one above
            </Text>
          </View>
        }
      />
    </View>
    </SafeAreaView>
  );
}
