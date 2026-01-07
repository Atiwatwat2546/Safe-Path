import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Region } from 'react-native-maps';
import Button from '@/components/ui/Button';
import colors from '@/constants/Colors';

const MOCK_HOSPITALS = [
  {
    id: '1',
    name: 'โรงพยาบาลศิริราช',
    address: 'แขวงศิริราช เขตบางกอกน้อย กรุงเทพฯ',
    lat: 13.7584,
    lng: 100.4865,
  },
  {
    id: '2',
    name: 'โรงพยาบาลจุฬาลงกรณ์',
    address: 'แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ',
    lat: 13.7326,
    lng: 100.5327,
  },
  {
    id: '3',
    name: 'โรงพยาบาลรามาธิบดี',
    address: 'แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพฯ',
    lat: 13.7596,
    lng: 100.5299,
  },
];

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

const { width } = Dimensions.get('window');

export default function Booking1Screen() {
  const router = useRouter();
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [fromLocation, setFromLocation] = useState<Location | null>(null);
  const [toLocation, setToLocation] = useState<Location | null>(null);
  const [fromSuggestions, setFromSuggestions] = useState<typeof MOCK_HOSPITALS>([]);
  const [toSuggestions, setToSuggestions] = useState<typeof MOCK_HOSPITALS>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [region] = useState<Region>({
    latitude: 13.7563,
    longitude: 100.5018,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const searchHospitals = (query: string, isOrigin: boolean) => {
    if (query.length < 2) {
      if (isOrigin) {
        setFromSuggestions([]);
        setShowFromSuggestions(false);
      } else {
        setToSuggestions([]);
        setShowToSuggestions(false);
      }
      return;
    }

    const filtered = MOCK_HOSPITALS.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(query.toLowerCase()) ||
        hospital.address.toLowerCase().includes(query.toLowerCase())
    );

    if (isOrigin) {
      setFromSuggestions(filtered);
      setShowFromSuggestions(filtered.length > 0);
    } else {
      setToSuggestions(filtered);
      setShowToSuggestions(filtered.length > 0);
    }
  };

  const selectHospital = (hospital: typeof MOCK_HOSPITALS[0], isOrigin: boolean) => {
    const location: Location = {
      lat: hospital.lat,
      lng: hospital.lng,
      address: `${hospital.name}, ${hospital.address}`,
    };

    if (isOrigin) {
      setFromLocation(location);
      setFromAddress(`${hospital.name}, ${hospital.address}`);
      setShowFromSuggestions(false);
    } else {
      setToLocation(location);
      setToAddress(`${hospital.name}, ${hospital.address}`);
      setShowToSuggestions(false);
    }
  };

  const handleNext = () => {
    if (!fromAddress || !toAddress) {
      Alert.alert('แจ้งเตือน', 'กรุณาระบุสถานที่ต้นทางและปลายทาง');
      return;
    }

    router.push('/booking/step2');
  };

  const steps = [
    { number: 1, active: true },
    { number: 2, active: false },
    { number: 3, active: false },
    { number: 4, active: false },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>จองบริการ</Text>
      </View>

      <View style={styles.stepsContainer}>
        {steps.map((step) => (
          <View key={step.number} style={[styles.step, step.active && styles.stepActive]}>
            <Text style={[styles.stepText, step.active && styles.stepTextActive]}>
              {step.number}
            </Text>
          </View>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.mapContainer}>
          <MapView style={styles.map} region={region}>
            {fromLocation && (
              <Marker
                coordinate={{ latitude: fromLocation.lat, longitude: fromLocation.lng }}
                title="ต้นทาง"
                pinColor={colors.success}
              />
            )}
            {toLocation && (
              <Marker
                coordinate={{ latitude: toLocation.lat, longitude: toLocation.lng }}
                title="ปลายทาง"
                pinColor={colors.destructive}
              />
            )}
          </MapView>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>จาก (ต้นทาง)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="location" size={20} color={colors.success} />
              <TextInput
                style={styles.input}
                placeholder="ค้นหาสถานที่ต้นทาง"
                value={fromAddress}
                onChangeText={(text) => {
                  setFromAddress(text);
                  searchHospitals(text, true);
                }}
              />
            </View>
            {showFromSuggestions && (
              <FlatList
                data={fromSuggestions}
                keyExtractor={(item) => item.id}
                style={styles.suggestions}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => selectHospital(item, true)}
                  >
                    <Ionicons name="medical" size={16} color={colors.primary} />
                    <View style={styles.suggestionText}>
                      <Text style={styles.suggestionName}>{item.name}</Text>
                      <Text style={styles.suggestionAddress}>{item.address}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>ถึง (ปลายทาง)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="location" size={20} color={colors.destructive} />
              <TextInput
                style={styles.input}
                placeholder="ค้นหาสถานที่ปลายทาง"
                value={toAddress}
                onChangeText={(text) => {
                  setToAddress(text);
                  searchHospitals(text, false);
                }}
              />
            </View>
            {showToSuggestions && (
              <FlatList
                data={toSuggestions}
                keyExtractor={(item) => item.id}
                style={styles.suggestions}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => selectHospital(item, false)}
                  >
                    <Ionicons name="medical" size={16} color={colors.primary} />
                    <View style={styles.suggestionText}>
                      <Text style={styles.suggestionName}>{item.name}</Text>
                      <Text style={styles.suggestionAddress}>{item.address}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>

          <Button onPress={handleNext} style={styles.nextButton}>
            ต่อไป
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  step: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepActive: {
    backgroundColor: colors.primary,
  },
  stepText: {
    fontFamily: 'Prompt_600SemiBold',
    fontSize: 16,
    fontWeight: '600',
    color: colors.mutedForeground,
  },
  stepTextActive: {
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    height: 200,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    padding: 16,
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontFamily: 'Prompt_500Medium',
    fontSize: 14,
    fontWeight: '500',
    color: colors.foreground,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontFamily: 'Prompt_400Regular',
    fontSize: 16,
    color: colors.foreground,
  },
  suggestions: {
    maxHeight: 200,
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  suggestionText: {
    flex: 1,
  },
  suggestionName: {
    fontFamily: 'Prompt_500Medium',
    fontSize: 14,
    color: colors.foreground,
  },
  suggestionAddress: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 12,
    color: colors.mutedForeground,
  },
  nextButton: {
    marginTop: 16,
  },
});
