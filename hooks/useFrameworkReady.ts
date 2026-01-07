import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Prompt_400Regular,
  Prompt_500Medium,
  Prompt_600SemiBold,
  Prompt_700Bold,
} from '@expo-google-fonts/prompt';

SplashScreen.preventAutoHideAsync();

export function useFrameworkReady() {
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Prompt_400Regular,
    Prompt_500Medium,
    Prompt_600SemiBold,
    Prompt_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setIsReady(true);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return isReady;
}
