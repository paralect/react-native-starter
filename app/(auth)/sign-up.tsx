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
import { useSignUp } from '@/lib/auth';

const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const router = useRouter();
  const signUp = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp.mutateAsync(data);
      Alert.alert('Success', 'Please check your email to verify your account.', [
        { text: 'OK', onPress: () => router.replace('/(auth)/sign-in') },
      ]);
    } catch (err: unknown) {
      let message = 'Sign up failed';
      if (err && typeof err === 'object' && 'response' in err) {
        const res = (err as { response?: { data?: { errors?: Record<string, string[]> } } })
          .response?.data?.errors;
        if (res?.email) message = Array.isArray(res.email) ? res.email[0] : res.email;
        else if (res?.global) message = Array.isArray(res.global) ? res.global[0] : res.global;
      }
      Alert.alert('Error', message);
    }
  });

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
    <ScrollView contentContainerStyle={{ padding: 24 }} className="flex-1">
      <View className="gap-6 pt-12">
        <Text className="text-center text-2xl font-semibold">Sign Up</Text>
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
                  editable={!signUp.isPending}
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
                  editable={!signUp.isPending}
                />
              )}
            />
            {errors.lastName && (
              <Text className="text-destructive text-sm">{errors.lastName.message}</Text>
            )}
          </View>
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
                  editable={!signUp.isPending}
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
                  placeholder="Password (min 8 characters)"
                  secureTextEntry
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  editable={!signUp.isPending}
                />
              )}
            />
            {errors.password && (
              <Text className="text-destructive text-sm">{errors.password.message}</Text>
            )}
          </View>
          <Button onPress={onSubmit} disabled={signUp.isPending}>
            <Text>{signUp.isPending ? 'Signing up...' : 'Sign Up'}</Text>
          </Button>
        </View>
        <View className="flex-row items-center justify-center gap-2 pt-4">
          <Text className="text-muted-foreground">Already have an account?</Text>
          <Button variant="link" onPress={() => router.push('/(auth)/sign-in')} disabled={signUp.isPending}>
            <Text className="underline">Sign In</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
