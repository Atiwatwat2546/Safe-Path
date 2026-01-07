import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function BookingIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/booking/step1');
  }, []);

  return null;
}
