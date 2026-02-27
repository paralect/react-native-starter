import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { useResetPassword } from '@/lib/auth';

const schema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof schema> & { token: string };

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams<{ token?: string }>();
  const resetPassword = useResetPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<FormData, 'token'>>({
    resolver: zodResolver(schema),
    defaultValues: { password: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!token) {
      Alert.alert('Error', 'Invalid reset link. Please request a new one.');
      return;
    }
    try {
      await resetPassword.mutateAsync({ token, password: data.password });
      Alert.alert('Success', 'Your password has been reset. You can now sign in.', [
        { text: 'OK', onPress: () => router.replace('/(auth)/sign-in') },
      ]);
    } catch {
      Alert.alert('Error', 'Failed to reset password. The link may have expired.');
    }
  });

  if (!token) {
    return (
      <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-center text-destructive">Invalid or missing reset token.</Text>
        <Text
          className="mt-4 text-primary underline"
          onPress={() => router.replace('/(auth)/forgot-password')}>
          Request new link
        </Text>
      </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
    <ScrollView contentContainerStyle={{ padding: 24 }} className="flex-1">
      <View className="gap-6 pt-12">
        <Text className="text-center text-2xl font-semibold">Reset Password</Text>
        <Text className="text-center text-muted-foreground">
          Enter your new password below.
        </Text>
        <View className="gap-4">
          <View className="gap-2">
            <Label>New Password</Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="New password (min 8 characters)"
                  secureTextEntry
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  editable={!resetPassword.isPending}
                />
              )}
            />
            {errors.password && (
              <Text className="text-destructive text-sm">{errors.password.message}</Text>
            )}
          </View>
          <Button onPress={onSubmit} disabled={resetPassword.isPending}>
            <Text>{resetPassword.isPending ? 'Resetting...' : 'Reset Password'}</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
