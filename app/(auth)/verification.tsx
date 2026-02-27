import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { useVerifyEmail } from '@/lib/auth';

export default function VerificationScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams<{ token?: string }>();
  const verifyEmail = useVerifyEmail();

  useEffect(() => {
    if (token && !verifyEmail.isPending && !verifyEmail.isSuccess) {
      verifyEmail.mutate(token);
    }
  }, [token]);

  useEffect(() => {
    if (verifyEmail.isSuccess) {
      router.replace('/(tabs)');
    }
  }, [verifyEmail.isSuccess, router]);

  if (verifyEmail.isError) {
    return (
      <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-center text-destructive">Token is invalid or expired.</Text>
        <Text
          className="mt-4 text-primary underline"
          onPress={() => router.replace('/(auth)/sign-in')}>
          Back to Sign In
        </Text>
      </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
    <View className="flex-1 items-center justify-center p-8">
      <ActivityIndicator size="large" />
      <Text className="mt-4 text-muted-foreground">Verifying your email...</Text>
    </View>
    </SafeAreaView>
  );
}
