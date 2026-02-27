import { useUsers } from '@/lib/users';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';

export default function HomeScreen() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) {
    return (
      <SafeAreaView edges={['top']} className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-center text-destructive">
          Failed to load users. Make sure the API is running.
        </Text>
      </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
    <View className="flex-1">
      <View className="px-4 py-6">
        <Text className="text-2xl font-semibold">Home</Text>
        <Text className="text-muted-foreground mt-1">
          Users from Ship API
        </Text>
      </View>
      <FlatList
        data={users ?? []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable
            className="mx-4 mb-2 rounded-lg border border-border bg-card p-4 active:opacity-80"
            onPress={() => {}}>
            <Text className="font-medium">{item.firstName} {item.lastName}</Text>
            <Text className="text-muted-foreground text-sm">{item.email}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Text className="text-muted-foreground">No users yet</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
    </SafeAreaView>
  );
}
