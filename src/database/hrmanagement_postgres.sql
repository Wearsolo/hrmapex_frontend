-- PostgreSQL dump
-- Database: hrmanagement

-- Drop tables if they exist
DROP TABLE IF EXISTS disbursements CASCADE;
DROP TABLE IF EXISTS experience CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS employees CASCADE;

-- Drop types if they exist (add this section)
DROP TYPE IF EXISTS marital_status_type CASCADE;
DROP TYPE IF EXISTS gender_type CASCADE;
DROP TYPE IF EXISTS user_role_type CASCADE;
DROP TYPE IF EXISTS disbursement_status_type CASCADE;
DROP TYPE IF EXISTS education_level_type CASCADE;

-- Create custom types for ENUM replacements
CREATE TYPE IF NOT EXISTS marital_status_type AS ENUM ('Single', 'Married', 'Divorced', 'Widowed');
CREATE TYPE IF NOT EXISTS gender_type AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE IF NOT EXISTS user_role_type AS ENUM ('admin', 'user');
CREATE TYPE IF NOT EXISTS disbursement_status_type AS ENUM ('Pending', 'Approved', 'Rejected');
CREATE TYPE IF NOT EXISTS education_level_type AS ENUM ('High school', 'Vocational', 'Diploma', 'Bachelor degree', 'Post-Graduate', 'Others');

-- Table: disbursements
CREATE TABLE disbursements (
    id SERIAL PRIMARY KEY,
    employeeName VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status disbursement_status_type NOT NULL,
    date DATE NOT NULL,
    details TEXT
);

-- Table: employees
CREATE TABLE employees (
    EmployeeId VARCHAR(20) PRIMARY KEY,
    FName VARCHAR(100),
    LName VARCHAR(100),
    Nickname VARCHAR(100),
    Age INTEGER,
    DateOfBirth DATE,
    MaritalStatus marital_status_type,
    Gender gender_type,
    Nationality VARCHAR(50),
    Address VARCHAR(255),
    City VARCHAR(100),
    State VARCHAR(100),
    ZIPCode VARCHAR(10),
    Email VARCHAR(100) NOT NULL,
    MobileNumber VARCHAR(20),
    Department VARCHAR(100),
    Position VARCHAR(100),
    Type VARCHAR(50),
    Status VARCHAR(50),
    StartDate DATE,
    ImageUrl VARCHAR(255),
    BankName VARCHAR(100),
    AccountHolderName VARCHAR(100),
    AccountNumber VARCHAR(20),
    AccountType VARCHAR(20),
    BankCode VARCHAR(20),
    BankStatus VARCHAR(20),
    BankLastUpdated TIMESTAMP,
    Salary DECIMAL(10,2),
    SlackID VARCHAR(100),
    SkypeID VARCHAR(100),
    GithubID VARCHAR(100),
    username VARCHAR(50) UNIQUE
);

-- Table: experience
CREATE TABLE experience (
    id SERIAL PRIMARY KEY,
    education_level education_level_type NOT NULL,
    institution VARCHAR(255),
    major VARCHAR(255),
    education_from_month_year VARCHAR(7),
    education_to_month_year VARCHAR(7),
    company VARCHAR(255),
    work_from_month_year VARCHAR(7),
    work_to_month_year VARCHAR(7),
    position VARCHAR(255),
    job_description TEXT,
    salary DECIMAL(10,2),
    employee_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(EmployeeId)
);

-- Table: news
CREATE TABLE news (
    NewsId SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Category VARCHAR(100),
    Content TEXT,
    Attachment VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isPinned BOOLEAN DEFAULT FALSE,
    Hidenews INTEGER DEFAULT 0
);

