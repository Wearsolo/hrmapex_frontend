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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `leavetable`
--
ALTER TABLE `leavetable`
  ADD PRIMARY KEY (`LeaveId`),
  ADD KEY `EmployeeId` (`EmployeeId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `leavetable`
--
ALTER TABLE `leavetable`
  MODIFY `LeaveId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `leavetable`
--
ALTER TABLE `leavetable`
  ADD CONSTRAINT `leavetable_ibfk_1` FOREIGN KEY (`EmployeeId`) REFERENCES `employees` (`EmployeeId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
