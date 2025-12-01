-- Sample Data for Testing
USE elderly_care_db;

-- Insert Sample Users
INSERT INTO users (username, password, email, role) VALUES
('admin', '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', 'admin@example.com', 'admin'),
('nurse1', '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', 'nurse1@example.com', 'nurse'),
('family1', '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', 'family1@example.com', 'family');

-- Insert Sample Elderly (Note: users_user_id should match existing user_id)
INSERT INTO elderly (full_name, birth_date, gender, health_condition, blood_type, address, emergency_contact, users_user_id) VALUES
('أحمد محمد علي', '1940-05-15', 'male', 'سكري وضغط', 'A+', 'القاهرة، مصر', '01234567890', 3),
('فاطمة حسن', '1935-08-20', 'female', 'هشاشة عظام', 'O+', 'الإسكندرية، مصر', '01123456789', 3);

-- Insert Sample Appointments
INSERT INTO appointments (elderly_id, doctor_id, appointment_date, purpose, notes) VALUES
(1, 1, '2024-12-20 10:00:00', 'فحص دوري', 'مراجعة نتائج التحاليل'),
(1, 1, '2024-12-27 14:00:00', 'متابعة السكري', 'فحص السكر التراكمي'),
(2, 1, '2024-12-22 11:00:00', 'فحص عام', 'فحص شامل');

-- Insert Sample Medications
INSERT INTO medications (elderly_id, medicine_name, dosage, frequency, start_date, end_date) VALUES
(1, 'ميتفورمين', '500 مجم', 'twice_daily', '2024-01-01', NULL),
(1, 'أسبرين', '100 مجم', 'once_daily', '2024-01-01', NULL),
(2, 'كالسيوم', '1000 مجم', 'once_daily', '2024-01-01', NULL);

-- Insert Sample Health Reports
INSERT INTO healthreports (elderly_id, report_date, blood_pressure, heart_rate, sugar_level, weight, notes) VALUES
(1, '2024-12-15', '120/80', 72, 95.5, 75.5, 'الحالة مستقرة'),
(1, '2024-12-10', '125/82', 75, 98.2, 75.0, 'تحسن ملحوظ'),
(2, '2024-12-15', '118/78', 68, 92.0, 65.0, 'الحالة جيدة');

-- Insert Sample Relatives
INSERT INTO relatives (elderly_id, full_name, relation, phone, email) VALUES
(1, 'محمد أحمد', 'ابن', '01012345678', 'mohamed@example.com'),
(1, 'سارة أحمد', 'ابنة', '01123456789', 'sara@example.com'),
(2, 'حسن فاطمة', 'ابن', '01234567890', 'hassan@example.com');

-- Insert Sample Assignments
INSERT INTO assignments (elderly_id, nurse_id, start_date, end_date) VALUES
(1, 2, '2024-01-01', NULL),
(2, 2, '2024-01-01', NULL);

-- Insert Sample Notifications
INSERT INTO notifications (elderly_id, type, message, status) VALUES
(1, 'reminder', 'تذكير: موعد الطبيب غداً الساعة 10 صباحاً', 'unread'),
(1, 'alert', 'تحذير: مستوى السكر مرتفع', 'unread'),
(2, 'info', 'تم تحديث التقرير الصحي', 'read');



