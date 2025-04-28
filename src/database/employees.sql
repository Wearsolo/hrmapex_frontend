-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 05:23 AM
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
  `ImageUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`EmployeeId`, `FName`, `LName`, `Nickname`, `Age`, `DateOfBirth`, `MaritalStatus`, `Gender`, `Nationality`, `Address`, `City`, `State`, `ZIPCode`, `Email`, `MobileNumber`, `Department`, `Position`, `Type`, `Status`, `StartDate`, `ImageUrl`) VALUES
('009918765', 'Jacob ', 'Jones', 'Jacob', 21, '2009-06-19', 'Single', 'Female', 'Thai', '69/1 Nakhon Si Thammarat Rd.', 'Nakhon Si Thammarat', 'Nakhon Si Thammarat', '80000', 'jacob.j@company.com', '0891000001', 'Development', 'PHP Developer', 'Office', 'Contract', '2023-03-01', 'https://randomuser.me/api/portraits/women/1.jpg'),
('100010001', 'Ethan ', 'Ward', 'Ethan', 25, '2013-08-03', 'Single', 'Female', 'Thai', '27/1 Rayong Rd.', 'Rayong', 'Rayong', '21000', 'ethan.w@company.com', '0891000002', 'Development', 'PHP Developer', 'Hybrid', 'Permanent', '2023-03-01', 'https://randomuser.me/api/portraits/men/1.jpg'),
('100010002', 'Mia ', 'Lewis', 'Mia', 26, '2005-02-07', 'Divorced', 'Male', 'Thai', '25/1 Surat Thani Rd.', 'Surat Thani', 'Surat Thani', '84000', 'mia.l@company.com', '0891000003', 'Development', 'React Developer', 'Office', 'Intern', '2023-04-01', 'https://randomuser.me/api/portraits/women/2.jpg'),
('100010003', 'Logan ', 'Carter', 'Logan', 29, '2005-08-06', 'Married', 'Female', 'Thai', '81/1 Lampang Rd.', 'Lampang', 'Lampang', '52000', 'logan.c@company.com', '0891000004', 'Development', 'Vue Developer', 'Office', 'Permanent', '2023-02-15', 'https://randomuser.me/api/portraits/men/3.jpg'),
('100010004', 'Ava', 'Peterson', 'Ava', 30, '2016-08-31', 'Single', 'Female', 'Thai', '65/1 Trang Rd.', 'Trang', 'Trang', '92000', 'ava.p@company.com', '0891000005', 'Design', 'UI Designer', 'Hybrid', 'Contract', '2023-01-10', 'https://randomuser.me/api/portraits/women/4.jpg'),
('100010005', 'Liam', 'Bennett', 'Liam', 27, '1999-12-11', 'Divorced', 'Male', 'Thai', '71/1 Phetchabun Rd.', 'Phetchabun', 'Phetchabun', '67000', 'liam.b@company.com', '0891000006', 'Sales', 'Sales Executive', 'WorkFromHome', 'Permanent', '2023-03-20', 'https://randomuser.me/api/portraits/men/5.jpg'),
('100010006', 'Sophia', ' Collins', 'Soph', 24, '2002-11-06', 'Married', 'Female', 'Thai', '97/1 Sakon Nakhon Rd.', 'Sakon Nakhon', 'Sakon Nakhon', '47000', 'sophia.c@company.com', '0891000007', 'Sales', 'BDM', 'Hybrid', 'Intern', '2023-02-28', 'https://randomuser.me/api/portraits/women/6.jpg'),
('100010007', 'Oliver', 'Hughes', 'Ollie', 31, '2004-11-24', 'Married', 'Male', 'Thai', '53/1 Mae Hong Son Rd.', 'Mae Hong Son', 'Mae Hong Son', '58000', 'oliver.h@company.com', '0891000008', 'Development', 'Node.js Developer', 'Office', 'Permanent', '2023-03-10', 'https://randomuser.me/api/portraits/men/7.jpg'),
('100010008', 'Isabella', 'Turner', 'Bella', 28, '1998-09-23', 'Single', 'Male', 'Thai', '66/1 Nakhon Si Thammarat Rd.', 'Nakhon Si Thammarat', 'Nakhon Si Thammarat', '80000', 'isabella.t@company.com', '0891000009', 'Development', 'Frontend Dev', 'Office', 'Permanent', '2023-01-20', 'https://randomuser.me/api/portraits/women/8.jpg'),
('124335111', 'Brooklyn', 'Simmons', 'Brook', 27, '1998-01-26', 'Single', 'Male', 'Thai', '64/1 Rayong Rd.', 'Rayong', 'Rayong', '21000', 'brooklyn.s@company.com', '0891000010', 'Development', 'PHP Developer', 'Office', 'Contract', '2023-03-01', 'https://randomuser.me/api/portraits/women/1.jpg'),
('239870122', 'Marvin', 'McKinney', 'Marvin', 23, '2010-01-23', 'Divorced', 'Female', 'Thai', '96/1 Surat Thani Rd.', 'Surat Thani', 'Surat Thani', '84000', 'marvin.m@company.com', '0891000011', 'Development', 'PHP Developer', 'Office', 'Permanent', '2023-03-01', 'https://randomuser.me/api/portraits/women/1.jpg'),
('345321231', 'Darlene', 'Robertson', 'Darlene', 29, '2004-12-04', 'Divorced', 'Male', 'Thai', '44/1 Lampang Rd.', 'Lampang', 'Lampang', '52000', 'darlene.r@company.com', '0891000012', 'Design', 'UI/UX Designer', 'Office', 'Permanent', '2023-01-15', 'https://randomuser.me/api/portraits/women/1.jpg'),
('345321232', 'Dianne', 'Russell', 'Dianne', 21, '2005-04-19', 'Married', 'Male', 'Thai', '55/1 Trang Rd.', 'Trang', 'Trang', '92000', 'dianne.r@company.com', '0891000013', 'Sales', 'BDM', 'WorkFromHome', 'Permanent', '2023-04-01', 'https://randomuser.me/api/portraits/women/4.jpg'),
('453367122', 'Cody', 'Fisher', 'Cody', 28, '2008-09-11', 'Married', 'Female', 'Thai', '30/1 Phetchabun Rd.', 'Phetchabun', 'Phetchabun', '67000', 'cody.f@company.com', '0891000014', 'Sales', 'Sales Manager', 'Office', 'Intern', '2023-03-01', 'https://randomuser.me/api/portraits/men/3.jpg'),
('987890545', 'Floyd ', 'Miles', 'Floyd', 32, '2003-01-31', 'Single', 'Female', 'Thai', '98/1 Mae Hong Son Rd.', 'Mae Hong Son', 'Mae Hong Son', '58000', 'floyd.m@company.com', '0891000016', 'Development', 'PHP Developer', 'Office', 'Permanent', '2023-02-01', 'https://randomuser.me/api/portraits/men/2.jpg');

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
