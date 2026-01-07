import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/ui/Button';
import colors from '../theme/colors';

interface WelcomeScreenProps {
  onLogin?: () => void;
  onSignUp?: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLogin, onSignUp }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>welcome</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          variant="outline"
          onPress={onLogin}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </View>
        </Button>

        <Button onPress={onSignUp} style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonTextWhite}>ลงทะเบียน</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.white} />
          </View>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontFamily: 'Prompt_500Medium',
    fontSize: 24,
    fontWeight: '500',
    color: colors.gray800,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 16,
  },
  button: {
    width: '100%',
    height: 48,
    borderRadius: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
  },
  buttonText: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 16,
    color: colors.primary,
  },
  buttonTextWhite: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 16,
    color: colors.white,
  },
});

export default WelcomeScreen;
