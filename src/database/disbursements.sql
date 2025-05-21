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
-- Table structure for table `disbursements`
--

CREATE TABLE `disbursements` (
  `id` int(11) NOT NULL,
  `employeeName` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('Pending','Approved','Rejected') NOT NULL,
  `date` date NOT NULL,
  `details` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `disbursements`
--

INSERT INTO `disbursements` (`id`, `employeeName`, `category`, `amount`, `status`, `date`, `details`) VALUES
(1, 'สมชาย ใจดี', 'ค่าเดินทาง', 1500.00, 'Pending', '2025-05-07', 'ค่าแท็กซี่ไปประชุมลูกค้า'),
(2, 'สุภาพร ดีเลิศ', 'ค่าอาหาร', 800.00, 'Approved', '2025-05-05', 'เลี้ยงอาหารลูกค้าหลังประชุม'),
(3, 'อดิศร ทองแท้', 'ค่าสัมมนา', 3200.00, 'Pending', '2025-05-06', 'ค่าสมัครงานสัมมนาเทคโนโลยี'),
(4, 'มณีรัตน์ พูนสุข', 'ค่าเดินทาง', 2000.00, 'Rejected', '2025-05-04', 'ค่ารถไฟฟ้าและรถตู้ไปอบรม'),
(5, 'วรชาติ สมจริง', 'ค่าเบี้ยเลี้ยง', 1200.00, 'Approved', '2025-05-03', 'เบี้ยเลี้ยงออกพื้นที่'),
(6, 'ศิริพร ตั้งใจดี', 'ค่าอาหาร', 650.00, 'Pending', '2025-05-02', 'ค่าอาหารกลางวันในการอบรม'),
(7, 'กิตติศักดิ์ มั่นคง', 'ค่าที่พัก', 2500.00, 'Approved', '2025-05-01', 'ค่าที่พักระหว่างการฝึกอบรมต่างจังหวัด'),
(8, 'พิมพ์ใจ จิตสงบ', 'ค่าสัมมนา', 3000.00, 'Rejected', '2025-04-30', 'ค่าอบรมพัฒนาทักษะ'),
(9, 'อารีย์ รัตนโชติ', 'ค่าเบี้ยเลี้ยง', 1100.00, 'Approved', '2025-04-29', 'เบี้ยเลี้ยงในพื้นที่ห่างไกล'),
(10, 'ธนพล สุขสันต์', 'ค่าเดินทาง', 1800.00, 'Pending', '2025-04-28', 'ค่ารถไปติดต่อลูกค้า');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `disbursements`
--
ALTER TABLE `disbursements`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `disbursements`
--
ALTER TABLE `disbursements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
