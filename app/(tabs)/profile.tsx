import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { useAccount, useSignOut, useUpdateAccount } from '@/lib/auth';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  password: z.string().min(8, 'Min 8 characters').optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

export default function ProfileScreen() {
  const router = useRouter();
  const { data: user, isLoading } = useAccount();
  const updateAccount = useUpdateAccount();
  const signOut = useSignOut();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: user
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          password: '',
        }
      : undefined,
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload: { firstName: string; lastName: string; password?: string } = {
        firstName: data.firstName,
        lastName: data.lastName,
      };
      if (data.password) payload.password = data.password;
      await updateAccount.mutateAsync(payload);
      Alert.alert('Success', 'Profile updated');
    } catch {
      Alert.alert('Error', 'Failed to update profile');
    }
  });

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await signOut.mutateAsync();
          router.replace('/(auth)/sign-in');
        },
      },
    ]);
  };

  if (isLoading || !user) {
    return (
      <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center">
        <Text className="text-muted-foreground">Loading...</Text>
      </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
    <ScrollView contentContainerStyle={{ padding: 24 }} className="flex-1">
      <View className="gap-6">
        <Text className="text-2xl font-semibold">Profile</Text>
        <View className="gap-4">
          <View className="gap-2">
            <Label>First Name</Label>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="First name"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  editable={!updateAccount.isPending}
                />
              )}
            />
            {errors.firstName && (
              <Text className="text-destructive text-sm">{errors.firstName.message}</Text>
            )}
          </View>
          <View className="gap-2">
            <Label>Last Name</Label>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Last name"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  editable={!updateAccount.isPending}
                />
              )}
            />
            {errors.lastName && (
              <Text className="text-destructive text-sm">{errors.lastName.message}</Text>
            )}
          </View>
          <View className="gap-2">
            <Label>Email</Label>
            <Input value={user.email} editable={false} className="bg-muted/50" />
          </View>
          <View className="gap-2">
            <Label>New Password (optional)</Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Leave empty to keep current"
                  secureTextEntry
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  editable={!updateAccount.isPending}
                />
              )}
            />
            {errors.password && (
              <Text className="text-destructive text-sm">{errors.password.message}</Text>
            )}
          </View>
        </View>
        <Button onPress={onSubmit} disabled={updateAccount.isPending}>
          <Text>{updateAccount.isPending ? 'Saving...' : 'Save Changes'}</Text>
        </Button>
        <Button variant="destructive" onPress={handleSignOut} disabled={signOut.isPending}>
          <Text>Sign Out</Text>
        </Button>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
