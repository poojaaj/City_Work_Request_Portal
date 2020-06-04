-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 13, 2020 at 11:33 PM
-- Server version: 5.7.30
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `poojajee_Whats_up_city`
--

-- --------------------------------------------------------

--
-- Table structure for table `COMPLAINTS`
--

CREATE TABLE `COMPLAINTS` (
  `Complaint_id` int(11) NOT NULL,
  `Email` varchar(256) NOT NULL,
  `Anonymity` varchar(256) NOT NULL,
  `Latitude` varchar(50) NOT NULL,
  `Longitude` varchar(50) NOT NULL,
  `Category` varchar(255) NOT NULL,
  `Description` varchar(256) NOT NULL,
  `photo` varbinary(800) NOT NULL,
  `Solution` varchar(256) NOT NULL,
  `Status` varchar(256) NOT NULL,
  `Relationship` varchar(255) DEFAULT NULL,
  `Date` datetime(6) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `COMPLAINTS`
--

INSERT INTO `COMPLAINTS` (`Complaint_id`, `Email`, `Anonymity`, `Latitude`, `Longitude`, `Category`, `Description`, `photo`, `Solution`, `Status`, `Relationship`, `Date`) VALUES
(1, 'poojaashokjeergyal@gmail.com', 'Yes', '32.730239328237865', '-97.12051274254918', 'Education', 'Not enough study materials', 0x75706c6f6164732f636f6d706c61696e74732f313538393135373734312d38323764653764312d666136612d346135392d616635302d3239663362373133373431382e6a7067, 'School should provide more material and teaching staff', 'New', 'Lives', '2020-05-11 00:00:00.000000'),
(2, 'poojajeergyal@gmail.com', 'Yes', '32.73357353608708', '-97.12897846475244', 'Emergency and fire response', 'Need better training ', 0x75706c6f6164732f636f6d706c61696e74732f313538393135383931322d32393765346630352d623732322d346465632d623835332d3132373035306334356563392e706e67, '', 'InProgress', 'Lives', '2020-05-11 00:00:00.000000'),
(3, 'harshapps1@gmail.com', 'No', '32.73060598409846', '-97.12151421234012', 'Education', 'Proper lighting at meadow', 0x75706c6f6164732f636f6d706c61696e74732f313538393136303734312d33383665323261302d646266332d343933332d393839302d6537303766313838633439612e6a7067, '', 'Completed', 'Lives', '2020-05-11 00:00:00.000000'),
(4, 'sindiya@gmail.com', 'Yes', '32.73139989985307', '-97.12141530339096', 'Housing', 'The air conditionerâ€™s filters have become old', 0x75706c6f6164732f636f6d706c61696e74732f313538393232363331342d33424133364336382d414146302d343034372d423546382d3730394646433444463530312e6a7067, 'Need new filters', 'New', 'Lives', '2020-05-11 00:00:00.000000'),
(5, 'Aditiya.ravikumar@gmail.com', 'Yes', '9.999345891240452', '9.994593457555254', 'Environment', 'Garbage disposed every where', 0x75706c6f6164732f636f6d706c61696e74732f313538393233303532322d30444139464641322d433630332d344630442d384137422d4235363236304337333233372e6a7067, 'The dumpster near my house us never cleared out', 'New', 'Lives', '2020-05-11 00:00:00.000000'),
(6, 'abhaysingh200009@gmail.com', 'Yes', '9.999999999999986', '9.998654611459472', 'Security', 'Report burglary near my house', 0x75706c6f6164732f636f6d706c61696e74732f313538393233303939382d33454631324232332d414238392d344246382d424342412d3132443144394335383434332e6a7067, 'Need more security', 'New', 'Lives', '2020-05-11 00:00:00.000000'),
(7, 'poojaashokjeergyal@gmail.com', 'No', '32.730315761814865', '-97.12064115330577', 'Economic Activity', 'Test', 0x75706c6f6164732f636f6d706c61696e74732f313538393235323935342d30363630366161332d383935322d343139322d383664642d6534316431663965616336632e6a7067, 'Test', 'Completed', 'Lives', '2020-05-12 00:00:00.000000'),
(8, 'pooja@gmail.com', 'Yes', '32.72976548883082', '-97.12637638673186', 'Education', 'Need more study materials for the kids', 0x75706c6f6164732f636f6d706c61696e74732f313538393235343834392d62343138376336632d383331372d346431312d623038302d6632393865333565313138662e6a7067, 'Schools should provide more study materials', 'Completed', 'Lives', '2020-05-12 00:00:00.000000'),
(9, 'poojajeergyal@gmail.com', 'No', '32.72000816678502', '-97.15354280546308', 'Formal Employment', 'Test Spanish', 0x75706c6f6164732f636f6d706c61696e74732f313538393236383633322d33656661316565362d386237392d346239392d393835302d3831306162396664373335662e6a7067, '', 'New', 'Lives', '2020-05-12 00:00:00.000000'),
(10, 'poojae@gmail.com', 'Yes', '32.73147831499723', '-97.13099079206586', 'Education', 'Need more books in the school library', 0x75706c6f6164732f636f6d706c61696e74732f313538393237343532322d39336263363534662d363964342d346533322d393732302d3862313730386439326336372e6a7067, 'The library collection needs to be updated', 'Completed', 'Lives', '2020-05-12 00:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `Report`
--

CREATE TABLE `Report` (
  `Complaint_id` int(255) NOT NULL,
  `Comments` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `role` varchar(250) NOT NULL DEFAULT 'User',
  `fname` varchar(250) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `language` varchar(20) NOT NULL,
  `city` varchar(255) NOT NULL,
  `relationship` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `password`, `role`, `fname`, `lname`, `language`, `city`, `relationship`) VALUES
('poojaashokjeergyal@gmail.com', 'pass123', 'User', 'Pooja', 'Jeergyal', 'English', 'Cali', 'Lives'),
('abhaysingh200009@gmail.com', 'abhay1234', 'User', 'Abhay', 'Singh', 'English', 'Lecherias', 'In-Transit'),
('Aditiya.ravikumar@gmail.com', 'aditiya123', 'User', 'Aditiya', 'Ravi', 'English', 'Lecherias', 'Works'),
('eli7diaz@gmail.com', '585571', 'Admin', 'Elizabeth', 'Diaz', 'English', 'Lecherias', 'Lives'),
('Sindiya@gmail.com', 'qwer12345', 'User', 'Sindiya', 'Sirishab', 'English', 'Cali', 'Lives'),
('harshapps1@gmail.com', 'qwer1234', 'User', 'Harsha', 'Pps', 'English', 'Cali', 'Lives'),
('te', 'te', 'User', 'Pooja', 'J', 'English', 'Cali', 'Lives'),
('poojajeergyal@gmail.com', 'pass1234', 'User', 'Pooja', 'J', 'Spanish', 'Cali', 'Lives'),
('pooja@gmail.com', 'pooja123', 'User', 'Pooja', 'J', 'English', 'Cali', 'Lives'),
('Poojaadmin@gmail.com', 'pass123', 'Admin', 'Pooja', 'Admin', 'English', 'Cali', 'Works'),
('Abhay.singh@uta.edu', 'www123', 'Admin', 'Abhay', 'Singh', 'Spanish', 'Arlie', 'Lives'),
('Abhay.singh2@mavs.uta.edu', 'qqq123', 'Admin', 'Abhay', 'Singh', 'Spanish', 'Dallas', 'Works'),
('Abhay@gmail.com', 'abhay', 'Admin', 'Abhay', 'Abhay', 'English', 'Abhay', 'Lives'),
('Pj@gmail.com', 'pass123', 'User', 'Pooja', 'J', 'English', 'Cali', 'Lives');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `COMPLAINTS`
--
ALTER TABLE `COMPLAINTS`
  ADD PRIMARY KEY (`Complaint_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `COMPLAINTS`
--
ALTER TABLE `COMPLAINTS`
  MODIFY `Complaint_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
