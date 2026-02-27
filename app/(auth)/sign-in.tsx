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
import { useSignIn } from '@/lib/auth';

const signInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignInScreen() {
  const router = useRouter();
  const signIn = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signIn.mutateAsync(data);
      router.replace('/(tabs)');
    } catch (err: unknown) {
      let message = 'Sign in failed';
      if (err && typeof err === 'object') {
        const axiosErr = err as {
          response?: { data?: { errors?: Record<string, string | string[]> } };
          message?: string;
          code?: string;
        };
        const res = axiosErr.response?.data?.errors;
        if (res?.credentials) {
          message = Array.isArray(res.credentials) ? res.credentials[0] : String(res.credentials);
        } else if (res?.email) {
          message = Array.isArray(res.email) ? res.email[0] : String(res.email);
        } else if (res?.global) {
          message = Array.isArray(res.global) ? res.global[0] : String(res.global);
        } else if (!axiosErr.response && axiosErr.message) {
          message =
            axiosErr.code === 'ECONNREFUSED' || axiosErr.code === 'ERR_NETWORK'
              ? 'Cannot connect to server. Check that the API is running and EXPO_PUBLIC_API_URL is correct.'
              : axiosErr.message;
        }
      }
      Alert.alert('Error', message);
    }
  });

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
    <ScrollView contentContainerStyle={{ padding: 24 }} className="flex-1">
      <View className="gap-6 pt-12">
        <Text className="text-center text-2xl font-semibold">Sign In</Text>
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
                  editable={!signIn.isPending}
                />
              )}
            />
            {errors.email && (
              <Text className="text-destructive text-sm">{errors.email.message}</Text>
            )}
          </View>
          <View className="gap-2">
            <Label>Password</Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Password"
                  secureTextEntry
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  editable={!signIn.isPending}
                />
              )}
            />
            {errors.password && (
              <Text className="text-destructive text-sm">{errors.password.message}</Text>
            )}
          </View>
          <Button
            variant="link"
            className="self-end"
            onPress={() => router.push('/(auth)/forgot-password')}
            disabled={signIn.isPending}>
            <Text>Forgot Password?</Text>
          </Button>
          <Button onPress={onSubmit} disabled={signIn.isPending}>
            <Text>{signIn.isPending ? 'Signing in...' : 'Sign In'}</Text>
          </Button>
        </View>
        <View className="flex-row items-center justify-center gap-2 pt-4">
          <Text className="text-muted-foreground">Don&apos;t have an account?</Text>
          <Button variant="link" onPress={() => router.push('/(auth)/sign-up')} disabled={signIn.isPending}>
            <Text className="underline">Sign Up</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
