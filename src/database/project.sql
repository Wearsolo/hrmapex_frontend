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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`ProjectId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `ProjectId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
