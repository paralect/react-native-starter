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
import { useForgotPassword } from '@/lib/auth';

const schema = z.object({
  email: z.string().email('Invalid email'),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const forgotPassword = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await forgotPassword.mutateAsync(data);
      Alert.alert('Success', 'Password reset email sent. Please check your inbox.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert('Error', 'Failed to send reset email. Please try again.');
    }
  });

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
    <ScrollView contentContainerStyle={{ padding: 24 }} className="flex-1">
      <View className="gap-6 pt-12">
        <Text className="text-center text-2xl font-semibold">Forgot Password</Text>
        <Text className="text-center text-muted-foreground">
          Enter your email address and we will send you a link to reset your password.
        </Text>
        <View className="gap-4">
          <View className="gap-2">
            <Label>Email</Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  editable={!forgotPassword.isPending}
                />
              )}
            />
            {errors.email && (
              <Text className="text-destructive text-sm">{errors.email.message}</Text>
            )}
          </View>
          <Button onPress={onSubmit} disabled={forgotPassword.isPending}>
            <Text>{forgotPassword.isPending ? 'Sending...' : 'Send Reset Link'}</Text>
          </Button>
        </View>
        <Button variant="link" onPress={() => router.back()} disabled={forgotPassword.isPending}>
          <Text>Back to Sign In</Text>
        </Button>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
