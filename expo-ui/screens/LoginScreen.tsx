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
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import colors from '../theme/colors';

interface LoginScreenProps {
  onGoBack?: () => void;
  onLogin?: (email: string, password: string) => void;
  onGoogleLogin?: () => void;
  onBiometricLogin?: () => void;
  onForgotPassword?: () => void;
  onNavigateToSignUp?: () => void;
  biometricAvailable?: boolean;
  biometricType?: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  onGoBack,
  onLogin,
  onGoogleLogin,
  onBiometricLogin,
  onForgotPassword,
  onNavigateToSignUp,
  biometricAvailable = false,
  biometricType = 'Biometric',
}) => {
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

    // TODO: Connect Firebase - เรียก auth.signInWithEmailAndPassword
    setLoading(true);
    try {
      onLogin?.(formData.email, formData.password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
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

            <TouchableOpacity style={styles.forgotPassword} onPress={onForgotPassword}>
              <Text style={styles.forgotPasswordText}>ลืมรหัสผ่าน</Text>
            </TouchableOpacity>

            <Button onPress={handleSubmit} style={styles.submitButton} loading={loading} disabled={loading}>
              เข้าสู่ระบบ
            </Button>

            {biometricAvailable && (
              <Button 
                variant="outline" 
                style={styles.biometricButton} 
                onPress={onBiometricLogin}
              >
                <View style={styles.biometricButtonContent}>
                  <Ionicons name="finger-print" size={24} color={colors.primary} />
                  <Text style={styles.biometricButtonText}>เข้าสู่ระบบด้วย {biometricType}</Text>
                </View>
              </Button>
            )}

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>หรือ</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button variant="outline" style={styles.googleButton} onPress={onGoogleLogin}>
              <View style={styles.googleButtonContent}>
                <Ionicons name="logo-google" size={20} color={colors.foreground} />
                <Text style={styles.googleButtonText}>Sign in with Google</Text>
              </View>
            </Button>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>ยังไม่มีบัญชี? </Text>
              <TouchableOpacity onPress={onNavigateToSignUp}>
                <Text style={styles.signupLink}>ลงทะเบียน</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 14,
    color: colors.primary,
  },
  submitButton: {
    marginTop: 8,
    borderRadius: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray300,
  },
  dividerText: {
    fontFamily: 'Prompt_400Regular',
    paddingHorizontal: 16,
    color: colors.gray500,
    fontSize: 14,
  },
  biometricButton: {
    marginTop: 12,
    borderRadius: 8,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  biometricButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  biometricButtonText: {
    fontFamily: 'Prompt_500Medium',
    fontSize: 16,
    color: colors.primary,
  },
  googleButton: {
    borderRadius: 8,
    borderColor: colors.gray300,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  googleButtonText: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 16,
    color: colors.gray700,
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

export default LoginScreen;
