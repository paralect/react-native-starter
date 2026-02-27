import { Redirect, useSegments } from 'expo-router';
import { View } from 'react-native';
import { useAccount } from '@/lib/auth';

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { data: user, isLoading } = useAccount();
  const segments = useSegments();

  const isAuthRoute = segments[0] === '(auth)';
  const isTabsRoute = segments[0] === '(tabs)';

  if (isLoading) {
    return <View className="flex-1 bg-background" />;
  }

  if (!user && isTabsRoute) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (user && isAuthRoute) {
    return <Redirect href="/(tabs)" />;
  }

  return <>{children}</>;
}
