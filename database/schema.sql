-- Elderly Care Management System Database Schema
-- Create Database
CREATE DATABASE IF NOT EXISTS elderly_care_db;
USE elderly_care_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('admin', 'caregiver', 'family', 'nurse', 'doctor') NOT NULL DEFAULT 'family',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Elderly Table
CREATE TABLE IF NOT EXISTS elderly (
  elderly_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  gender ENUM('male', 'female', 'other') NOT NULL,
  health_condition TEXT,
  blood_type ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
  address VARCHAR(255),
  emergency_contact VARCHAR(255),
  users_user_id INT NOT NULL,
  FOREIGN KEY (users_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX fk_elderly_users1_idx (users_user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  appointment_id INT AUTO_INCREMENT PRIMARY KEY,
  elderly_id INT NOT NULL,
  doctor_id INT,
  appointment_date DATETIME NOT NULL,
  purpose VARCHAR(255),
  notes TEXT,
  FOREIGN KEY (elderly_id) REFERENCES elderly(elderly_id) ON DELETE CASCADE,
  INDEX idx_elderly_id (elderly_id),
  INDEX idx_appointment_date (appointment_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Medications Table
CREATE TABLE IF NOT EXISTS medications (
  medication_id INT AUTO_INCREMENT PRIMARY KEY,
  elderly_id INT NOT NULL,
  medicine_name VARCHAR(100) NOT NULL,
  dosage VARCHAR(50) NOT NULL,
  frequency ENUM('once_daily', 'twice_daily', 'thrice_daily', 'four_times_daily', 'as_needed') NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  FOREIGN KEY (elderly_id) REFERENCES elderly(elderly_id) ON DELETE CASCADE,
  INDEX idx_elderly_id (elderly_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Health Reports Table
CREATE TABLE IF NOT EXISTS healthreports (
  report_id INT AUTO_INCREMENT PRIMARY KEY,
  elderly_id INT NOT NULL,
  report_date DATE NOT NULL DEFAULT (CURRENT_DATE),
  blood_pressure VARCHAR(20),
  heart_rate INT,
  sugar_level DECIMAL(5,2),
  weight DECIMAL(5,2),
  notes TEXT,
  FOREIGN KEY (elderly_id) REFERENCES elderly(elderly_id) ON DELETE CASCADE,
  INDEX idx_elderly_id (elderly_id),
  INDEX idx_report_date (report_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relatives Table
CREATE TABLE IF NOT EXISTS relatives (
  relative_id INT AUTO_INCREMENT PRIMARY KEY,
  elderly_id INT NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  relation VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  FOREIGN KEY (elderly_id) REFERENCES elderly(elderly_id) ON DELETE CASCADE,
  INDEX idx_elderly_id (elderly_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Assignments Table
CREATE TABLE IF NOT EXISTS assignments (
  assignment_id INT AUTO_INCREMENT PRIMARY KEY,
  elderly_id INT NOT NULL,
  nurse_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  FOREIGN KEY (elderly_id) REFERENCES elderly(elderly_id) ON DELETE CASCADE,
  INDEX idx_elderly_id (elderly_id),
  INDEX idx_nurse_id (nurse_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  notification_id INT AUTO_INCREMENT PRIMARY KEY,
  elderly_id INT NOT NULL,
  type ENUM('alert', 'reminder', 'info', 'warning') NOT NULL DEFAULT 'info',
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('read', 'unread') NOT NULL DEFAULT 'unread',
  FOREIGN KEY (elderly_id) REFERENCES elderly(elderly_id) ON DELETE CASCADE,
  INDEX idx_elderly_id (elderly_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


