import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookingCard from '@/components/BookingCard';
import PromotionCarousel from '@/components/PromotionCarousel';
import StatCards from '@/components/StatCards';
import UpcomingBooking from '@/components/UpcomingBooking';
import WaveHeader from '@/components/WaveHeader';
import colors from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';

const MOCK_USER = {
  name: 'สมชาย ใจดี',
  username: 'somchai',
  profileImage: null as string | null,
};

const MOCK_UNREAD_COUNT = 3;

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const displayName = MOCK_USER.name || MOCK_USER.username || 'ผู้ใช้ใหม่';

  return (
    <View style={styles.container}>
      <WaveHeader height={180}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                {MOCK_USER.profileImage ? (
                  <Image source={{ uri: MOCK_USER.profileImage }} style={styles.avatar} />
                ) : (
                  <View style={[styles.avatar, styles.avatarPlaceholder]}>
                    <Text style={styles.avatarText}>{displayName.charAt(0).toUpperCase()}</Text>
                  </View>
                )}
              </TouchableOpacity>
              <View style={styles.greeting}>
                <Text style={styles.greetingText}>สวัสดี</Text>
                <Text style={styles.userName}>{displayName}!</Text>
                <Text style={styles.welcomeBack}>ยินดีต้อนรับกลับมา</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications" size={20} color={colors.white} />
              {MOCK_UNREAD_COUNT > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{MOCK_UNREAD_COUNT}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </WaveHeader>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <BookingCard onPress={() => router.push('/booking')} />
        <PromotionCarousel />
        <UpcomingBooking />
        <StatCards />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarPlaceholder: {
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'Prompt_700Bold',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  greeting: {
    gap: 2,
  },
  greetingText: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontFamily: 'Prompt_700Bold',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  welcomeBack: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.destructive,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: 'Prompt_700Bold',
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.white,
  },
  content: {
    flex: 1,
    marginTop: -24,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});
