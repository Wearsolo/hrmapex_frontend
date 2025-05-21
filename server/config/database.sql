-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2025 at 05:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hrmanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `AttendanceId` int(11) NOT NULL,
  `EmployeeId` varchar(20) DEFAULT NULL,
  `Date` date NOT NULL,
  `CheckInTime` time DEFAULT NULL,
  `CheckOutTime` time DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `Break` time DEFAULT '01:00:00',
  `WorkingHours` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`AttendanceId`, `EmployeeId`, `Date`, `CheckInTime`, `CheckOutTime`, `Status`, `Break`, `WorkingHours`) VALUES
(1, '100010002', '2023-07-01', '09:28:00', '19:00:00', 'OnTime', '01:00:00', '08:32:00'),
(2, '100010002', '2023-07-02', '09:20:00', '19:00:00', 'OnTime', '01:00:00', '08:40:00'),
(3, '100010002', '2023-07-03', '09:25:00', '19:00:00', 'OnTime', '01:00:00', '08:35:00'),
(4, '100010002', '2023-07-04', '09:45:00', '19:00:00', 'Late', '01:00:00', '08:35:00'),
(5, '100010002', '2023-07-05', '10:00:00', '19:00:00', 'Late', '01:00:00', '08:40:00'),
(6, '100010002', '2023-07-06', '09:28:00', '19:00:00', 'OnTime', '01:00:00', '08:32:00'),
(7, '100010002', '2023-07-07', '09:30:00', '19:00:00', 'OnTime', '01:00:00', '08:30:00'),
(8, '100010002', '2023-07-08', '09:52:00', '19:00:00', 'Late', '01:00:00', '08:30:00'),
(9, '100010002', '2023-07-09', '09:10:00', '19:00:00', 'OnTime', '01:00:00', '08:50:00'),
(10, '100010002', '2023-07-10', '09:48:00', '19:00:00', 'Late', '01:00:00', '08:30:00'),
(11, '345321232', '2023-07-01', '09:10:00', '18:50:00', 'OnTime', '01:00:00', '08:40:00'),
(12, '345321232', '2023-07-02', '09:15:00', '19:00:00', 'OnTime', '01:00:00', '08:45:00'),
(13, '345321232', '2023-07-03', '09:30:00', '19:05:00', 'OnTime', '01:00:00', '08:30:00'),
(14, '345321232', '2023-07-04', '09:50:00', '19:00:00', 'Late', '01:00:00', '08:30:00'),
(15, '345321232', '2023-07-05', '10:05:00', '19:00:00', 'Late', '01:00:00', '08:30:00'),
(16, '100010005', '2023-07-01', '09:00:00', '18:45:00', 'OnTime', '01:00:00', '08:45:00'),
(17, '100010005', '2023-07-02', '09:05:00', '18:55:00', 'OnTime', '01:00:00', '08:50:00'),
(18, '100010005', '2023-07-03', '09:20:00', '19:00:00', 'OnTime', '01:00:00', '08:40:00'),
(19, '100010005', '2023-07-04', '09:40:00', '19:00:00', 'Late', '01:00:00', '08:30:00'),
(20, '100010005', '2023-07-05', '10:10:00', '19:00:00', 'Late', '01:00:00', '08:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `EmployeeId` varchar(20) NOT NULL,
  `FName` varchar(100) DEFAULT NULL,
  `LName` varchar(100) DEFAULT NULL,
  `Nickname` varchar(100) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `MaritalStatus` enum('Single','Married','Divorced','Widowed') DEFAULT NULL,
  `Gender` enum('Male','Female','Other') DEFAULT NULL,
  `Nationality` varchar(50) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `State` varchar(100) DEFAULT NULL,
  `ZIPCode` varchar(10) DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `MobileNumber` varchar(20) DEFAULT NULL,
  `Department` varchar(100) DEFAULT NULL,
  `Position` varchar(100) DEFAULT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `ImageUrl` varchar(255) DEFAULT NULL,
  `BankName` varchar(100) DEFAULT NULL,
  `AccountHolderName` varchar(100) DEFAULT NULL,
  `AccountNumber` varchar(20) DEFAULT NULL,
  `AccountType` varchar(20) DEFAULT NULL,
  `BankCode` varchar(20) DEFAULT NULL,
  `BankStatus` varchar(20) DEFAULT NULL,
  `BankLastUpdated` datetime DEFAULT NULL,
  `Salary` decimal(10,2) DEFAULT NULL,
  `SlackID` varchar(100) DEFAULT NULL,
  `SkypeID` varchar(100) DEFAULT NULL,
  `GithubID` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`EmployeeId`, `FName`, `LName`, `Nickname`, `Age`, `DateOfBirth`, `MaritalStatus`, `Gender`, `Nationality`, `Address`, `City`, `State`, `ZIPCode`, `Email`, `MobileNumber`, `Department`, `Position`, `Type`, `Status`, `StartDate`, `ImageUrl`, `BankName`, `AccountHolderName`, `AccountNumber`, `AccountType`, `BankCode`, `BankStatus`, `BankLastUpdated`, `Salary`, `SlackID`, `SkypeID`, `GithubID`) VALUES
