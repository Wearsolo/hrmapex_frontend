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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `AttendanceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`EmployeeId`) REFERENCES `employees` (`EmployeeId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
