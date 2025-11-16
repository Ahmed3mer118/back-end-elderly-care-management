# API Documentation - Elderly Care Management System

## Base URL
```
http://localhost:3000/api
```

## Response Format
جميع الردود تأتي بالتنسيق التالي:
```json
{
  "success": true/false,
  "data": {...},
  "message": "..."
}
```

---

## 1. Users API

### Get All Users
```http
GET /api/users
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "user_id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get User by ID
```http
GET /api/users/:id
```

### Create User
```http
POST /api/users
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123",
  "email": "user@example.com",
  "role": "family"
}
```

### Update User
```http
PUT /api/users/:id
Content-Type: application/json

{
  "username": "updateduser",
  "email": "updated@example.com",
  "role": "caregiver"
}
```

### Delete User
```http
DELETE /api/users/:id
```

---

## 2. Elderly API

### Get All Elderly
```http
GET /api/elderly
```

**Response includes:** User info, Appointments, Medications, Health Reports, Relatives, Assignments, Notifications

### Get Elderly by ID
```http
GET /api/elderly/:id
```

### Create Elderly
```http
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

### Update Elderly
```http
PUT /api/elderly/:id
Content-Type: application/json

{
  "full_name": "أحمد محمد علي",
  "health_condition": "محدث"
}
```

### Delete Elderly
```http
DELETE /api/elderly/:id
```

---

## 3. Appointments API

### Get All Appointments
```http
GET /api/appointments
```

### Get Appointments by Elderly ID
```http
GET /api/appointments/elderly/:elderlyId
```

### Create Appointment
```http
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

### Update Appointment
```http
PUT /api/appointments/:id
Content-Type: application/json

{
  "appointment_date": "2024-12-21 11:00:00",
  "purpose": "محدث"
}
```

### Delete Appointment
```http
DELETE /api/appointments/:id
```

---

## 4. Medications API

### Get All Medications
```http
GET /api/medications
```

### Get Medications by Elderly ID
```http
GET /api/medications/elderly/:elderlyId
```

### Create Medication
```http
POST /api/medications
Content-Type: application/json

{
  "elderly_id": 1,
  "medicine_name": "ميتفورمين",
  "dosage": "500 مجم",
  "frequency": "twice_daily",
  "start_date": "2024-01-01",
  "end_date": null
}
```

**Frequency Options:**
- `once_daily`
- `twice_daily`
- `thrice_daily`
- `four_times_daily`
- `as_needed`

### Update Medication
```http
PUT /api/medications/:id
```

### Delete Medication
```http
DELETE /api/medications/:id
```

---

## 5. Health Reports API

### Get All Health Reports
```http
GET /api/health-reports
```

### Get Health Reports by Elderly ID
```http
GET /api/health-reports/elderly/:elderlyId
```

### Create Health Report
```http
POST /api/health-reports
Content-Type: application/json

{
  "elderly_id": 1,
  "report_date": "2024-12-15",
  "blood_pressure": "120/80",
  "heart_rate": 72,
  "sugar_level": 95.5,
  "weight": 75.5,
  "notes": "الحالة مستقرة"
}
```

### Update Health Report
```http
PUT /api/health-reports/:id
```

### Delete Health Report
```http
DELETE /api/health-reports/:id
```

---

## 6. Relatives API

### Get All Relatives
```http
GET /api/relatives
```

### Get Relatives by Elderly ID
```http
GET /api/relatives/elderly/:elderlyId
```

### Create Relative
```http
POST /api/relatives
Content-Type: application/json

{
  "elderly_id": 1,
  "full_name": "محمد أحمد",
  "relation": "ابن",
  "phone": "01012345678",
  "email": "mohamed@example.com"
}
```

### Update Relative
```http
PUT /api/relatives/:id
```

### Delete Relative
```http
DELETE /api/relatives/:id
```

---

## 7. Assignments API

### Get All Assignments
```http
GET /api/assignments
```

### Get Assignments by Elderly ID
```http
GET /api/assignments/elderly/:elderlyId
```

### Create Assignment
```http
POST /api/assignments
Content-Type: application/json

{
  "elderly_id": 1,
  "nurse_id": 2,
  "start_date": "2024-01-01",
  "end_date": null
}
```

### Update Assignment
```http
PUT /api/assignments/:id
```

### Delete Assignment
```http
DELETE /api/assignments/:id
```

---

## 8. Notifications API

### Get All Notifications
```http
GET /api/notifications
```

### Get Notifications by Elderly ID
```http
GET /api/notifications/elderly/:elderlyId
```

### Create Notification
```http
POST /api/notifications
Content-Type: application/json

{
  "elderly_id": 1,
  "type": "reminder",
  "message": "تذكير: موعد الطبيب غداً",
  "status": "unread"
}
```

**Type Options:**
- `alert`
- `reminder`
- `info`
- `warning`

### Update Notification
```http
PUT /api/notifications/:id
```

### Mark Notification as Read
```http
PATCH /api/notifications/:id/read
```

### Delete Notification
```http
DELETE /api/notifications/:id
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error message"
}
```

---

## Notes

1. جميع التواريخ في التنسيق: `YYYY-MM-DD` أو `YYYY-MM-DD HH:mm:ss`
2. كلمات المرور مشفرة تلقائياً عند الإنشاء أو التحديث
3. عند حذف مسن، يتم حذف جميع البيانات المرتبطة به تلقائياً (CASCADE)
4. يمكن استخدام الفلاتر في المستقبل لإضافة pagination و search


