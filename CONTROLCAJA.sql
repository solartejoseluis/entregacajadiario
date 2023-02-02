-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 02-02-2023 a las 19:08:43
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `CONTROLCAJA`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ACCESOS`
--

CREATE TABLE `ACCESOS` (
  `acceso_id` int(5) NOT NULL,
  `turno_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ACCESOS`
--

INSERT INTO `ACCESOS` (`acceso_id`, `turno_id`, `user_id`) VALUES
(4, 114, 2),
(5, 115, 2),
(6, 116, 2),
(7, 116, 2),
(8, 117, 2),
(9, 118, 2),
(10, 119, 2),
(11, 120, 2),
(12, 121, 2),
(13, 122, 2),
(14, 123, 2),
(15, 124, 2),
(16, 125, 2),
(17, 126, 2),
(18, 127, 2),
(19, 129, 2),
(20, 130, 2),
(21, 131, 2),
(22, 132, 2),
(23, 133, 2),
(24, 134, 2),
(25, 135, 2),
(26, 136, 2),
(27, 137, 2),
(28, 138, 2),
(29, 139, 2),
(30, 140, 2),
(31, 141, 2),
(32, 142, 2),
(33, 143, 2),
(34, 144, 2),
(35, 145, 2),
(36, 146, 2),
(37, 147, 2),
(38, 148, 2),
(39, 149, 2),
(40, 150, 2),
(41, 151, 2),
(42, 152, 2),
(43, 153, 2),
(44, 154, 2),
(45, 155, 1),
(46, 156, 1),
(47, 157, 1),
(48, 158, 1),
(49, 159, 1),
(50, 160, 2),
(51, 161, 2),
(52, 162, 2),
(53, 163, 2),
(54, 164, 2),
(55, 165, 2),
(56, 166, 2),
(57, 167, 2),
(58, 168, 2),
(59, 169, 2),
(60, 170, 2),
(61, 171, 2),
(62, 172, 2),
(63, 173, 2),
(64, 174, 2),
(65, 175, 2),
(66, 176, 2),
(67, 177, 2),
(68, 178, 2),
(69, 179, 2),
(70, 180, 2),
(71, 181, 2),
(72, 182, 2),
(73, 183, 2),
(74, 184, 2),
(75, 185, 2),
(76, 186, 2),
(77, 187, 2),
(78, 188, 2),
(79, 189, 2),
(80, 190, 2),
(81, 191, 2),
(82, 192, 2),
(83, 193, 2),
(84, 194, 2),
(85, 195, 2),
(86, 196, 2),
(87, 197, 2),
(88, 198, 2),
(89, 199, 2),
(90, 200, 2),
(91, 201, 2),
(92, 202, 2),
(93, 203, 2),
(94, 204, 2),
(95, 205, 2),
(96, 206, 2),
(97, 207, 2),
(98, 208, 2),
(99, 209, 2),
(100, 210, 2),
(101, 211, 2),
(102, 212, 2),
(103, 213, 2),
(104, 214, 1),
(105, 215, 2),
(106, 216, 2),
(107, 217, 2),
(108, 218, 1),
(109, 219, 2),
(110, 220, 2),
(111, 221, 1),
(112, 222, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `JORNADAS`
--

CREATE TABLE `JORNADAS` (
  `jornada_id` int(5) NOT NULL,
  `jornada_nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `JORNADAS`
--

