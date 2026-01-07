import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileInfo from '../components/ProfileInfo';
import WaveHeader from '../components/WaveHeader';
import colors from '../theme/colors';

// Mock data สำหรับโปรไฟล์
// TODO: Connect Firebase - แทนที่ด้วย Firestore query
const MOCK_PROFILE = {
  name: 'สมชาย ใจดี',
  username: 'somchai',
  email: 'somchai@example.com',
  phone: '081-234-5678',
  birthDate: '1 มกราคม 2533',
  gender: 'ชาย',
  address: '123 ถ.สุขุมวิท กรุงเทพฯ',
  profileImage: null as string | null,
};

interface ProfileScreenProps {
  onEditProfile?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onEditProfile }) => {
  const profile = MOCK_PROFILE;
  const displayName = profile?.name || profile?.username || profile?.email || 'ผู้ใช้ใหม่';

  return (
    <View style={styles.container}>
      <WaveHeader height={210}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            {profile?.profileImage ? (
              <Image source={{ uri: profile.profileImage }} style={styles.avatar} />
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

        <ProfileInfo onEditPress={onEditProfile} />
      </ScrollView>
    </View>
  );
};

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
});

export default ProfileScreen;