-- Table: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role user_role_type DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for disbursements
INSERT INTO disbursements (employeeName, category, amount, status, date, details) VALUES
    ('สมชาย ใจดี', 'ค่าเดินทาง', 1500.00, 'Pending', '2025-05-07', 'ค่าแท็กซี่ไปประชุมลูกค้า'),
    ('สุภาพร ดีเลิศ', 'ค่าอาหาร', 800.00, 'Approved', '2025-05-05', 'เลี้ยงอาหารลูกค้าหลังประชุม'),
    ('อดิศร ทองแท้', 'ค่าสัมมนา', 3200.00, 'Pending', '2025-05-06', 'ค่าสมัครงานสัมมนาเทคโนโลยี'),
    ('มณีรัตน์ พูนสุข', 'ค่าเดินทาง', 2000.00, 'Rejected', '2025-05-04', 'ค่ารถไฟฟ้าและรถตู้ไปอบรม'),
    ('วรชาติ สมจริง', 'ค่าเบี้ยเลี้ยง', 1200.00, 'Approved', '2025-05-03', 'เบี้ยเลี้ยงออกพื้นที่'),
    ('ศิริพร ตั้งใจดี', 'ค่าอาหาร', 650.00, 'Pending', '2025-05-02', 'ค่าอาหารกลางวันในการอบรม'),
    ('กิตติศักดิ์ มั่นคง', 'ค่าที่พัก', 2500.00, 'Approved', '2025-05-01', 'ค่าที่พักระหว่างการฝึกอบรมต่างจังหวัด'),
    ('พิมพ์ใจ จิตสงบ', 'ค่าสัมมนา', 3000.00, 'Rejected', '2025-04-30', 'ค่าอบรมพัฒนาทักษะ'),
    ('อารีย์ รัตนโชติ', 'ค่าเบี้ยเลี้ยง', 1100.00, 'Approved', '2025-04-29', 'เบี้ยเลี้ยงในพื้นที่ห่างไกล'),
    ('ธนพล สุขสันต์', 'ค่าเดินทาง', 1800.00, 'Pending', '2025-04-28', 'ค่ารถไปติดต่าลูกค้า');

-- Insert sample data for employees
INSERT INTO employees (EmployeeId, FName, LName, Nickname, Age, DateOfBirth, MaritalStatus, Gender, Nationality, Address, City, State, ZIPCode, Email, MobileNumber, Department, Position, Type, Status, StartDate, ImageUrl, BankName, AccountHolderName, AccountNumber, AccountType, BankCode, BankStatus, BankLastUpdated, Salary, SlackID, SkypeID, GithubID, username) VALUES
    ('009918765', 'Jacob ', 'Jones', 'Jacob', 21, '2009-06-19', 'Single', 'Female', 'Thai', '69/1 Nakhon Si Thammarat Rd.', 'Nakhon Si Thammarat', 'Nakhon Si Thammarat', '80000', 'jacob.j@company.com', '0891000001', 'Development', 'HR', 'Permanent', 'Active', '2023-03-01', 'https://randomuser.me/api/portraits/women/1.jpg', 'Kasikorn Bank', 'Jane Smith', '2345678901', 'Saving', 'KBANK01', 'Active', '2025-04-28 11:41:49', 35000.00, 'john.doe', 'john.doe.skype', 'johndoe123', 'jacobjones'),
    ('100010001', 'Ethan ', 'Ward', 'Ethan', 25, '2013-08-02', 'Single', 'Female', 'Thai', '27/1 Rayong Rd.', 'Rayong', 'Rayong', '21000', 'ethan.w@company.com', '0891000002', 'Development', 'System', 'Intern', 'Active', '2023-03-01', 'https://randomuser.me/api/portraits/men/1.jpg', 'Bangkok Bank', 'John Doe', '1234567890', 'Saving', 'BBL001', 'Active', '2025-04-28 11:41:49', 40000.00, 'jane.smith', 'jane.smith.skype', 'janesmith456', 'ethanward');
-- Add remaining employee data as needed...

-- Insert sample data for news
INSERT INTO news (Title, Category, Content, Attachment, CreatedAt, isPinned, Hidenews) VALUES
    ('ประกาศหยุดวันแรงงาน', 'Announcement', 'บริษัทจะหยุดทำการในวันที่ 1 พฤษภาคม เนื่องในวันแรงงานแห่งชาติ', 'holiday_announcement.pdf', '2023-04-25 09:00:00', FALSE, 0),
    ('เปิดอบรมระบบ HRMS รุ่นที่ 2', 'Activity', 'เปิดรับลงทะเบียนอบรมระบบ HRMS สำหรับพนักงานใหม่ เริ่มอบรม 10 พ.ค.', 'hrms_training_v2.pdf', '2023-04-26 10:30:00', FALSE, 0);
-- Add remaining news data as needed...

-- Insert sample data for users
INSERT INTO users (name, email, password, role, created_at) VALUES
    ('Admin', 'admin@gmail.com', '123456', 'admin', '2025-04-24 06:18:59');
