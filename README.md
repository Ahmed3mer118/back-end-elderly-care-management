# Elderly Care Management System - Backend API

نظام إدارة رعاية المسنين - واجهة برمجة التطبيقات (API)

## 📋 الوصف

هذا المشروع هو Backend API لنظام إدارة رعاية المسنين. يوفر واجهة برمجة تطبيقات كاملة لإدارة:
- المستخدمين (Users)
- بيانات المسنين (Elderly)
- المواعيد (Appointments)
- الأدوية (Medications)
- التقارير الصحية (Health Reports)
- الأقارب (Relatives)
- المهام/التكليفات (Assignments)
- الإشعارات (Notifications)

## 🚀 البدء السريع

### المتطلبات الأساسية

- Node.js (v14 أو أحدث)
- MySQL (v5.7 أو أحدث)
- npm أو yarn

### التثبيت

1. **استنساخ المشروع أو الانتقال إلى المجلد**
```bash
cd Back-end
```

2. **تثبيت الحزم**
```bash
npm install
```

3. **إعداد ملف البيئة**
```bash
# انسخ ملف .env.example إلى .env
# ثم عدل البيانات حسب إعدادات قاعدة البيانات الخاصة بك
```

4. **إعداد ملف .env**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=elderly_care_db
DB_PORT=3306
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key
```

5. **إنشاء قاعدة البيانات**
```sql
CREATE DATABASE elderly_care_db;
```

6. **تشغيل السيرفر**
```bash
# للتطوير (مع nodemon)
npm run dev

# للإنتاج
npm start
```

السيرفر سيعمل على `http://localhost:3000`

## 📁 هيكل المشروع

```
Back-end/
├── config/
│   └── database.js          # إعدادات قاعدة البيانات
├── controllers/
│   ├── userController.js
│   ├── elderlyController.js
│   ├── appointmentController.js
│   ├── medicationController.js
│   ├── healthReportController.js
│   ├── relativeController.js
│   ├── assignmentController.js
│   └── notificationController.js
├── models/
│   ├── User.js
│   ├── Elderly.js
│   ├── Appointment.js
│   ├── Medication.js
│   ├── HealthReport.js
│   ├── Relative.js
│   ├── Assignment.js
│   └── Notification.js
├── routes/
│   ├── userRoutes.js
│   ├── elderlyRoutes.js
│   ├── appointmentRoutes.js
│   ├── medicationRoutes.js
│   ├── healthReportRoutes.js
│   ├── relativeRoutes.js
│   ├── assignmentRoutes.js
│   └── notificationRoutes.js
├── server.js                 # ملف السيرفر الرئيسي
├── package.json
└── README.md
```

## 🔌 API Endpoints

### المستخدمين (Users)
- `GET /api/users` - جلب جميع المستخدمين
- `GET /api/users/:id` - جلب مستخدم محدد
- `POST /api/users` - إنشاء مستخدم جديد
- `PUT /api/users/:id` - تحديث مستخدم
- `DELETE /api/users/:id` - حذف مستخدم

### المسنين (Elderly)
- `GET /api/elderly` - جلب جميع المسنين
- `GET /api/elderly/:id` - جلب مسن محدد
- `POST /api/elderly` - إضافة مسن جديد
- `PUT /api/elderly/:id` - تحديث بيانات مسن
- `DELETE /api/elderly/:id` - حذف مسن

### المواعيد (Appointments)
- `GET /api/appointments` - جلب جميع المواعيد
- `GET /api/appointments/:id` - جلب موعد محدد
- `GET /api/appointments/elderly/:elderlyId` - جلب مواعيد مسن محدد
- `POST /api/appointments` - إنشاء موعد جديد
- `PUT /api/appointments/:id` - تحديث موعد
- `DELETE /api/appointments/:id` - حذف موعد

