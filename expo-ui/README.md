# Expo UI Components

โฟลเดอร์นี้มี UI components สำหรับใช้ในโปรเจค Expo ใหม่

## โครงสร้าง

```
expo-ui/
├── components/          # UI Components
│   ├── ui/             # Base UI (Button, Input)
│   ├── BookingCard.tsx
│   ├── ProfileInfo.tsx
│   ├── PromotionCarousel.tsx
│   ├── StatCards.tsx
│   ├── UpcomingBooking.tsx
│   └── WaveHeader.tsx
├── screens/            # หน้าจอต่างๆ
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── SignUpScreen.tsx
│   ├── WelcomeScreen.tsx
│   └── Booking1-4Screen.tsx
├── theme/              # Theme configuration
│   └── colors.ts
└── navigation/         # Navigation types
    └── types.ts
```

## การใช้งาน

1. Copy โฟลเดอร์ `expo-ui/` ไปยังโปรเจค Expo ใหม่
2. ติดตั้ง dependencies ที่จำเป็น:
   ```bash
   npx expo install @expo/vector-icons react-native-svg react-native-safe-area-context @react-navigation/native @react-navigation/native-stack @react-native-community/datetimepicker expo-location react-native-maps
   ```
3. ติดตั้งฟอนต์ Prompt:
   ```bash
   npx expo install @expo-google-fonts/prompt expo-font
   ```
4. เชื่อมต่อ Firebase ตามจุดที่มี `// TODO: Connect Firebase` ในโค้ด

## Mock Data

ทุก component ใช้ mock data แทน Firebase เพื่อให้คุณเชื่อมต่อได้ถูกจุด:
- `MOCK_USER` - ข้อมูลผู้ใช้
- `MOCK_BOOKINGS` - ข้อมูลการจอง
- `MOCK_NOTIFICATIONS` - ข้อมูลการแจ้งเตือน

## จุดที่ต้องเชื่อม Firebase

ค้นหา `// TODO: Connect Firebase` ในไฟล์เพื่อดูจุดที่ต้องเชื่อมต่อ Firebase
