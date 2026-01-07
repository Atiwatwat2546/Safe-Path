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

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('กรุณากรอกข้อมูล', 'กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        Alert.alert('เข้าสู่ระบบไม่สำเร็จ', error.message);
      } else {
        router.replace('/(tabs)');
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
        <Text style={styles.headerTitle}>เข้าสู่ระบบ</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>เข้าสู่ระบบบัญชีของคุณ</Text>
            <Text style={styles.subtitle}>กรอกข้อมูลเพื่อเข้าสู่ระบบ</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="อีเมล"
              placeholder="กรอกอีเมลของคุณ"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="รหัสผ่าน"
              placeholder="กรอกรหัสผ่านของคุณ"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
            />

            <Button
              onPress={handleSubmit}
              style={styles.submitButton}
              loading={loading}
              disabled={loading}
            >
              เข้าสู่ระบบ
            </Button>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>ยังไม่มีบัญชี? </Text>
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={styles.signupLink}>ลงทะเบียน</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray800,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 14,
    color: colors.gray500,
  },
  form: {
    gap: 8,
  },
  submitButton: {
    marginTop: 16,
    borderRadius: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  signupText: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 14,
    color: colors.gray600,
  },
  signupLink: {
    fontFamily: 'Prompt_500Medium',
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
});