### الأدوية (Medications)
- `GET /api/medications` - جلب جميع الأدوية
- `GET /api/medications/:id` - جلب دواء محدد
- `GET /api/medications/elderly/:elderlyId` - جلب أدوية مسن محدد
- `POST /api/medications` - إضافة دواء جديد
- `PUT /api/medications/:id` - تحديث دواء
- `DELETE /api/medications/:id` - حذف دواء

### التقارير الصحية (Health Reports)
- `GET /api/health-reports` - جلب جميع التقارير
- `GET /api/health-reports/:id` - جلب تقرير محدد
- `GET /api/health-reports/elderly/:elderlyId` - جلب تقارير مسن محدد
- `POST /api/health-reports` - إضافة تقرير جديد
- `PUT /api/health-reports/:id` - تحديث تقرير
- `DELETE /api/health-reports/:id` - حذف تقرير

### الأقارب (Relatives)
- `GET /api/relatives` - جلب جميع الأقارب
- `GET /api/relatives/:id` - جلب قريب محدد
- `GET /api/relatives/elderly/:elderlyId` - جلب أقارب مسن محدد
- `POST /api/relatives` - إضافة قريب جديد
- `PUT /api/relatives/:id` - تحديث قريب
- `DELETE /api/relatives/:id` - حذف قريب

### المهام (Assignments)
- `GET /api/assignments` - جلب جميع المهام
- `GET /api/assignments/:id` - جلب مهمة محددة
- `GET /api/assignments/elderly/:elderlyId` - جلب مهام مسن محدد
- `POST /api/assignments` - إنشاء مهمة جديدة
- `PUT /api/assignments/:id` - تحديث مهمة
- `DELETE /api/assignments/:id` - حذف مهمة

### الإشعارات (Notifications)
- `GET /api/notifications` - جلب جميع الإشعارات
- `GET /api/notifications/:id` - جلب إشعار محدد
- `GET /api/notifications/elderly/:elderlyId` - جلب إشعارات مسن محدد
- `POST /api/notifications` - إنشاء إشعار جديد
- `PUT /api/notifications/:id` - تحديث إشعار
- `PATCH /api/notifications/:id/read` - تحديد الإشعار كمقروء
- `DELETE /api/notifications/:id` - حذف إشعار

## 📝 أمثلة على الطلبات

### إنشاء مستخدم جديد
```bash
POST /api/users
Content-Type: application/json

{
  "username": "admin",
  "password": "password123",
  "email": "admin@example.com",
  "role": "admin"
}
```

### إضافة مسن جديد
```bash
POST /api/elderly
Content-Type: application/json

{
  "full_name": "أحمد محمد",
  "birth_date": "1940-05-15",
  "gender": "male",
  "health_condition": "سكري وضغط",
  "blood_type": "A+",
  "address": "القاهرة، مصر",
  "emergency_contact": "01234567890",
  "users_user_id": 1
}
```

### إضافة موعد
```bash
POST /api/appointments
Content-Type: application/json

{
  "elderly_id": 1,
  "doctor_id": 1,
  "appointment_date": "2024-12-20 10:00:00",
  "purpose": "فحص دوري",
  "notes": "مراجعة نتائج التحاليل"
}
```

## 🛠️ التقنيات المستخدمة

- **Express.js** - إطار عمل Node.js
- **Sequelize** - ORM لقاعدة البيانات
- **MySQL2** - محرك قاعدة البيانات
- **bcryptjs** - تشفير كلمات المرور
- **CORS** - تمكين الطلبات من الفرونت إند
- **dotenv** - إدارة متغيرات البيئة

## 📦 الحزم المثبتة

```json
{
  "express": "^4.18.2",
  "mysql2": "^3.6.5",
  "sequelize": "^6.35.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2"
}
```

## 🔒 الأمان

- كلمات المرور مشفرة باستخدام bcrypt
- دعم JWT للمصادقة (جاهز للتطوير)
- CORS مفعل للاتصال مع الفرونت إند

## 📄 الترخيص

ISC

## 👨‍💻 الدعم

للمساعدة أو الاستفسارات، يرجى فتح issue في المشروع.

