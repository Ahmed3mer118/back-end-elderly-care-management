# دليل حل مشاكل الاتصال بقاعدة البيانات

## مشاكل شائعة وحلولها

### 1. خطأ في الاتصال بقاعدة البيانات البعيدة (Remote Database)

#### المشكلة:
```
❌ Unable to connect to the database
Error: connect ECONNREFUSED
```

#### الحلول:

**أ) التحقق من بيانات الاتصال:**
- تأكد من صحة اسم المستخدم وكلمة المرور
- تأكد من صحة اسم قاعدة البيانات
- تأكد من صحة الـ Host والـ Port

**ب) للاتصال بقاعدة بيانات alwaysdata.net:**
```javascript
// في ملف .env
DB_HOST=mysql-reem_earderlycaremanagementsystem.alwaysdata.net
DB_PORT=3307
DB_NAME=reem_earderlycaremanagementsystem
DB_USER=reem@2a00:b6e0:1:210:1::1
DB_PASSWORD=your_password
```

**ج) التحقق من IP Whitelist:**
- في alwaysdata.net، تأكد من إضافة IP السيرفر إلى قائمة المسموح بها
- أو استخدم `%` للسماح من أي IP (غير آمن للإنتاج)

### 2. مشكلة SSL/TLS

#### المشكلة:
```
Error: SSL connection is required
```

#### الحل:
تم إضافة إعدادات SSL في `config/database.js`:
```javascript
dialectOptions: {
  ssl: {
    require: false,
    rejectUnauthorized: false
  }
}
```

### 3. مشكلة Timeout

#### المشكلة:
```
Error: Connection timeout
```

#### الحل:
تم زيادة timeout في الإعدادات:
```javascript
dialectOptions: {
  connectTimeout: 60000,
  timeout: 60000
},
pool: {
  acquire: 60000
}
```

### 4. اختبار الاتصال

#### استخدم ملف الاختبار:
```bash
npm run test-db
```

أو:
```bash
node test-db-connection.js
```

### 5. التحقق من إعدادات alwaysdata.net

1. **دخول لوحة التحكم:**
   - اذهب إلى alwaysdata.net
   - سجل الدخول
   - اذهب إلى MySQL databases

2. **التحقق من البيانات:**
   - اسم قاعدة البيانات
   - اسم المستخدم
   - كلمة المرور
   - Host (عادة: mysql-username.alwaysdata.net)
   - Port (عادة: 3307)

3. **التحقق من IP Whitelist:**
   - في إعدادات قاعدة البيانات
   - أضف IP السيرفر أو استخدم `%`

### 6. مشاكل خاصة بـ IPv6

إذا كان اسم المستخدم يحتوي على IPv6 (مثل: `reem@2a00:b6e0:1:210:1::1`):

- تأكد من استخدام الـ Host الصحيح
- قد تحتاج إلى استخدام IPv4 بدلاً من IPv6

### 7. استخدام ملف .env

**إنشاء ملف .env:**
```env
DB_HOST=mysql-reem_earderlycaremanagementsystem.alwaysdata.net
DB_PORT=3307
DB_NAME=reem_earderlycaremanagementsystem
DB_USER=reem@2a00:b6e0:1:210:1::1
DB_PASSWORD=s8fE5Rai2B#!HTW
PORT=3000
NODE_ENV=production
```

**ملاحظات:**
- لا ترفع ملف `.env` على GitHub
- استخدم متغيرات البيئة في السيرفر
- تأكد من أن `.env` موجود في نفس مجلد `server.js`

### 8. مشاكل في السيرفر (Hosting)

إذا كان السيرفر على hosting:

1. **التحقق من Node.js version:**
   ```bash
   node --version
   ```
   يجب أن يكون v14 أو أحدث

2. **التحقق من الحزم:**
   ```bash
   npm install
   ```

3. **التحقق من Port:**
   - بعض hosting providers يستخدمون port محدد
   - استخدم `process.env.PORT` في الكود

4. **التحقق من Logs:**
   - راجع logs السيرفر لمعرفة الأخطاء
   - في alwaysdata.net: Logs > Application logs

### 9. خطوات التشخيص

1. **اختبار الاتصال:**
   ```bash
   npm run test-db
   ```

2. **فحص البيانات:**
   - تأكد من صحة جميع البيانات في `.env`
   - جرب الاتصال من MySQL client

3. **فحص الشبكة:**
   - تأكد من أن السيرفر يمكنه الوصول إلى قاعدة البيانات
   - جرب ping للـ host

4. **فحص Firewall:**
   - تأكد من أن Port 3307 مفتوح
   - تحقق من إعدادات Firewall

### 10. الحصول على مساعدة

إذا استمرت المشكلة:

1. راجع logs السيرفر
2. راجع logs قاعدة البيانات
3. تحقق من رسائل الخطأ الكاملة
4. تأكد من إعدادات alwaysdata.net

## أمثلة على رسائل الخطأ الشائعة

### Error: Access denied
**السبب:** بيانات خاطئة (username/password)
**الحل:** تحقق من بيانات الاتصال

### Error: Unknown database
**السبب:** اسم قاعدة البيانات خاطئ
**الحل:** تحقق من اسم قاعدة البيانات

### Error: connect ECONNREFUSED
**السبب:** Host أو Port خاطئ، أو Firewall
**الحل:** تحقق من Host و Port وإعدادات Firewall

### Error: Connection timeout
**السبب:** بطء في الاتصال أو Firewall
**الحل:** زيادة timeout أو فحص Firewall


