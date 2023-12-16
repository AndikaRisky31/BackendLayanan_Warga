-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2023 at 07:40 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `layanan_warga`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_kelurahan`
--

CREATE TABLE `admin_kelurahan` (
  `id` int(10) UNSIGNED NOT NULL,
  `kelurahan_id` int(10) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pangkat` varchar(20) DEFAULT NULL,
  `nomor` varchar(15) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `alamat` int(11) NOT NULL,
  `imageURL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_kelurahan`
--

INSERT INTO `admin_kelurahan` (`id`, `kelurahan_id`, `nama`, `password`, `pangkat`, `nomor`, `email`, `alamat`, `imageURL`) VALUES
(4, 1, 'pak P', 'hallooo', NULL, NULL, '', 0, ''),
(5, 1, 'pak yyy', 'tesss', NULL, NULL, '', 0, ''),
(6, 1, 'pak tt', 'aaa', NULL, NULL, '', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `agenda`
--

CREATE TABLE `agenda` (
  `agenda_id` int(10) UNSIGNED NOT NULL,
  `kelurahan_id` int(10) UNSIGNED NOT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL,
  `imageURL` varchar(255) NOT NULL,
  `tempat` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agenda`
--

INSERT INTO `agenda` (`agenda_id`, `kelurahan_id`, `judul`, `tanggal`, `imageURL`, `tempat`) VALUES
(1, 1, 'Menanam padi', '2023-12-20 22:48:10', 'https://render.fineartamerica.com/images/rendered/search/print/6/8/break/images-medium-5/awesome-solitude-bess-hamiti.jpg', 'puskesmas'),
(2, 1, 'memasak nasi', '2023-12-11 22:48:10', 'https://render.fineartamerica.com/images/rendered/search/print/6/8/break/images-medium-5/awesome-solitude-bess-hamiti.jpg', 'pasar banjarejo'),
(3, 1, 'Menanam padi', '2023-12-20 22:48:10', 'https://render.fineartamerica.com/images/rendered/search/print/6/8/break/images-medium-5/awesome-solitude-bess-hamiti.jpg', 'puskesmas'),
(4, 1, 'memasak nasi', '2023-12-11 22:48:10', 'https://render.fineartamerica.com/images/rendered/search/print/6/8/break/images-medium-5/awesome-solitude-bess-hamiti.jpg', 'pasar banjarejo');

-- --------------------------------------------------------

--
-- Table structure for table `kelurahan`
--

CREATE TABLE `kelurahan` (
  `kelurahan_id` int(10) UNSIGNED NOT NULL,
  `nama_kelurahan` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kelurahan`
--

INSERT INTO `kelurahan` (`kelurahan_id`, `nama_kelurahan`) VALUES
(1, 'Karangtalun');

-- --------------------------------------------------------

--
-- Table structure for table `laporan`
--

CREATE TABLE `laporan` (
  `laporan_ID` int(10) UNSIGNED NOT NULL,
  `userGeneral_id` int(10) UNSIGNED NOT NULL,
  `bukti_laporan` varchar(255) NOT NULL,
  `lokasi_laporan` text NOT NULL,
  `jenis_laporan` enum('Infrastruktur dan Lingkungan','Keamanan dan Ketertiban','Ekonomi','Kesehatan dan Layanan Kesehatan') NOT NULL,
  `deskripsi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengajuan`
--

CREATE TABLE `pengajuan` (
  `pengajuan_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `jenis_surat` enum('Surat Pengantar','Keterangan Tidak Mampu','Pembuatan Keluarga') NOT NULL,
  `tanggal_pengajuan` datetime NOT NULL,
  `proses` enum('%Terkirim','Diproses','Sudah Diproses','Selesai') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `perangkat_kelurahan`
--

CREATE TABLE `perangkat_kelurahan` (
  `perangkat_kelurahan_id` int(10) UNSIGNED NOT NULL,
  `kelurahan_id` int(10) UNSIGNED NOT NULL,
  `nama` varchar(40) NOT NULL,
  `jabatan` varchar(40) DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `super_admin`
--

CREATE TABLE `super_admin` (
  `superadmin_id` int(10) UNSIGNED NOT NULL,
  `username` varchar(45) NOT NULL,
  `super_admin_password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `super_admin`
--

INSERT INTO `super_admin` (`superadmin_id`, `username`, `super_admin_password`) VALUES
(1, 'Andika Risky F', 'konyol'),
(2, 'Andika Risky F', 'konyol');

-- --------------------------------------------------------

--
-- Table structure for table `usergeneral`
--

CREATE TABLE `usergeneral` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `kelurahan_id` int(10) UNSIGNED NOT NULL,
  `username` varchar(40) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `nomor` varchar(15) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `tempatLahir` text DEFAULT NULL,
  `TanggalLahir` date DEFAULT NULL,
  `imageURL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usergeneral`
--

INSERT INTO `usergeneral` (`user_id`, `kelurahan_id`, `username`, `password`, `email`, `nomor`, `alamat`, `tempatLahir`, `TanggalLahir`, `imageURL`) VALUES
(2, 1, 'andika', 'andika', 'andikafaizatama@gmail.com', '08213', 'Pabelan, Kartasura,Sukoharjo', 'Blora', '2005-05-10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_kelurahan`
--
ALTER TABLE `admin_kelurahan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_kelurahan_FKIndex1` (`kelurahan_id`);

--
-- Indexes for table `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`agenda_id`),
  ADD KEY `agenda_FKIndex1` (`kelurahan_id`);

--
-- Indexes for table `kelurahan`
--
ALTER TABLE `kelurahan`
  ADD PRIMARY KEY (`kelurahan_id`);

--
-- Indexes for table `laporan`
--
ALTER TABLE `laporan`
  ADD PRIMARY KEY (`laporan_ID`),
  ADD KEY `Laporan_FKIndex1` (`userGeneral_id`);

--
-- Indexes for table `pengajuan`
--
ALTER TABLE `pengajuan`
  ADD PRIMARY KEY (`pengajuan_id`),
  ADD KEY `pengajuan_FKIndex1` (`user_id`);

--
-- Indexes for table `perangkat_kelurahan`
--
ALTER TABLE `perangkat_kelurahan`
  ADD PRIMARY KEY (`perangkat_kelurahan_id`),
  ADD KEY `perangkat_kelurahan_FKIndex1` (`kelurahan_id`);

--
-- Indexes for table `super_admin`
--
ALTER TABLE `super_admin`
  ADD PRIMARY KEY (`superadmin_id`);

--
-- Indexes for table `usergeneral`
--
ALTER TABLE `usergeneral`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `userGeneral_FKIndex1` (`kelurahan_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_kelurahan`
--
ALTER TABLE `admin_kelurahan`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `agenda`
--
ALTER TABLE `agenda`
  MODIFY `agenda_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `kelurahan`
--
ALTER TABLE `kelurahan`
  MODIFY `kelurahan_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `laporan`
--
ALTER TABLE `laporan`
  MODIFY `laporan_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengajuan`
--
ALTER TABLE `pengajuan`
  MODIFY `pengajuan_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perangkat_kelurahan`
--
ALTER TABLE `perangkat_kelurahan`
  MODIFY `perangkat_kelurahan_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `super_admin`
--
ALTER TABLE `super_admin`
  MODIFY `superadmin_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usergeneral`
--
ALTER TABLE `usergeneral`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_kelurahan`
--
ALTER TABLE `admin_kelurahan`
  ADD CONSTRAINT `admin_kelurahan_ibfk_1` FOREIGN KEY (`kelurahan_id`) REFERENCES `kelurahan` (`kelurahan_id`) ON DELETE CASCADE;

--
-- Constraints for table `agenda`
--
ALTER TABLE `agenda`
  ADD CONSTRAINT `agenda_ibfk_1` FOREIGN KEY (`kelurahan_id`) REFERENCES `kelurahan` (`kelurahan_id`) ON DELETE CASCADE;

--
-- Constraints for table `laporan`
--
ALTER TABLE `laporan`
  ADD CONSTRAINT `laporan_ibfk_1` FOREIGN KEY (`userGeneral_id`) REFERENCES `usergeneral` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pengajuan`
--
ALTER TABLE `pengajuan`
  ADD CONSTRAINT `pengajuan_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usergeneral` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `perangkat_kelurahan`
--
ALTER TABLE `perangkat_kelurahan`
  ADD CONSTRAINT `perangkat_kelurahan_ibfk_1` FOREIGN KEY (`kelurahan_id`) REFERENCES `kelurahan` (`kelurahan_id`) ON DELETE CASCADE;

--
-- Constraints for table `usergeneral`
--
ALTER TABLE `usergeneral`
  ADD CONSTRAINT `usergeneral_ibfk_1` FOREIGN KEY (`kelurahan_id`) REFERENCES `kelurahan` (`kelurahan_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
