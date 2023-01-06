-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 06, 2023 at 09:43 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `CONTROLCAJA`
--

-- --------------------------------------------------------

--
-- Table structure for table `JORNADAS`
--

CREATE TABLE `JORNADAS` (
  `jornada_id` int(5) NOT NULL,
  `jornada_nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `JORNADAS`
--

INSERT INTO `JORNADAS` (`jornada_id`, `jornada_nombre`) VALUES
(1, 'SEMANA 7:00am - 1:00pm'),
(2, 'SEMANA 1:00pm 10:00pm'),
(3, 'SÁBADO 7:00am - 2:00pm'),
(4, 'SÁBADO 2:00pm - 10:00pm'),
(5, 'DOMINGO 8:00am - 4:00pm');

-- --------------------------------------------------------

--
-- Table structure for table `TURNOS`
--

CREATE TABLE `TURNOS` (
  `turno_id` int(5) NOT NULL,
  `turno_fecha_creado` date NOT NULL,
  `turno_jornada` int(5) NOT NULL COMMENT 'jornada_id',
  `turno_responsable` int(5) NOT NULL COMMENT 'user_id',
  `turno_saldo_caja` int(10) DEFAULT NULL,
  `turno_total_utilidad` int(10) DEFAULT NULL,
  `turno_total_entrega` int(10) DEFAULT NULL,
  `turno_descuadre` int(10) DEFAULT NULL,
  `turno_fecha_cierre` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `TURNOS`
--

INSERT INTO `TURNOS` (`turno_id`, `turno_fecha_creado`, `turno_jornada`, `turno_responsable`, `turno_saldo_caja`, `turno_total_utilidad`, `turno_total_entrega`, `turno_descuadre`, `turno_fecha_cierre`) VALUES
(1, '2022-12-30', 1, 1, 6000, 5000, 4000, 20000, '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `user_id` int(5) NOT NULL,
  `user_nombre` varchar(50) NOT NULL,
  `user_apellido` varchar(50) NOT NULL,
  `user_user` varchar(20) NOT NULL,
  `user_password` varchar(10) NOT NULL,
  `user_perfil` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`user_id`, `user_nombre`, `user_apellido`, `user_user`, `user_password`, `user_perfil`) VALUES
(1, 'YULY VANESSA', 'DIAZ', 'yudiaz', '1122', 1),
(2, 'LORENA', 'BUENO', 'lobueno', '1122', 1),
(3, 'KAROL', 'PULIDO', 'kapulido', '1122', 2),
(4, 'MARINO', 'PEREZ', 'mavictoria', '1122', 0),
(7, 'CRISTIAN', 'MONSALVE', 'crimonsalve', '1122', 2),
(8, 'ADMIN', 'SISTEMA', 'admin', '1122', 3);

-- --------------------------------------------------------

--
-- Table structure for table `VENTAS`
--

CREATE TABLE `VENTAS` (
  `venta_id` int(5) NOT NULL,
  `venta_fecha` date DEFAULT NULL,
  `venta_nombre_producto` varchar(50) NOT NULL,
  `venta_nombre_proveedor` varchar(50) NOT NULL,
  `venta_costo_producto` int(10) NOT NULL,
  `venta_valor_venta` int(10) NOT NULL,
  `venta_utilidad` int(10) NOT NULL,
  `user_id` int(5) DEFAULT NULL COMMENT 'vendedor',
  `turno_id` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `VENTAS`
--

INSERT INTO `VENTAS` (`venta_id`, `venta_fecha`, `venta_nombre_producto`, `venta_nombre_proveedor`, `venta_costo_producto`, `venta_valor_venta`, `venta_utilidad`, `user_id`, `turno_id`) VALUES
(28, NULL, 'PRODUCTO ROJO', 'LA FAVORITA', 5000, 6000, 5000, 3, 1),
(29, NULL, 'PRODUCTO AZUL', 'JORGE', 34000, 50000, 16000, 1, 1),
(30, NULL, 'PRODUCTO VERDE', 'FULIS', 5000, 7000, 2000, 2, 1),
(32, NULL, 'TERRAMICINA OJOS', 'HH', 45000, 50000, 5000, 2, 1),
(33, NULL, 'PRODUCTO CUARENTA', 'PIPI', 30000, 50000, 20000, 1, 1),
(34, NULL, 'PRODUCTO PRODUCTO', 'HOLA', 20000, 30000, 10000, 2, 1),
(36, NULL, 'ALKASELTZER', 'MUNI', 50000, 60000, 10, 4, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `JORNADAS`
--
ALTER TABLE `JORNADAS`
  ADD PRIMARY KEY (`jornada_id`);

--
-- Indexes for table `TURNOS`
--
ALTER TABLE `TURNOS`
  ADD PRIMARY KEY (`turno_id`),
  ADD KEY `turno_responsable` (`turno_responsable`),
  ADD KEY `turno_jornada` (`turno_jornada`);

--
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `VENTAS`
--
ALTER TABLE `VENTAS`
  ADD PRIMARY KEY (`venta_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `turno_id` (`turno_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `JORNADAS`
--
ALTER TABLE `JORNADAS`
  MODIFY `jornada_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `TURNOS`
--
ALTER TABLE `TURNOS`
  MODIFY `turno_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `VENTAS`
--
ALTER TABLE `VENTAS`
  MODIFY `venta_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `TURNOS`
--
ALTER TABLE `TURNOS`
  ADD CONSTRAINT `TURNOS_ibfk_1` FOREIGN KEY (`turno_responsable`) REFERENCES `USERS` (`user_id`),
  ADD CONSTRAINT `TURNOS_ibfk_2` FOREIGN KEY (`turno_jornada`) REFERENCES `JORNADAS` (`jornada_id`);

--
-- Constraints for table `VENTAS`
--
ALTER TABLE `VENTAS`
  ADD CONSTRAINT `VENTAS_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`user_id`),
  ADD CONSTRAINT `VENTAS_ibfk_2` FOREIGN KEY (`turno_id`) REFERENCES `TURNOS` (`turno_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
