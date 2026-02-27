import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChatMessages, useSendMessage } from '@/lib/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import type { Message } from '@/lib/chat';

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <View
      className={`mb-2 max-w-[80%] self-${isUser ? 'end' : 'start'} rounded-2xl px-4 py-2 ${
        isUser ? 'bg-primary' : 'bg-muted'
      }`}>
      <Text
        className={isUser ? 'text-primary-foreground' : 'text-foreground'}>
        {message.content}
      </Text>
    </View>
  );
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: messages, isLoading } = useChatMessages(id);
  const sendMessage = useSendMessage(id);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    const content = input.trim();
    if (!content || sendMessage.isPending) return;
    setInput('');
    await sendMessage.mutateAsync(content);
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
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}>
      <FlatList
        data={messages ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Text className="text-muted-foreground">No messages yet</Text>
          </View>
        }
      />
      <View className="border-border flex-row gap-2 border-t px-4 py-3">
        <Input
          className="flex-1"
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
          editable={!sendMessage.isPending}
          onSubmitEditing={handleSend}
        />
        <Button onPress={handleSend} disabled={!input.trim() || sendMessage.isPending}>
          <Text>{sendMessage.isPending ? '...' : 'Send'}</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
