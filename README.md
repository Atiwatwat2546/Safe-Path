# Safe-Path

แอปพลิเคชันจองบริการรับ-ส่งผู้ป่วย พัฒนาด้วย Expo Router และ Supabase

## คุณสมบัติหลัก

- Authentication ด้วย Supabase (Email/Password)
- จองบริการรับ-ส่งผู้ป่วย (4 ขั้นตอน)
- แสดงโปรโมชั่นและข้อมูลการจอง
- โปรไฟล์ผู้ใช้

## เทคโนโลยีที่ใช้

- **Expo Router** - File-based routing
- **Supabase** - Authentication และ Database
- **TypeScript** - Type safety
- **React Native Maps** - แสดงแผนที่
- **Expo Google Fonts** - ฟอนต์ Prompt

## การติดตั้ง

1. ติดตั้ง dependencies:
```bash
npm install
```

2. สร้างไฟล์ `.env` จาก `.env.example`:
```bash
cp .env.example .env
```

3. เพิ่มค่า Supabase ใน `.env`:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. รันโปรเจค:
```bash
npm start
```

## โครงสร้างโปรเจค

```
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Home screen
│   │   └── profile.tsx    # Profile screen
│   ├── booking/           # Booking flow (4 steps)
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Initial screen
│   ├── welcome.tsx        # Welcome screen
│   ├── login.tsx          # Login screen
│   └── signup.tsx         # Sign up screen
├── components/            # UI Components
│   ├── ui/               # Base components
│   └── ...               # Feature components
├── constants/            # Colors, etc.
├── hooks/                # Custom hooks
├── lib/                  # Libraries (Supabase)
└── types/                # TypeScript types
```

## Authentication

โปรเจคใช้ Supabase Authentication โดยผู้ใช้สามารถ:
- ลงทะเบียนด้วยอีเมล/รหัสผ่าน
- เข้าสู่ระบบ
- ออกจากระบบ

## Booking Flow

1. **Step 1**: เลือกสถานที่ต้นทางและปลายทาง
2. **Step 2**: เลือกวันและเวลา
3. **Step 3**: เลือกผู้โดยสารและอุปกรณ์
4. **Step 4**: สรุปการจองและยืนยัน

## หมายเหตุ

- ข้อมูลใน components ยังเป็น mock data
- ต้องเชื่อมต่อกับ Supabase database เพื่อบันทึกข้อมูลจริง
- แผนที่ใช้ mock locations สำหรับโรงพยาบาล
