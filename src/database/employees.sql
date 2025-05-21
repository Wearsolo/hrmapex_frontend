-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2025 at 11:01 AM
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
('009918765', 'Jacob ', 'Jones', 'Jacob', 21, '2009-06-19', 'Single', 'Female', 'Thai', '69/1 Nakhon Si Thammarat Rd.', 'Nakhon Si Thammarat', 'Nakhon Si Thammarat', '80000', 'jacob.j@company.com', '0891000001', 'Development', 'HR', 'Permanent', 'Active', '2023-03-01', 'https://randomuser.me/api/portraits/women/1.jpg', 'Kasikorn Bank', 'Jane Smith', '2345678901', 'Saving', 'KBANK01', 'Active', '2025-04-28 11:41:49', 35000.00, 'john.doe', 'john.doe.skype', 'johndoe123'),
('100010001', 'Ethan ', 'Ward', 'Ethan', 25, '2013-08-02', 'Single', 'Female', 'Thai', '27/1 Rayong Rd.', 'Rayong', 'Rayong', '21000', 'ethan.w@company.com', '0891000002', 'Development', 'System', 'Intern', 'Active', '2023-03-01', 'https://randomuser.me/api/portraits/men/1.jpg', 'Bangkok Bank', 'John Doe', '1234567890', 'Saving', 'BBL001', 'Active', '2025-04-28 11:41:49', 40000.00, 'jane.smith', 'jane.smith.skype', 'janesmith456'),
('100010002', 'Mia', 'Lewis', 'Mia', 26, '2005-01-13', 'Divorced', 'Male', 'Thai', '25/1 Surat Thani Rd.', 'Surat Thani', 'Surat Thani', '84000', 'mia.l@company.com', '0891000003', 'Development', 'System', 'Permanent', 'Active', '2023-04-01', 'https://randomuser.me/api/portraits/women/2.jpg', 'SCB Bank', 'Mike Johnson', '3456789012', 'Current', 'SCB001', 'Active', '2025-04-28 11:41:49', 42000.00, 'mike.johnson', 'mike.johnson.skype', 'mikejohnson789'),
('100010003', 'Logan ', 'Carter', 'Logan', 29, '2005-08-06', 'Married', 'Female', 'Thai', '81/1 Lampang Rd.', 'Lampang', 'Lampang', '52000', 'logan.c@company.com', '0891000004', 'Development', 'Programmer', 'Permanent', 'Active', '2023-02-15', 'https://randomuser.me/api/portraits/men/3.jpg', 'Krungsri Bank', 'Anna Brown', '4567890123', 'Saving', 'BAY001', 'Active', '2025-04-28 11:41:49', 38000.00, 'anna.brown', 'anna.brown.skype', 'annabrown321'),
('100010005', 'Liam', 'Bennett', 'Liam', 27, '1999-12-11', 'Divorced', 'Male', 'Thai', '71/1 Phetchabun Rd.', 'Phetchabun', 'Phetchabun', '67000', 'liam.b@company.com', '0891000006', 'Sales', 'Programmer', 'Intern', 'InActive', '2023-03-20', 'https://randomuser.me/api/portraits/men/5.jpg', 'Kasikorn Bank', 'Sophia White', '6789012345', 'Saving', 'KBANK01', 'Active', '2025-04-28 11:41:49', 47000.00, 'sophia.white', 'sophia.white.skype', 'sophiawhite987'),
('100010006', 'Sophia', ' Collins', 'Soph', 24, '2002-11-06', 'Married', 'Female', 'Thai', '97/1 Sakon Nakhon Rd.', 'Sakon Nakhon', 'Sakon Nakhon', '47000', 'sophia.c@company.com', '0891000007', 'Sales', 'Programmer', 'Permanent', 'Active', '2023-02-28', 'https://randomuser.me/api/portraits/women/6.jpg', 'SCB Bank', 'David Black', '7890123456', 'Saving', 'SCB001', 'Active', '2025-04-28 11:41:49', 32000.00, 'david.black', 'david.black.skype', 'davidblack147'),
('100010007', 'Oliver', 'Hughes', 'Ollie', 31, '2004-11-24', 'Married', 'Male', 'Thai', '53/1 Mae Hong Son Rd.', 'Mae Hong Son', 'Mae Hong Son', '58000', 'oliver.h@company.com', '0891000008', 'Development', 'System', 'Intern', 'Active', '2023-03-10', 'https://randomuser.me/api/portraits/men/7.jpg', 'Krungsri Bank', 'Emma Wilson', '8901234567', 'Current', 'BAY001', 'Active', '2025-04-28 11:41:49', 30000.00, 'emma.wilson', 'emma.wilson.skype', 'emmawilson258'),
('100010008', 'Isabella', 'Turner', 'Bella', 28, '1998-09-23', 'Single', 'Male', 'Thai', '66/1 Nakhon Si Thammarat Rd.', 'Nakhon Si Thammarat', 'Nakhon Si Thammarat', '80000', 'isabella.t@company.com', '0891000009', 'Development', 'System', 'Intern', 'Active', '2023-01-20', 'https://randomuser.me/api/portraits/women/8.jpg', 'Bangkok Bank', 'Oliver Moore', '9012345678', 'Saving', 'BBL001', 'Active', '2025-04-28 11:41:49', 43000.00, 'oliver.moore', 'oliver.moore.skype', 'olivermoore369'),
('124335111', 'Brooklyn', 'Simmons', 'Brook', 27, '1998-01-26', 'Single', 'Male', 'Thai', '64/1 Rayong Rd.', 'Rayong', 'Rayong', '21000', 'brooklyn.s@company.com', '0891000010', 'Development', 'Programmer', 'Contract', 'InActive', '2023-03-01', 'https://randomuser.me/api/portraits/women/1.jpg', 'Kasikorn Bank', 'Amelia Taylor', '1123456789', 'Saving', 'KBANK01', 'Active', '2025-04-28 11:41:49', 50000.00, 'amelia.taylor', 'amelia.taylor.skype', 'ameliataylor741'),
('239870122', 'Marvin', 'McKinney', 'Marvin', 23, '2010-01-23', 'Divorced', 'Female', 'Thai', '96/1 Surat Thani Rd.', 'Surat Thani', 'Surat Thani', '84000', 'marvin.m@company.com', '0891000011', 'Development', 'System', 'Permanent', 'Active', '2023-03-01', 'https://randomuser.me/api/portraits/women/1.jpg', 'SCB Bank', 'William Anderson', '2234567890', 'Current', 'SCB001', 'Active', '2025-04-28 11:41:49', 37000.00, 'william.anderson', 'william.anderson.skype', 'williamanderson852'),
('345321231', 'Darlene', 'Robertson', 'Darlene', 29, '2004-12-04', 'Divorced', 'Male', 'Thai', '44/1 Lampang Rd.', 'Lampang', 'Lampang', '52000', 'darlene.r@company.com', '0891000012', 'Design', 'System', 'Freelance', 'Active', '2023-01-15', 'https://randomuser.me/api/portraits/women/1.jpg', 'Krungsri Bank', 'Isabella Thomas', '3345678901', 'Saving', 'BAY001', 'Active', '2025-04-28 11:41:49', 52000.00, 'isabella.thomas', 'isabella.thomas.skype', 'isabellathomas963'),
('345321232', 'Dianne', 'Russell', 'Dianne', 21, '2005-04-19', 'Married', 'Male', 'Thai', '55/1 Trang Rd.', 'Trang', 'Trang', '92000', 'dianne.r@company.com', '0891000013', 'Sales', 'HR', 'Freelance', 'InActive', '2023-04-01', 'https://randomuser.me/api/portraits/women/4.jpg', 'Bangkok Bank', 'James Jackson', '4456789012', 'Saving', 'BBL001', 'Active', '2025-04-28 11:41:49', 48000.00, 'james.jackson', 'james.jackson.skype', 'jamesjackson159'),
('453367122', 'Cody', 'Fisher', 'Cody', 28, '2008-09-09', 'Married', 'Female', 'Thai', '30/1 Phetchabun Rd.', 'Phetchabun', 'Phetchabun', '67000', 'cody.f@company.com', '0891000014', 'Sales', 'Programmer', 'Intern', 'Active', '2023-03-01', 'https://randomuser.me/api/portraits/men/3.jpg', '-', '-', '-', '-', '-', '-', NULL, 0.00, '-', '-', '-'),
('987890545', 'Floyd ', 'Miles', 'Floyd', 32, '2003-01-31', 'Single', 'Female', 'Thai', '98/1 Mae Hong Son Rd.', 'Mae Hong Son', 'Mae Hong Son', '58000', 'floyd.m@company.com', '0891000016', 'Development', 'Programmer', 'Contract', 'InActive', '2023-02-01', 'https://randomuser.me/api/portraits/men/2.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('EMP2025044861', 'Admin', '', 'Admin', 99, '9999-12-20', 'Single', 'Male', 'Mars', '-', '-', '-', '-', 'admin@gmail.com', '0200001111', 'Admin', 'Programmer', 'Permanent', 'InActive', '1111-11-11', NULL, 'bangkok-bank', 'AdminAkJai', '1122334455', 'savings', '4444', 'active', '2025-04-28 15:49:48', 99999.00, 'adminadjai.j', 'admin.aa', 'admin.na');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`EmployeeId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
