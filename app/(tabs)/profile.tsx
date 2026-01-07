import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileInfo from '@/components/ProfileInfo';
import WaveHeader from '@/components/WaveHeader';
import Button from '@/components/ui/Button';
import colors from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';

const MOCK_PROFILE = {
  name: 'สมชาย ใจดี',
  username: 'somchai',
  email: 'somchai@example.com',
  phone: '081-234-5678',
  profileImage: null as string | null,
};

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const displayName = MOCK_PROFILE.name || MOCK_PROFILE.username || MOCK_PROFILE.email || 'ผู้ใช้ใหม่';

  const handleSignOut = async () => {
    Alert.alert(
      'ออกจากระบบ',
      'คุณต้องการออกจากระบบหรือไม่?',
      [
        { text: 'ยกเลิก', style: 'cancel' },
        {
          text: 'ออกจากระบบ',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/welcome');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <WaveHeader height={210}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            {MOCK_PROFILE.profileImage ? (
              <Image source={{ uri: MOCK_PROFILE.profileImage }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>{displayName.charAt(0).toUpperCase()}</Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      </WaveHeader>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.nameContainer}>
          <View style={styles.nameBadge}>
            <Text style={styles.name}>{displayName}</Text>
          </View>
        </View>

        <ProfileInfo />

        <Button
          variant="destructive"
          onPress={handleSignOut}
          style={styles.signOutButton}
        >
          ออกจากระบบ
        </Button>
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
    alignItems: 'center',
    paddingTop: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarPlaceholder: {
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'Prompt_700Bold',
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
  },
  content: {
    flex: 1,
    marginTop: -24,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  nameBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  name: {
    fontFamily: 'Prompt_700Bold',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  signOutButton: {
    marginTop: 24,
  },
});
