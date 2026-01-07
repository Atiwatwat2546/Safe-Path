import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import colors from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('กรุณากรอกข้อมูล', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('รหัสผ่านไม่ตรงกัน', 'กรุณาตรวจสอบรหัสผ่านอีกครั้ง');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(formData.email, formData.password);
      if (error) {
        Alert.alert('สมัครสมาชิกไม่สำเร็จ', error.message);
      } else {
        Alert.alert(
          'สมัครสมาชิกสำเร็จ',
          'กรุณาเข้าสู่ระบบ',
          [{ text: 'ตกลง', onPress: () => router.replace('/login') }]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>สร้างบัญชี</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>โปรดกรอกข้อมูลเพื่อสร้างบัญชี</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="ชื่อ-นามสกุล"
              placeholder="กรอกชื่อ-นามสกุลของคุณ"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />

            <Input
              label="อีเมล"
              placeholder="กรอกอีเมลของคุณ"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="เบอร์โทร"
              placeholder="+66 123 456 789"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />

            <Input
              label="รหัสผ่าน"
              placeholder="กรอกรหัสผ่านของคุณ"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
            />

            <Input
              label="ยืนยันรหัสผ่าน"
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              secureTextEntry
            />

            <Text style={styles.disclaimer}>
              ข้อมูลของคุณจะถูกเก็บรักษาอย่างปลอดภัย
            </Text>

            <Button
              onPress={handleSubmit}
              style={styles.submitButton}
              loading={loading}
              disabled={loading}
            >
              สร้างบัญชี
            </Button>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>มีบัญชีอยู่แล้ว? </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.loginLink}>เข้าสู่ระบบ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontFamily: 'Prompt_600SemiBold',
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Prompt_700Bold',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray800,
  },
  form: {
    gap: 8,
  },
  disclaimer: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 14,
    color: colors.gray600,
    marginTop: 8,
    marginBottom: 16,
  },
  submitButton: {
    borderRadius: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  loginText: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 14,
    color: colors.gray600,
  },
  loginLink: {
    fontFamily: 'Prompt_500Medium',
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
});