('009918765', 'Jacob ', 'Jones', 'Jacob', 21, '2009-06-19', 'Single', 'Female', 'Thai', '69/1 Nakhon Si Thammarat Rd.', 'Nakhon Si Thammarat', 'Nakhon Si Thammarat', '80000', 'jacob.j@company.com', '0891000001', 'Development', 'PHP Developer', 'Office', 'Contract', '2023-03-01', 'https://randomuser.me/api/portraits/women/1.jpg', 'Kasikorn Bank', 'Jane Smith', '2345678901', 'Saving', 'KBANK01', 'Active', '2025-04-28 11:41:49', 35000.00, 'john.doe', 'john.doe.skype', 'johndoe123'),
('100010001', 'Ethan ', 'Ward', 'Ethan', 25, '2013-08-03', 'Single', 'Female', 'Thai', '27/1 Rayong Rd.', 'Rayong', 'Rayong', '21000', 'ethan.w@company.com', '0891000002', 'Development', 'PHP Developer', 'Hybrid', 'Permanent', '2023-03-01', 'https://randomuser.me/api/portraits/men/1.jpg', 'Bangkok Bank', 'John Doe', '1234567890', 'Saving', 'BBL001', 'Active', '2025-04-28 11:41:49', 40000.00, 'jane.smith', 'jane.smith.skype', 'janesmith456'),
('100010002', 'Mia', 'Lewis', 'Mia', 26, '2005-02-05', 'Divorced', 'Male', 'Thai', '25/1 Surat Thani Rd.', 'Surat Thani', 'Surat Thani', '84000', 'mia.l@company.com', '0891000003', 'Development', 'React Developer', 'Office', 'Intern', '2023-04-01', 'https://randomuser.me/api/portraits/women/2.jpg', 'SCB Bank', 'Mike Johnson', '3456789012', 'Current', 'SCB001', 'Active', '2025-04-28 11:41:49', 42000.00, 'mike.johnson', 'mike.johnson.skype', 'mikejohnson789'),
('100010003', 'Logan ', 'Carter', 'Logan', 29, '2005-08-06', 'Married', 'Female', 'Thai', '81/1 Lampang Rd.', 'Lampang', 'Lampang', '52000', 'logan.c@company.com', '0891000004', 'Development', 'Vue Developer', 'Office', 'Permanent', '2023-02-15', 'https://randomuser.me/api/portraits/men/3.jpg', 'Krungsri Bank', 'Anna Brown', '4567890123', 'Saving', 'BAY001', 'Active', '2025-04-28 11:41:49', 38000.00, 'anna.brown', 'anna.brown.skype', 'annabrown321'),
('100010005', 'Liam', 'Bennett', 'Liam', 27, '1999-12-11', 'Divorced', 'Male', 'Thai', '71/1 Phetchabun Rd.', 'Phetchabun', 'Phetchabun', '67000', 'liam.b@company.com', '0891000006', 'Sales', 'Sales Executive', 'WorkFromHome', 'Permanent', '2023-03-20', 'https://randomuser.me/api/portraits/men/5.jpg', 'Kasikorn Bank', 'Sophia White', '6789012345', 'Saving', 'KBANK01', 'Active', '2025-04-28 11:41:49', 47000.00, 'sophia.white', 'sophia.white.skype', 'sophiawhite987'),
('100010006', 'Sophia', ' Collins', 'Soph', 24, '2002-11-06', 'Married', 'Female', 'Thai', '97/1 Sakon Nakhon Rd.', 'Sakon Nakhon', 'Sakon Nakhon', '47000', 'sophia.c@company.com', '0891000007', 'Sales', 'BDM', 'Hybrid', 'Intern', '2023-02-28', 'https://randomuser.me/api/portraits/women/6.jpg', 'SCB Bank', 'David Black', '7890123456', 'Saving', 'SCB001', 'Active', '2025-04-28 11:41:49', 32000.00, 'david.black', 'david.black.skype', 'davidblack147'),
('100010007', 'Oliver', 'Hughes', 'Ollie', 31, '2004-11-24', 'Married', 'Male', 'Thai', '53/1 Mae Hong Son Rd.', 'Mae Hong Son', 'Mae Hong Son', '58000', 'oliver.h@company.com', '0891000008', 'Development', 'Node.js Developer', 'Office', 'Permanent', '2023-03-10', 'https://randomuser.me/api/portraits/men/7.jpg', 'Krungsri Bank', 'Emma Wilson', '8901234567', 'Current', 'BAY001', 'Active', '2025-04-28 11:41:49', 30000.00, 'emma.wilson', 'emma.wilson.skype', 'emmawilson258'),
('100010008', 'Isabella', 'Turner', 'Bella', 28, '1998-09-23', 'Single', 'Male', 'Thai', '66/1 Nakhon Si Thammarat Rd.', 'Nakhon Si Thammarat', 'Nakhon Si Thammarat', '80000', 'isabella.t@company.com', '0891000009', 'Development', 'Frontend Dev', 'Office', 'Permanent', '2023-01-20', 'https://randomuser.me/api/portraits/women/8.jpg', 'Bangkok Bank', 'Oliver Moore', '9012345678', 'Saving', 'BBL001', 'Active', '2025-04-28 11:41:49', 43000.00, 'oliver.moore', 'oliver.moore.skype', 'olivermoore369'),
('124335111', 'Brooklyn', 'Simmons', 'Brook', 27, '1998-01-26', 'Single', 'Male', 'Thai', '64/1 Rayong Rd.', 'Rayong', 'Rayong', '21000', 'brooklyn.s@company.com', '0891000010', 'Development', 'PHP Developer', 'Office', 'Contract', '2023-03-01', 'https://randomuser.me/api/portraits/women/1.jpg', 'Kasikorn Bank', 'Amelia Taylor', '1123456789', 'Saving', 'KBANK01', 'Active', '2025-04-28 11:41:49', 50000.00, 'amelia.taylor', 'amelia.taylor.skype', 'ameliataylor741'),
('239870122', 'Marvin', 'McKinney', 'Marvin', 23, '2010-01-23', 'Divorced', 'Female', 'Thai', '96/1 Surat Thani Rd.', 'Surat Thani', 'Surat Thani', '84000', 'marvin.m@company.com', '0891000011', 'Development', 'PHP Developer', 'Office', 'Permanent', '2023-03-01', 'https://randomuser.me/api/portraits/women/1.jpg', 'SCB Bank', 'William Anderson', '2234567890', 'Current', 'SCB001', 'Active', '2025-04-28 11:41:49', 37000.00, 'william.anderson', 'william.anderson.skype', 'williamanderson852'),
('345321231', 'Darlene', 'Robertson', 'Darlene', 29, '2004-12-04', 'Divorced', 'Male', 'Thai', '44/1 Lampang Rd.', 'Lampang', 'Lampang', '52000', 'darlene.r@company.com', '0891000012', 'Design', 'UI/UX Designer', 'Office', 'Permanent', '2023-01-15', 'https://randomuser.me/api/portraits/women/1.jpg', 'Krungsri Bank', 'Isabella Thomas', '3345678901', 'Saving', 'BAY001', 'Active', '2025-04-28 11:41:49', 52000.00, 'isabella.thomas', 'isabella.thomas.skype', 'isabellathomas963'),
('345321232', 'Dianne', 'Russell', 'Dianne', 21, '2005-04-19', 'Married', 'Male', 'Thai', '55/1 Trang Rd.', 'Trang', 'Trang', '92000', 'dianne.r@company.com', '0891000013', 'Sales', 'BDM', 'WorkFromHome', 'Permanent', '2023-04-01', 'https://randomuser.me/api/portraits/women/4.jpg', 'Bangkok Bank', 'James Jackson', '4456789012', 'Saving', 'BBL001', 'Active', '2025-04-28 11:41:49', 48000.00, 'james.jackson', 'james.jackson.skype', 'jamesjackson159'),
('453367122', 'Cody', 'Fisher', 'Cody', 28, '2008-09-11', 'Married', 'Female', 'Thai', '30/1 Phetchabun Rd.', 'Phetchabun', 'Phetchabun', '67000', 'cody.f@company.com', '0891000014', 'Sales', 'Sales Manager', 'Office', 'Intern', '2023-03-01', 'https://randomuser.me/api/portraits/men/3.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('987890545', 'Floyd ', 'Miles', 'Floyd', 32, '2003-01-31', 'Single', 'Female', 'Thai', '98/1 Mae Hong Son Rd.', 'Mae Hong Son', 'Mae Hong Son', '58000', 'floyd.m@company.com', '0891000016', 'Development', 'PHP Developer', 'Office', 'Permanent', '2023-02-01', 'https://randomuser.me/api/portraits/men/2.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('EMP2025044861', 'Admin', '', 'Admin', 99, '9999-12-20', 'Single', 'Male', 'Mars', '-', '-', '-', '-', 'admin@gmail.com', '0200001111', 'Admin', 'Admin', 'Office', 'Permanent', '1111-11-11', NULL, 'bangkok-bank', 'AdminAkJai', '1122334455', 'savings', '4444', 'active', '2025-04-28 15:49:48', 99999.00, 'adminadjai.j', 'admin.aa', 'admin.na');

-- --------------------------------------------------------

--
-- Table structure for table `leavetable`
--

CREATE TABLE `leavetable` (
  `LeaveId` int(11) NOT NULL,
  `EmployeeId` varchar(20) DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `Reason` varchar(255) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leavetable`
--

INSERT INTO `leavetable` (`LeaveId`, `EmployeeId`, `StartDate`, `EndDate`, `Reason`, `Status`) VALUES
(1, '100010002', '2023-03-10', '2023-03-12', 'Vacation', 'Approved'),
(2, '100010002', '2023-05-01', '2023-05-02', 'Flu', 'Approved'),
(3, '100010002', '2023-04-15', '2023-04-15', 'Family matters', 'Pending'),
(4, '100010002', '2023-06-10', '2023-06-12', 'Travel', 'Approved'),
(5, '345321232', '2023-07-10', '2023-07-12', 'Rest', 'Approved'),
(6, '345321232', '2023-08-05', '2023-08-06', 'Fever', 'Approved'),
(7, '345321232', '2023-09-01', '2023-09-01', 'Errands', 'Pending'),
(8, '345321232', '2023-12-01', '2023-12-01', 'Bank business', 'Pending'),
(9, '100010005', '2023-12-10', '2023-12-12', 'Trip', 'Approved'),
(10, '100010005', '2024-01-05', '2024-01-06', 'Cold', 'Approved'),
(11, '100010005', '2023-02-10', '2023-02-12', 'Family trip', 'Approved'),
(12, '100010007', '2023-04-15', '2023-04-16', 'Stomachache', 'Approved'),
(13, '100010007', '2023-06-01', '2023-06-01', 'Personal errand', 'Pending'),
(14, '100010007', '2023-08-10', '2023-08-12', 'Travel', 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `NewsId` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Category` varchar(100) DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `Attachment` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT current_timestamp(),
  `isPinned` tinyint(1) DEFAULT 0,
  `FieldList` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`NewsId`, `Title`, `Category`, `Content`, `Attachment`, `CreatedAt`, `isPinned`, `FieldList`) VALUES
(1, 'ประกาศหยุดวันแรงงาน', 'Announcement', 'บริษัทจะหยุดทำการในวันที่ 1 พฤษภาคม เนื่องในวันแรงงานแห่งชาติ', 'holiday_announcement.pdf', '2023-04-25 09:00:00', 0, NULL),
(2, 'เปิดอบรมระบบ HRMS รุ่นที่ 2', 'Activity', 'เปิดรับลงทะเบียนอบรมระบบ HRMS สำหรับพนักงานใหม่ เริ่มอบรม 10 พ.ค.', 'hrms_training_v2.pdf', '2023-04-26 10:30:00', 0, NULL),
(3, 'แจ้งเปลี่ยนแปลงกะทำงานเดือนพฤษภาคม', 'Announcement', 'มีการเปลี่ยนแปลงเวลาการเข้ากะสำหรับแผนกผลิต กรุณาตรวจสอบ', 'shift_may_update.pdf', '2023-04-27 14:00:00', 0, NULL),
(4, 'ประกาศแต่งตั้งหัวหน้าแผนกใหม่', 'Announcement', 'ขอแสดงความยินดีกับคุณสมชาย ได้รับตำแหน่งหัวหน้าแผนกวิจัย', NULL, '2023-04-28 11:45:00', 0, NULL),
(5, 'กิจกรรม Big Cleaning Day', 'Activity', 'ขอเชิญพนักงานร่วมกิจกรรม Big Cleaning Day วันที่ 12 พ.ค.', 'bigcleaning.pdf', '2023-04-28 16:10:00', 0, NULL),
(6, 'รายงานผลประกวดออกแบบบูธ', 'Activity', 'ทีมการตลาดคว้ารางวัลชนะเลิศการประกวดบูธประจำปี', NULL, '2023-04-29 09:00:00', 0, NULL),
(7, 'แจ้งกำหนดการตรวจสุขภาพประจำปี', 'Announcement', 'ขอให้พนักงานทุกคนตรวจสอบรอบเวลาตรวจสุขภาพตามแผนก', 'health_checkup.pdf', '2023-04-30 10:15:00', 0, NULL),
(8, 'ศึกหุบเขาหลัวสุ่ย: กองทัพเว่ยทำลายฉู่ในยามรุ่งอรุณ', 'Announcement', 'รุ่งสาง ณ หุบเขาหลัวสุ่ย เสียงกลองศึกกึกก้องทั่วพื้นปฐพี กองทัพเว่ยภายใต้การนำของแม่ทัพโหวอิง ตระเตรียมกำลังพลนับแสนในรูปขบวนพิฆาต หลังผ่านการวางแผนซุ่มโจมตีนานกว่าเจ็ดวันเจ็ดคืน กองทัพเว่ยได้บุกเข้าโจมตีค่ายหลักของรัฐฉู่ในยามที่หมอกปกคลุมหนาทึบ การโจมตีอย่างฉับพลันทำให้ทหารรัฐฉู่ไร้การเตรียมตัว ค่ายแตกพ่ายในเวลาเพียงครึ่งชั่วยาม แม่ทัพใหญ่รัฐฉู่ถูกบีบถอยร่นไปยังแนวภูเขาตอนเหนือ สูญเสียเสบียงและอาวุธมหาศาล ประชาชนในพื้นที่แตกตื่นลี้ภัยจำนวนมาก เหล่าปราชญ์ต่างลงความเห็นว่านี่คือความพ่ายแพ้ที่ย่อยยับที่สุดในรอบหลายสิบปีของรัฐฉู่ ก่อให้เกิดการเปลี่ยนแปลงขั้วอำนาจครั้งใหญ่ในลุ่มน้ำแยงซี!', 'intranet_guide.pdf', '2023-05-01 13:30:00', 0, NULL),
(9, 'กิจกรรมจับสลากของขวัญปีใหม่', 'Activity', 'กิจกรรมจับของขวัญปีใหม่จะจัดขึ้นวันที่ 28 ธ.ค.', 'newyear_gift.pdf', '2023-05-02 15:00:00', 0, NULL),
(10, 'อัปเดตสิทธิ์วันลาพักร้อนปี 2023', 'Announcement', 'พนักงานสามารถตรวจสอบสิทธิ์วันลาพักร้อนประจำปีได้ใน HR Portal', NULL, '2023-05-03 09:20:00', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `ProjectId` int(11) NOT NULL,
  `ProjectName` varchar(100) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `EmployeeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`ProjectId`, `ProjectName`, `Description`, `StartDate`, `EndDate`, `Status`, `EmployeeId`) VALUES
(1, 'Project Alpha', 'Project for Darlene Robertson', '2023-07-01', '2023-08-01', 'Completed', 100010002),
(2, 'UX Redesign', 'Project for Darlene Robertson', '2023-08-05', '2023-09-10', 'Completed', 345321232),
(3, 'Mobile App UI', 'Project for Darlene Robertson', '2023-09-15', '2023-10-20', 'In Process', 100010005),
(4, 'Design System', 'Project for Darlene Robertson', '2023-10-25', '2023-12-01', 'In Process', 100010002),
(5, 'Website Revamp', 'Project for Floyd Miles', '2023-07-10', '2023-09-15', 'In Process', 345321232),
(6, 'Salesforce Integration', 'Project for Cody Fisher', '2023-06-01', '2023-07-15', 'Completed', 100010005),
(7, 'Market Expansion', 'Project for Dianne Russell', '2023-08-01', '2023-09-01', 'In Process', 100010002),
(8, 'Brand Redesign', 'Project for Savannah Nguyen', '2023-07-05', '2023-08-05', 'Completed', 345321232),
(9, 'API Automation', 'Project for Jacob Jones', '2023-07-20', '2023-09-01', 'In Process', 100010005),
(10, 'UI Library', 'Project for Marvin McKinney', '2023-07-01', '2023-08-10', 'Completed', 100010002),
(11, 'Mobile App Launch', 'Project for Brooklyn Simmons', '2023-08-01', '2023-09-15', 'In Process', 345321232),
(12, 'Recruitment Drive', 'Project for Kristin Watson', '2023-09-01', '2023-10-01', 'Completed', 100010005),
(13, 'Frontend Migration', 'Project for Kathryn Murphy', '2023-10-01', '2023-11-01', 'In Process', 100010002),
(14, 'NodeJS Upgrade', 'Project for Arlene McCoy', '2023-11-01', '2023-12-01', 'In Process', 345321232),
(15, 'Business Analysis', 'Project for Devon Lane', '2023-12-01', '2024-01-15', 'In Process', 100010005),
(16, 'QA Automation', 'Project for Cameron Wilson', '2023-01-01', '2023-02-01', 'Completed', 100010002),
(17, 'Digital Campaign', 'Project for Leslie Alexander', '2023-02-01', '2023-03-01', 'Completed', 345321232),
(18, 'Intern Design Project', 'Project for Jenny Wilson', '2023-03-01', '2023-04-01', 'Completed', 100010005),
(19, 'DevOps Pipeline', 'Project for Guy Hawkins', '2023-04-01', '2023-05-01', 'Completed', 100010002),
(20, 'Sales Onboarding', 'Project for Robert Fox', '2023-05-01', '2023-06-01', 'Completed', 345321232),
(21, 'Full Stack Bootcamp', 'Project for Wade Warren', '2023-06-01', '2023-07-01', 'Completed', 100010005),
(22, 'Agile Transformation', 'Project for Bessie Cooper', '2023-07-01', '2023-08-01', 'In Process', 100010002),
(23, 'QA Regression', 'Project for Eleanor Pena', '2023-08-01', '2023-09-01', 'In Process', 345321232),
(24, 'iOS App Redesign', 'Project for Theresa Webb', '2023-09-01', '2023-10-01', 'In Process', 100010005),
(25, 'Android App Launch', 'Project for Annette Black', '2023-10-01', '2023-11-01', 'In Process', 100010002),
(26, 'Motion Graphics', 'Project for Jerome Bell', '2023-11-01', '2023-12-01', 'In Process', 345321232),
(27, 'Content Strategy', 'Project for Courtney Henry', '2023-12-01', '2024-01-01', 'In Process', 100010005),
(28, 'HR Policy Update', 'Project for Ralph Edwards', '2023-01-01', '2023-02-01', 'Completed', 100010002),
(29, 'Product Design Sprint', 'Project for Jane Cooper', '2023-02-01', '2023-03-01', 'Completed', 345321232),
(30, 'System Architecture', 'Project for Ronald Richards', '2023-03-01', '2023-04-01', 'Completed', 100010005),
(31, 'BA Workshop', 'Project for Darrell Steward', '2023-04-01', '2023-05-01', 'Completed', 100010002),
(32, 'Cloud Migration', 'Project for Albert Flores', '2023-05-01', '2023-06-01', 'Completed', 345321232),
(33, 'PMO Setup', 'Project for Esther Howard', '2023-06-01', '2023-07-01', 'Completed', 100010005);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Admin', 'admin@gmail.com', '123456', 'admin', '2025-04-24 06:18:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`AttendanceId`),
  ADD KEY `EmployeeId` (`EmployeeId`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`EmployeeId`);

--
-- Indexes for table `leavetable`
--
ALTER TABLE `leavetable`
  ADD PRIMARY KEY (`LeaveId`),
  ADD KEY `EmployeeId` (`EmployeeId`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`NewsId`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`ProjectId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `AttendanceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `leavetable`
--
ALTER TABLE `leavetable`
  MODIFY `LeaveId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `NewsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `ProjectId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`EmployeeId`) REFERENCES `employees` (`EmployeeId`);

--
-- Constraints for table `leavetable`
--
ALTER TABLE `leavetable`
  ADD CONSTRAINT `leavetable_ibfk_1` FOREIGN KEY (`EmployeeId`) REFERENCES `employees` (`EmployeeId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