INSERT INTO `JORNADAS` (`jornada_id`, `jornada_nombre`) VALUES
(1, 'SEMANA 7:00am - 1:00pm'),
(2, 'SEMANA 1:00pm 10:00pm'),
(3, 'SÁBADO 7:00am - 2:00pm'),
(4, 'SÁBADO 2:00pm - 10:00pm'),
(5, 'DOM / FEST 8:00am - 4:00pm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TURNOS`
--

CREATE TABLE `TURNOS` (
  `turno_id` int(5) NOT NULL,
  `turno_fecha_creado` date DEFAULT NULL,
  `turno_jornada` int(5) NOT NULL COMMENT 'jornada_id',
  `turno_responsable` int(5) NOT NULL COMMENT 'user_id',
  `turno_saldo_caja` int(10) DEFAULT NULL,
  `turno_total_utilidad` int(10) DEFAULT NULL,
  `turno_total_entrega` int(10) DEFAULT NULL,
  `turno_descuadre` int(10) DEFAULT NULL,
  `turno_creacion_timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `TURNOS`
--

INSERT INTO `TURNOS` (`turno_id`, `turno_fecha_creado`, `turno_jornada`, `turno_responsable`, `turno_saldo_caja`, `turno_total_utilidad`, `turno_total_entrega`, `turno_descuadre`, `turno_creacion_timestamp`) VALUES
(100, '2023-01-09', 5, 2, 1554900, 0, 1554900, 0, '2023-01-12 22:05:09'),
(101, '2023-01-10', 1, 2, 344900, 2900, 347800, 0, '2023-01-12 22:09:28'),
(102, '2023-01-21', 2, 1, 975100, 76900, 1052000, 6500, '2023-01-12 22:20:13'),
(103, '2023-01-20', 1, 1, 316400, 25000, 341400, 0, '2023-01-12 22:37:41'),
(104, '2023-01-11', 2, 2, 928100, 17000, 945100, 0, '2023-01-12 22:41:45'),
(105, '2023-01-25', 1, 2, 198300, 0, 198300, 0, '2023-01-12 22:49:22'),
(109, '2023-01-26', 2, 2, 60000, 40000, 100000, 0, '2023-01-18 02:59:49'),
(114, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:02:56'),
(115, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:03:36'),
(116, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:05:14'),
(117, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:08:50'),
(118, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:14:19'),
(119, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:14:58'),
(120, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:24:10'),
(121, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:36:03'),
(122, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:44:00'),
(123, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:45:31'),
(124, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:47:46'),
(125, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:48:46'),
(126, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:49:42'),
(127, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:52:14'),
(128, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:54:37'),
(129, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:55:29'),
(130, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:56:41'),
(131, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 15:57:26'),
(132, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 16:00:25'),
(133, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 16:01:14'),
(134, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 16:03:07'),
(135, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 16:05:30'),
(136, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 16:18:09'),
(137, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 16:27:36'),
(138, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 16:31:06'),
(139, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 16:35:37'),
(140, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 16:39:24'),
(141, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 16:41:35'),
(142, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 16:45:13'),
(143, '2023-01-28', 1, 2, NULL, NULL, NULL, NULL, '2023-01-28 16:46:59'),
(144, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 14:34:02'),
(145, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 14:40:17'),
(146, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 14:42:56'),
(147, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 14:50:51'),
(148, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 14:51:59'),
(149, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 14:53:56'),
(150, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 14:59:12'),
(151, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 15:00:56'),
(152, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 15:01:48'),
(153, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 15:04:41'),
(154, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 15:12:22'),
(155, '2023-01-29', 1, 1, NULL, NULL, NULL, NULL, '2023-01-29 15:13:29'),
(156, '2023-01-29', 2, 1, NULL, NULL, NULL, NULL, '2023-01-29 15:15:49'),
(157, '2023-01-29', 2, 1, NULL, NULL, NULL, NULL, '2023-01-29 15:16:33'),
(158, '2023-01-29', 1, 1, NULL, NULL, NULL, NULL, '2023-01-29 15:18:56'),
(159, '2023-01-29', 1, 1, NULL, NULL, NULL, NULL, '2023-01-29 15:19:58'),
(160, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 15:20:34'),
(161, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 15:22:28'),
(162, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 15:23:33'),
(163, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 15:24:49'),
(164, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 15:26:31'),
(165, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 15:31:33'),
(166, '2023-01-29', 2, 2, NULL, NULL, NULL, NULL, '2023-01-29 15:32:04'),
(167, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 15:32:49'),
(168, '2023-01-29', 1, 2, NULL, NULL, NULL, NULL, '2023-01-29 15:33:35'),
(169, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 00:21:00'),
(170, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 00:25:59'),
(171, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 00:31:31'),
(172, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 00:31:59'),
(173, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 00:34:29'),
(174, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 00:45:06'),
(175, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 00:45:41'),
(176, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 00:55:22'),
(177, '2023-01-30', 2, 2, NULL, NULL, NULL, NULL, '2023-01-30 00:57:51'),
(178, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 00:59:27'),
(179, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 01:01:01'),
(180, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 01:03:11'),
(181, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 01:05:43'),
(182, '2023-01-30', 2, 2, NULL, NULL, NULL, NULL, '2023-01-30 01:06:59'),
(183, '2023-01-30', 2, 2, NULL, NULL, NULL, NULL, '2023-01-30 02:24:10'),
(184, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 02:34:19'),
(185, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 02:35:12'),
(186, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 02:40:11'),
(187, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 02:48:43'),
(188, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 02:53:34'),
(189, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:00:06'),
(190, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:04:32'),
(191, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:06:32'),
(192, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:11:39'),
(193, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:13:04'),
(194, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:16:21'),
(195, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:20:49'),
(196, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:24:28'),
(197, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:30:24'),
(198, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:34:14'),
(199, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:37:21'),
(200, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:38:58'),
(201, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:42:45'),
(202, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:44:24'),
(203, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:51:09'),
(204, '2023-01-30', 2, 2, NULL, NULL, NULL, NULL, '2023-01-30 03:57:54'),
(205, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 04:06:13'),
(206, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 04:25:46'),
(207, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 04:46:30'),
(208, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 20:03:31'),
(209, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 20:04:53'),
(210, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 20:40:10'),
(211, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 21:10:57'),
(212, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 21:19:39'),
(213, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 21:27:16'),
(214, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 21:41:26'),
(215, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 22:34:15'),
(216, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 22:58:22'),
(217, '2023-01-30', 1, 2, NULL, NULL, NULL, NULL, '2023-01-30 23:02:52'),
(218, '2023-01-31', 1, 1, NULL, NULL, NULL, NULL, '2023-01-31 00:15:37'),
(219, '2023-01-31', 1, 2, NULL, NULL, NULL, NULL, '2023-01-31 18:35:46'),
(220, '2023-01-31', 1, 2, NULL, NULL, NULL, NULL, '2023-01-31 20:11:37'),
(221, '2023-02-01', 1, 1, NULL, NULL, NULL, NULL, '2023-02-01 05:04:23'),
(222, '2023-02-01', 1, 1, NULL, NULL, NULL, NULL, '2023-02-01 05:13:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USERS`
--

CREATE TABLE `USERS` (
  `user_id` int(5) NOT NULL,
  `user_nombre` varchar(50) NOT NULL,
  `user_apellido` varchar(50) NOT NULL,
  `user_user` varchar(20) NOT NULL,
  `user_password` varchar(10) NOT NULL,
  `user_perfil` int(5) NOT NULL,
  `user_vendedor` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `USERS`
--

INSERT INTO `USERS` (`user_id`, `user_nombre`, `user_apellido`, `user_user`, `user_password`, `user_perfil`, `user_vendedor`) VALUES
(1, 'YULY VANESSA', 'DIAZ', 'yudiaz', '1122', 1, 1),
(2, 'LORENA', 'BUENO', 'lobueno', '1122', 1, 1),
(3, 'KAROL', 'PULIDO', 'kapulido', '1122', 2, 1),
(4, 'MARINO', 'PEREZ', 'mavictoria', '1122', 0, 1),
(7, 'CRISTIAN', 'MONSALVE', 'crimonsalve', '1122', 2, 0),
(8, 'ADMIN', 'SISTEMA', 'admin', '1122', 3, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `VENTAS`
--

CREATE TABLE `VENTAS` (
  `venta_id` int(5) NOT NULL,
  `venta_fecha` timestamp NULL DEFAULT current_timestamp(),
  `venta_nombre_producto` varchar(50) NOT NULL,
  `venta_nombre_proveedor` varchar(50) NOT NULL,
  `venta_costo_producto` int(10) NOT NULL,
  `venta_valor_venta` int(10) NOT NULL,
  `venta_utilidad` int(10) NOT NULL,
  `user_id` int(5) DEFAULT NULL COMMENT 'vendedor',
  `turno_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `VENTAS`
--

INSERT INTO `VENTAS` (`venta_id`, `venta_fecha`, `venta_nombre_producto`, `venta_nombre_proveedor`, `venta_costo_producto`, `venta_valor_venta`, `venta_utilidad`, `user_id`, `turno_id`) VALUES
(100, '2023-02-10 15:09:45', 'FACETIX SUAVE', 'FAVORITA', 10000, 12900, 2900, 2, 101),
(101, '2023-02-10 19:20:30', 'MUXOL FLEM NIÑOS', 'SALUD DESCUENTOS', 32000, 48000, 16000, 1, 102),
(102, '2023-02-10 19:22:47', 'GELCLAIR', 'SALUD DESCUENTOS', 14300, 18300, 4000, 1, 102),
(103, '2023-02-10 19:21:00', 'DOLEX 2+', 'SALUD DESCUENTOS', 10500, 12800, 2300, 1, 102),
(104, '2023-02-10 19:26:01', 'VALSARTAN 160 MK', 'SALUD DESCUENTOS', 39900, 48500, 8600, 1, 102),
(105, '2023-02-10 19:27:29', 'QUETIAPINA 25 MG MK', 'SALUD DESCUENTOS', 11500, 13500, 2000, 1, 102),
(106, '2023-02-10 19:28:48', 'NEURO UP', 'SALUD DESCUENTOS', 79600, 95600, 16000, 1, 102),
(107, '2023-01-10 19:30:18', 'ANEMIDOX', 'RENE', 60000, 78000, 18000, 1, 102),
(108, '2023-01-10 19:31:40', 'TRANEXAM', 'SALUD DESCUENTOS', 29700, 39700, 10000, 1, 102),
(109, '2023-01-11 15:37:53', 'MUXOL NIÑOS', 'SALUD DESCUENTOS', 32000, 47000, 15000, 1, 103),
(110, '2023-01-11 15:39:12', 'AGUJAS PRUEBA', 'FELIPE', 10000, 20000, 10000, 1, 103),
(111, '2023-01-11 19:41:52', 'MAXIPROS', 'ANDINA', 25000, 27000, 2000, 2, 104),
(112, '2023-02-11 19:43:02', 'BECLOMETASONA', 'YOLANDA', 15000, 25000, 10000, 2, 109),
(113, '2023-01-11 19:44:12', 'TRANEXAMICO', 'SALUD DESCUENTOS', 29700, 34700, 5000, 1, 109),
(122, '2023-03-18 03:00:26', 'PRODUCTO UNO', 'PRO UNO', 50000, 60000, 10000, 1, 205),
(124, '2023-01-30 04:08:31', '3', '3', 3, 3, 0, 2, 205),
(125, '2023-01-30 04:19:30', '4', '4', 4, 4, 0, 2, 205),
(126, '2023-01-30 04:19:57', '5', '5', 5, 5, 0, 2, 205),
(127, '2023-01-30 04:21:36', '6', '6', 6, 6, 0, 2, 205),
(128, '2023-01-30 04:26:13', '1', '1', 1, 1, 0, 2, 206),
(129, '2023-01-30 04:41:43', '2', '2', 2, 2, 0, 2, 206),
(130, '2023-01-30 04:42:31', '3', '3', 3, 3, 0, 2, 206),
(131, '2023-01-30 04:43:25', '5', '5', 5, 5, 0, 2, 206),
(132, '2023-01-30 04:46:43', '2', '2', 2, 2, 0, 2, 207),
(133, '2023-01-30 04:46:55', '3', '3', 3, 3, 0, 1, 207),
(134, '2023-01-30 04:47:13', '5', '5', 5, 5, 0, 2, 207),
(135, '2023-01-30 20:05:06', '4', '4', 4, 4, 0, 2, 209),
(136, '2023-01-30 20:40:29', '2', '2', 2, 2, 0, 2, 210),
(137, '2023-01-30 21:11:12', 'PRODUCTO CAMBIADO', 'PROVEEDOR CAMBIADO', 10000, 20000, 10000, 2, 211),
(139, '2023-01-30 21:14:51', '8', '8', 8, 8, 0, 2, 211),
(140, '2023-01-30 21:20:08', 'PRODUCTO UNO', 'PRO 55', 4000, 10000, 6000, 2, 212),
(141, '2023-01-30 21:21:59', 'PRODUCTO DOS', 'PRO 556', 5000, 10000, 5000, 2, 212),
(142, '2023-01-30 21:27:34', 'PRODUCTO A', 'PRO 567', 20000, 30000, 10000, 2, 213),
(143, '2023-01-30 21:41:52', 'PRODUCTO AZUL', 'PRO 667', 2000, 50000, 48000, 2, 214),
(144, '2023-01-30 21:42:38', 'PRODUCTO VERDE', 'PRO 54', 3000, 5000, 2000, 2, 214),
(145, '2023-01-30 21:45:59', 'PRODCUTO ROJO', 'PRO 56', 1000, 3000, 2000, 1, 214),
(146, '2023-01-30 21:46:30', 'PRODUCTO ROSADO', 'PRO 23', 5000, 10000, 5000, 4, 214),
(147, '2023-01-30 22:34:34', 'PRODUCTO UNO', 'PRO 34', 4000, 5000, 1000, 2, 215),
(148, '2023-01-30 22:39:49', 'PRO4', 'P456', 6000, 10000, 4000, 2, 215),
(149, '2023-01-30 23:05:27', 'PRODUCTO', 'PRO 88', 20000, 40000, 20000, 2, 217),
(150, '2023-01-31 00:16:24', 'PRETRR ', 'PRO 567', 20000, 30000, 10000, 1, 218),
(151, '2023-01-31 00:16:57', 'PR 4', 'D', 10000, 30000, 20000, 1, 218),
(152, '2023-01-31 18:36:39', '8', '8', 40000, 60000, 20000, 2, 219),
(154, '2023-01-31 20:22:46', 'PRODUCTO 566', 'PROVEEDOR 44', 50000, 100000, 50000, 2, 220),
(155, '2023-01-31 21:17:12', '8', '8', 40000, 100000, 60000, 2, 220),
(156, '2023-02-01 00:59:50', '7', '7', 50000, 70000, 20000, 2, 220),
(157, '2023-02-01 01:00:45', '9', '9', 60000, 150000, 90000, 1, 220),
(158, '2023-02-01 05:04:44', 'PRODUCTO VERDE', 'PV 8', 10000, 20000, 10000, 1, 221),
(159, '2023-02-01 05:06:20', 'P2', 'PRO4', 50000, 100000, 50000, 1, 221),
(160, '2023-02-01 05:19:43', '5', '5', 5, 5, 0, 1, 222),
(161, '2023-02-01 05:24:04', '9', '9', 10000, 20000, 10000, 1, 222);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ACCESOS`
--
ALTER TABLE `ACCESOS`
  ADD PRIMARY KEY (`acceso_id`);

--
-- Indices de la tabla `JORNADAS`
--
ALTER TABLE `JORNADAS`
  ADD PRIMARY KEY (`jornada_id`);

--
-- Indices de la tabla `TURNOS`
--
ALTER TABLE `TURNOS`
  ADD PRIMARY KEY (`turno_id`),
  ADD KEY `turno_responsable` (`turno_responsable`),
  ADD KEY `turno_jornada` (`turno_jornada`);

--
-- Indices de la tabla `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`user_id`);

--
-- Indices de la tabla `VENTAS`
--
ALTER TABLE `VENTAS`
  ADD PRIMARY KEY (`venta_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `turno_id` (`turno_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ACCESOS`
--
ALTER TABLE `ACCESOS`
  MODIFY `acceso_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT de la tabla `JORNADAS`
--
ALTER TABLE `JORNADAS`
  MODIFY `jornada_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `TURNOS`
--
ALTER TABLE `TURNOS`
  MODIFY `turno_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=223;

--
-- AUTO_INCREMENT de la tabla `USERS`
--
ALTER TABLE `USERS`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `VENTAS`
--
ALTER TABLE `VENTAS`
  MODIFY `venta_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `TURNOS`
--
ALTER TABLE `TURNOS`
  ADD CONSTRAINT `TURNOS_ibfk_1` FOREIGN KEY (`turno_responsable`) REFERENCES `USERS` (`user_id`),
  ADD CONSTRAINT `TURNOS_ibfk_2` FOREIGN KEY (`turno_jornada`) REFERENCES `JORNADAS` (`jornada_id`);

--
-- Filtros para la tabla `VENTAS`
--
ALTER TABLE `VENTAS`
  ADD CONSTRAINT `VENTAS_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`user_id`),
  ADD CONSTRAINT `VENTAS_ibfk_2` FOREIGN KEY (`turno_id`) REFERENCES `TURNOS` (`turno_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
