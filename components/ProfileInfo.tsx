import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '@/constants/Colors';

interface InfoItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

const MOCK_INFO_ITEMS: InfoItem[] = [
  { icon: 'mail', label: 'อีเมล', value: 'user@example.com' },
  { icon: 'call', label: 'เบอร์โทรศัพท์', value: '081-234-5678' },
  { icon: 'calendar', label: 'วันเกิด', value: '1 มกราคม 2533' },
  { icon: 'person', label: 'เพศ', value: 'ชาย' },
  { icon: 'briefcase', label: 'อาชีพ', value: 'พนักงานบริษัท' },
  { icon: 'location', label: 'ที่อยู่', value: '123 ถ.สุขุมวิท กรุงเทพฯ' },
];

interface ProfileInfoProps {
  onEditPress?: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ onEditPress }) => {
  const infoItems = MOCK_INFO_ITEMS;

  return (
    <View style={styles.container}>
      {infoItems.map((item, index) => (
        <View
          key={item.label}
          style={[
            styles.infoRow,
            index !== infoItems.length - 1 && styles.borderBottom,
          ]}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={16} color={colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
        <Ionicons name="pencil" size={16} color={colors.primary} />
        <Text style={styles.editButtonText}>แก้ไขข้อมูลส่วนตัว</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    gap: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 12,
    color: colors.mutedForeground,
  },
  value: {
    fontFamily: 'Prompt_500Medium',
    fontSize: 14,
    fontWeight: '500',
    color: colors.foreground,
    marginTop: 2,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 24,
  },
  editButtonText: {
    fontFamily: 'Prompt_500Medium',
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
});

export default ProfileInfo;
