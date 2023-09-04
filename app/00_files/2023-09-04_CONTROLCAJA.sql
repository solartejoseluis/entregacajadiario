-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 04-09-2023 a las 21:25:02
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

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
  `user_id` int(5) NOT NULL,
  `fecha_hora_creado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ACCESOS`
--

INSERT INTO `ACCESOS` (`acceso_id`, `turno_id`, `user_id`, `fecha_hora_creado`) VALUES
(119, 229, 2, '2023-02-09 21:16:20'),
(120, 243, 2, '2023-02-09 21:16:20'),
(121, 244, 1, '2023-02-09 21:16:20'),
(122, 246, 1, '2023-02-10 12:08:56'),
(123, 247, 2, '2023-02-10 17:48:24'),
(124, 248, 2, '2023-02-11 12:14:07'),
(125, 249, 1, '2023-02-11 18:59:29'),
(126, 250, 1, '2023-02-12 13:07:37'),
(127, 251, 1, '2023-02-13 12:01:47'),
(128, 252, 2, '2023-02-13 17:48:25'),
(129, 253, 2, '2023-02-14 11:57:00'),
(130, 254, 1, '2023-02-14 18:02:25'),
(131, 255, 1, '2023-02-15 12:12:18'),
(132, 256, 2, '2023-02-15 17:58:20'),
(133, 257, 2, '2023-02-16 11:50:43'),
(134, 258, 1, '2023-02-16 17:56:58'),
(135, 259, 1, '2023-02-17 11:59:00'),
(136, 260, 2, '2023-02-17 18:00:54'),
(137, 261, 1, '2023-02-18 12:04:42'),
(138, 262, 2, '2023-02-18 18:45:42'),
(139, 263, 2, '2023-02-19 12:55:07'),
(140, 264, 1, '2023-02-20 12:12:10'),
(141, 265, 2, '2023-02-20 18:04:45'),
(142, 266, 2, '2023-02-21 11:57:22'),
(143, 267, 1, '2023-02-21 17:59:50'),
(144, 268, 1, '2023-02-22 12:25:32'),
(145, 269, 2, '2023-02-22 17:46:33'),
(146, 270, 2, '2023-02-23 11:54:35'),
(147, 271, 1, '2023-02-23 18:29:43'),
(148, 272, 1, '2023-02-24 12:09:21'),
(149, 273, 2, '2023-02-24 17:47:18'),
(150, 274, 2, '2023-02-25 11:55:32'),
(151, 275, 1, '2023-02-25 18:58:10'),
(152, 276, 1, '2023-02-26 13:03:50'),
(153, 277, 1, '2023-02-27 11:59:20'),
(154, 278, 2, '2023-02-27 17:43:22'),
(155, 279, 2, '2023-02-28 11:57:15'),
(156, 280, 1, '2023-02-28 17:44:44'),
(157, 281, 1, '2023-03-01 12:04:00'),
(158, 282, 2, '2023-03-01 17:47:22'),
(159, 283, 2, '2023-03-02 12:03:12'),
(160, 284, 1, '2023-03-02 18:04:28'),
(161, 285, 1, '2023-03-03 12:35:31'),
(162, 286, 2, '2023-03-03 17:50:36'),
(163, 287, 1, '2023-03-04 12:24:44'),
(164, 288, 1, '2023-03-04 14:19:37'),
(165, 289, 2, '2023-03-04 18:41:43'),
(166, 290, 2, '2023-03-05 12:54:33'),
(167, 291, 1, '2023-03-05 20:57:41'),
(168, 292, 1, '2023-03-06 11:51:01'),
(169, 293, 2, '2023-03-06 17:54:16'),
(170, 294, 2, '2023-03-07 11:53:04'),
(171, 295, 1, '2023-03-07 17:50:58'),
(172, 296, 1, '2023-03-08 12:20:01'),
(173, 297, 2, '2023-03-08 17:44:02'),
(174, 298, 2, '2023-03-09 12:04:31'),
(175, 299, 1, '2023-03-09 17:51:49'),
(176, 300, 1, '2023-03-10 12:08:27'),
(177, 301, 2, '2023-03-10 17:52:41'),
(178, 302, 2, '2023-03-11 11:56:49'),
(179, 303, 1, '2023-03-11 19:07:27'),
(180, 304, 1, '2023-03-12 13:20:21'),
(181, 305, 1, '2023-03-13 12:41:08'),
(182, 306, 2, '2023-03-13 17:50:09'),
(183, 307, 2, '2023-03-14 11:59:15'),
(184, 308, 1, '2023-03-14 17:53:59'),
(185, 309, 1, '2023-03-15 11:58:12'),
(186, 310, 2, '2023-03-15 17:51:29'),
(187, 311, 2, '2023-03-16 12:06:29'),
(188, 312, 1, '2023-03-16 17:54:07'),
(189, 313, 1, '2023-03-17 11:52:15'),
(190, 314, 2, '2023-03-17 17:49:06'),
(191, 315, 1, '2023-03-18 12:18:32'),
(192, 316, 2, '2023-03-18 18:59:59'),
(193, 317, 2, '2023-03-19 12:57:45'),
(194, 318, 1, '2023-03-20 13:00:00'),
(195, 319, 2, '2023-03-21 11:46:48'),
(196, 320, 1, '2023-03-21 17:55:11'),
(197, 321, 1, '2023-03-22 11:54:25'),
(198, 322, 2, '2023-03-22 17:46:29'),
(199, 323, 2, '2023-03-23 11:58:13'),
(200, 324, 1, '2023-03-23 18:00:32'),
(201, 325, 1, '2023-03-24 11:56:32'),
(202, 326, 2, '2023-03-24 17:52:41'),
(203, 327, 2, '2023-03-25 11:57:45'),
(204, 328, 1, '2023-03-25 18:52:25'),
(205, 329, 1, '2023-03-26 13:13:23'),
(206, 330, 1, '2023-03-27 12:10:49'),
(207, 331, 2, '2023-03-27 17:42:58'),
(208, 332, 2, '2023-03-28 11:55:52'),
(209, 333, 1, '2023-03-28 17:57:34'),
(210, 334, 1, '2023-03-29 12:17:58'),
(211, 335, 2, '2023-03-29 17:45:24'),
(212, 336, 2, '2023-03-30 11:57:06'),
(213, 337, 1, '2023-03-30 17:51:03'),
(214, 338, 1, '2023-03-31 12:18:45'),
(215, 339, 2, '2023-03-31 17:53:21'),
(216, 340, 2, '2023-04-17 21:22:14'),
(217, 341, 30, '2023-08-22 13:00:07'),
(218, 342, 30, '2023-08-22 13:43:59'),
(219, 343, 30, '2023-08-23 20:54:43'),
(220, 344, 30, '2023-08-23 22:06:47'),
(221, 345, 1, '2023-08-23 22:10:21'),
(222, 346, 30, '2023-08-23 22:13:27'),
(223, 347, 30, '2023-08-23 22:13:52'),
(224, 348, 30, '2023-08-24 20:01:28'),
(225, 349, 30, '2023-08-24 20:04:07'),
(226, 350, 1, '2023-08-24 20:15:50'),
(227, 351, 1, '2023-08-25 19:32:13'),
(228, 352, 1, '2023-08-25 20:58:42'),
(229, 353, 1, '2023-08-25 21:37:20'),
(230, 354, 1, '2023-08-25 23:21:21'),
(231, 355, 30, '2023-08-28 19:33:50'),
(232, 356, 30, '2023-08-28 19:53:41'),
(233, 357, 1, '2023-08-29 13:26:12'),
(234, 358, 30, '2023-08-29 16:27:24'),
(235, 359, 30, '2023-08-29 16:46:39'),
(236, 360, 30, '2023-08-30 19:44:10'),
(237, 361, 1, '2023-08-31 13:36:11'),
(238, 362, 30, '2023-08-31 14:53:17'),
(239, 363, 1, '2023-08-31 16:28:04'),
(240, 364, 30, '2023-08-31 16:28:44'),
(241, 365, 30, '2023-09-01 19:27:24'),
(242, 366, 30, '2023-09-01 20:18:05'),
(243, 367, 30, '2023-09-01 22:20:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `BARRIOS`
--

CREATE TABLE `BARRIOS` (
  `barrio_id` int(5) NOT NULL,
  `barrio_nombre` varchar(100) NOT NULL,
  `barrio_comuna` varchar(15) NOT NULL,
  `barrio_recomendacion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `BARRIOS`
--

INSERT INTO `BARRIOS` (`barrio_id`, `barrio_nombre`, `barrio_comuna`, `barrio_recomendacion`) VALUES
(1, 'CIUDAD CAMPESTRE', 'UNO', 'DOMI EXTERNO'),
(2, 'EL RETIRO', 'UNO', 'DOMI EXTERNO'),
(3, 'FATIMA', 'UNO', NULL),
(4, 'LOMITAS', 'UNO', 'DOMI EXTERNO'),
(5, 'JAZMIN', 'UNO', 'DOMI EXTERNO'),
(6, 'MIRAFLORES', 'UNO', NULL),
(7, 'PANAMERICANO', 'UNO', NULL),
(9, 'SAN BENITO', 'UNO', 'DOMI EXTERNO'),
(10, 'NUEVO FATIMA', 'UNO', NULL),
(11, 'VICTORIA', 'UNO', NULL),
(12, 'VILLA CAMPESTRE', 'UNO', 'DOMI EXTERNO'),
(13, 'VILLA DEL RIO', 'UNO', NULL),
(14, 'ALVERNIA', 'DOS', NULL),
(15, 'CESPEDES', 'DOS', NULL),
(16, 'ENTRE RIOS', 'DOS', NULL),
(17, 'FRANCISCANOS', 'DOS', NULL),
(18, 'NUEVO ALVERNIA', 'DOS', NULL),
(19, 'SAN VICENTE DE PAUL', 'DOS', NULL),
(20, 'SANTA LUCIA', 'DOS', NULL),
(21, 'LA SANTA CRUZ', 'TRES', 'DOMI EXTERNO'),
(22, 'CASA HUERTAS', 'TRES', NULL),
(23, 'EL BOSQUE', 'TRES', NULL),
(24, 'EL CONDOR', 'TRES', NULL),
(25, 'EL CONDOR II', 'TRES', NULL),
(26, 'EL DORADO', 'TRES', NULL),
(27, 'ESTAMBUL', 'TRES', NULL),
(28, 'LA INMACULADA', 'TRES', NULL),
(29, 'LA VILLA', 'TRES', NULL),
(30, 'LAS BRISAS', 'TRES', NULL),
(31, 'MORALES', 'TRES', NULL),
(32, 'NUEVO MORALES', 'TRES', NULL),
(33, 'MORALITO', 'TRES', NULL),
(34, 'POPULAR', 'TRES', NULL),
(35, 'SAN ANTONIO', 'TRES', 'DOMI EXTERNO'),
(36, 'SANTA RITA DEL RIO', 'TRES', NULL),
(37, 'URBANIZACION PEÑARANDA', 'TRES', NULL),
(38, 'VILLANUEVA', 'TRES', NULL),
(39, 'ALTOS DE LAS COLINAS', 'TRES', 'DOMI EXTERNO'),
(40, 'LAS COLINAS', 'TRES', 'DOMI EXTERNO'),
(41, 'EL CENTRO', 'CUATRO', NULL),
(42, 'ESCOBAR', 'CUATRO', NULL),
(43, 'LAS OLAS', 'CUATRO', NULL),
(44, 'PALOBONITO', 'CUATRO', NULL),
(45, 'TOMAS URIBE', 'CUATRO', NULL),
(46, 'AVENIDA CALI', 'CINCO', NULL),
(47, 'CONJUNTO RESIDENCIAL LUSITANIA', 'CINCO', NULL),
(48, 'DOCE DE OCTUBRE', 'CINCO', NULL),
(49, 'EL LAGO', 'CINCO', NULL),
(50, 'EL LAGUITO', 'CINCO', NULL),
(51, 'EL PRINCIPE', 'CINCO', NULL),
(52, 'NUEVO PRINCIPE', 'CINCO', NULL),
(53, 'ARBOLEDA DEL DARIEN', 'CINCO', NULL),
(54, 'LA BASTILLA', 'CINCO', NULL),
(55, 'LA MERCED', 'CINCO', NULL),
(56, 'LAS ACACIAS', 'CINCO', NULL),
(57, 'LUSITANIA', 'CINCO', NULL),
(58, 'SAJONIA', 'CINCO', NULL),
(59, 'SALESIANO', 'CINCO', NULL),
(60, 'SAN CARLOS', 'CINCO', NULL),
(61, 'LAGUITO', 'CINCO', NULL),
(62, 'QUINTAS DE SAN FELIPE', 'CINCO', NULL),
(63, 'BOLIVAR', 'SEIS', NULL),
(64, 'PLAYAS', 'SEIS', NULL),
(65, 'MARANDUA', 'SEIS', NULL),
(66, 'PUEBLO NUEVO', 'SEIS', NULL),
(67, 'ASOGRIN', 'SEIS', NULL),
(68, 'LA CEIBA', 'SEIS', NULL),
(69, 'LA ESPERANZA', 'SEIS', NULL),
(70, 'ASOAGRIN', 'SEIS', NULL),
(71, 'LAS DELICIAS', 'SEIS', NULL),
(72, 'EL PINAR', 'SEIS', NULL),
(73, 'PROGRESAR', 'SEIS', NULL),
(74, 'SAN PEDRO CLAVER', 'SEIS', NULL),
(75, 'LA HERRADURA (urbanización)', 'SEIS', NULL),
(76, 'LAS PALMAS', 'SEIS', NULL),
(77, 'BUENOS AIRES', 'SEIS', NULL),
(78, 'PARQUES DE VERSALLES', 'SEIS', NULL),
(79, 'DEPARTAMENTAL', 'SIETE', NULL),
(80, 'PORVENIR', 'SIETE', NULL),
(81, 'FARFAN', 'SIETE', NULL),
(82, 'LA QUINTA', 'SIETE', NULL),
(83, 'LAS AMERICAS', 'SIETE', NULL),
(84, 'LOS TOLUES', 'SIETE', NULL),
(85, 'ROJAS', 'SIETE', NULL),
(86, 'DIABLOS ROJOS 1', 'SIETE', NULL),
(87, 'EL DESCANSO', 'SIETE', NULL),
(88, 'EL LIMONAR', 'SIETE', NULL),
(89, 'GUAYACANES', 'SIETE', NULL),
(90, 'JOSE ANTONIO GALAN', 'SIETE', NULL),
(91, 'LA CAMPIÑA', 'SIETE', NULL),
(92, 'LAS NIEVES', 'SIETE', NULL),
(93, 'LAURELES I Y II', 'SIETE', NULL),
(94, 'NUEVO FARFAN', 'SIETE', NULL),
(95, 'LOS OLMOS', 'SIETE', NULL),
(96, 'PRADOS DEL NORTE', 'SIETE', NULL),
(97, 'RUBEN CRUZ VELEZ', 'SIETE', NULL),
(98, 'VILLA LILIANA', 'SIETE', NULL),
(99, 'VILLA DEL SUR', 'SIETE', NULL),
(100, 'CHIMINANGOS', 'OCHO', NULL),
(101, 'MUNICIPAL', 'OCHO', NULL),
(102, 'HORIZONTE', 'OCHO', NULL),
(103, 'BOSQUES DE MARACAIBO', 'OCHO', NULL),
(104, 'FAMILIAR', 'OCHO', NULL),
(105, 'DIABLOS ROJOS II', 'OCHO', NULL),
(106, 'EL REFUGIO', 'OCHO', NULL),
(107, 'FLOR DE LA CAMPANA', 'OCHO', NULL),
(108, 'SANTA ISABEL', 'OCHO', NULL),
(109, 'JORGE ELIECER GAITAN', 'OCHO', NULL),
(110, 'LA INDEPENDENCIA', 'OCHO', NULL),
(111, 'RIO PAILA', 'OCHO', NULL),
(112, 'SAN LUIS', 'OCHO', NULL),
(113, 'SANTA INES', 'OCHO', NULL),
(114, 'SINTRA SANCARLOS', 'OCHO', NULL),
(115, 'TERCER MILENIO', 'OCHO', NULL),
(116, 'ALAMEDA I Y II', 'NUEVE', NULL),
(117, 'EL JARDIN', 'NUEVE', NULL),
(118, 'EL PALMAR', 'NUEVE', NULL),
(119, 'LA GRACIELA', 'NUEVE', NULL),
(120, 'LA TRINIDAD', 'NUEVE', NULL),
(121, 'SIETE DE AGOSTO', 'NUEVE', NULL),
(122, 'VILLA COLOMBIA', 'NUEVE', NULL),
(123, 'INTERNACIONAL', 'NUEVE', NULL),
(124, 'JUAN XXIII', 'NUEVE', NULL),
(125, 'EL BOSQUECITO', 'NUEVE', NULL),
(126, 'MARACAIBO', 'NUEVE', NULL),
(127, 'PORTALES DEL RIO', 'NUEVE', NULL),
(128, 'SAMAN DEL NORTE', 'NUEVE', NULL),
(130, 'LA PAZ', 'DIEZ', 'DOMI EXTERNO'),
(131, 'SAN FRANCISCO', 'DIEZ', 'DOMI EXTERNO'),
(132, 'PARAISO', 'DIEZ', 'DOMI EXTERNO'),
(133, 'AGUACLARA', 'CORREGIMIENTO', 'DOMI EXTERNO'),
(134, 'ALTAFLOR', 'CORREGIMIENTO', NULL),
(135, 'BARRAGAN', 'CORREGIMIENTO', NULL),
(136, 'BOCAS DE TULUA', 'CORREGIMIENTO', NULL),
(137, 'CAMPOALEGRE', 'CORREGIMIENTO', NULL),
(138, 'EL PICACHO', 'CORREGIMIENTO', NULL),
(139, 'EL RETIRO', 'CORREGIMIENTO', NULL),
(140, 'LA DIADEMA', 'CORREGIMIENTO', NULL),
(141, 'LA IBERIA', 'CORREGIMIENTO', NULL),
(142, 'LA MARINA', 'CORREGIMIENTO', NULL),
(143, 'LA MORALIA', 'CORREGIMIENTO', NULL),
(144, 'LA PALMERA', 'CORREGIMIENTO', NULL),
(145, 'LOS CAIMOS', 'CORREGIMIENTO', NULL),
(146, 'MONTELORO', 'CORREGIMIENTO', NULL),
(147, 'NARIÑO', 'CORREGIMIENTO', NULL),
(148, 'PIEDRITAS', 'CORREGIMIENTO', NULL),
(149, 'PUERTO FRAZADAS', 'CORREGIMIENTO', NULL),
(150, 'QUEBRADAGRANDE', 'CORREGIMIENTO', NULL),
(151, 'SAN LORENZO', 'CORREGIMIENTO', NULL),
(152, 'SAN RAFAEL', 'CORREGIMIENTO', NULL),
(153, 'SANTA LUCIA', 'CORREGIMIENTO', NULL),
(154, 'TOCHECITO', 'CORREGIMIENTO', NULL),
(155, 'TRES ESQUINAS', 'CORREGIMIENTO', 'DOMI EXTERNO'),
(156, 'VENUS', 'CORREGIMIENTO', NULL),
(157, 'CIENEGUETA', 'VEREDA', NULL),
(158, 'LA CABALLERA', 'VEREDA', NULL),
(159, 'LA RIVERA', 'VEREDA', 'DOMI EXTERNO'),
(160, 'PALOMESTIZO', 'VEREDA', NULL),
(161, 'LA PALMERA', 'VEREDA', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DOMICILIOS`
--

CREATE TABLE `DOMICILIOS` (
  `domicilio_id` int(5) NOT NULL,
  `hora_creado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `barrio_id` int(5) NOT NULL,
  `numero_factura` varchar(15) NOT NULL,
  `btn_domi_interno` int(5) NOT NULL,
  `trans_interno_id` int(5) NOT NULL,
  `btn_domi_externo` int(5) NOT NULL,
  `trans_externo_id` int(5) NOT NULL,
  `valor_domi_externo` int(10) NOT NULL,
  `valor_venta` int(10) NOT NULL,
  `hora_salida` varchar(10) NOT NULL,
  `hora_llegada` varchar(10) NOT NULL,
  `inyectologia` varchar(2) NOT NULL,
  `observaciones` varchar(200) NOT NULL,
  `turno_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `DOMICILIOS`
--

INSERT INTO `DOMICILIOS` (`domicilio_id`, `hora_creado`, `barrio_id`, `numero_factura`, `btn_domi_interno`, `trans_interno_id`, `btn_domi_externo`, `trans_externo_id`, `valor_domi_externo`, `valor_venta`, `hora_salida`, `hora_llegada`, `inyectologia`, `observaciones`, `turno_id`) VALUES
(115, '2023-08-31 16:20:02', 159, 'NO', 1, 4, 0, 0, 0, 30000, '11:08', '11:20', '', '', 362),
(116, '2023-08-31 16:20:03', 5, 'NO', 1, 28, 0, 0, 0, 30000, '11:17', '11:20', '', '', 362),
(117, '2023-08-31 16:20:04', 3, 'NO', 1, 28, 0, 0, 0, 40000, '11:17', '11:20', '', '', 362),
(118, '2023-08-31 16:20:40', 2, '7788', 0, 0, 1, 2, 3000, 20000, '11:20', '11:20', '', '', 300),
(119, '2023-08-31 18:34:34', 31, 'NO', 1, 4, 0, 0, 0, 70000, '13:34', '13:34', '', '', 364),
(120, '2023-08-31 19:55:07', 2, 'NO', 1, 28, 0, 0, 0, 150000, '14:54', '14:55', '', '', 364),
(121, '2023-09-01 22:35:35', 1, '2582', 1, 4, 0, 0, 0, 15000, '17:34', '17:35', 'SI', '', 300);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DOMI_EXTERNOS`
--

CREATE TABLE `DOMI_EXTERNOS` (
  `domi_externo_id` int(5) NOT NULL,
  `domi_externo_nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `DOMI_EXTERNOS`
--

INSERT INTO `DOMI_EXTERNOS` (`domi_externo_id`, `domi_externo_nombre`) VALUES
(0, '--'),
(1, 'RAPPI'),
(2, 'GO-FAST'),
(3, 'DOMI-TULUA'),
(4, 'DOMI-EXPRESS');

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
(1, 'SEMANA 7:00am - 2:00pm'),
(2, 'SEMANA 2:00pm 10:00pm'),
(3, 'SÁBADO 7:00am - 2:00pm'),
(4, 'SÁBADO 2:00pm - 10:00pm'),
(5, 'DOM / FEST 8:00am - 10:00pm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PERFILES`
--

CREATE TABLE `PERFILES` (
  `perfil_id` int(5) NOT NULL,
  `perfil_nombre` varchar(200) NOT NULL,
  `perfil_descripcion` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `PERFILES`
--

INSERT INTO `PERFILES` (`perfil_id`, `perfil_nombre`, `perfil_descripcion`) VALUES
(1, 'RESPONSABLE_TURNO', 'Tiene acceso al panel de operaciones del turno, puede crear el turno de la jornada, y consultar información relacionada con el usuario'),
(2, 'ADMINISTRATIVO', 'Tiene acceso al panel administrativo, en el que puede revisar estadísticas de la operación de los turnos. no tiene facultades para modificar, solo consulta.\r\n'),
(3, 'SYSTEM_ADMIN', 'perfil con privilegios de administrador del sistema'),
(4, 'DOMICILIARIO', 'Encargado de realizar los domicilios de la Drogueria.');

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
  `turno_creacion_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `turno_fechahora_cierre` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `turno_sobrante` int(10) DEFAULT NULL,
  `turno_faltante` int(10) DEFAULT NULL,
  `turno_entrega_final` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `TURNOS`
--

INSERT INTO `TURNOS` (`turno_id`, `turno_fecha_creado`, `turno_jornada`, `turno_responsable`, `turno_saldo_caja`, `turno_total_utilidad`, `turno_total_entrega`, `turno_descuadre`, `turno_creacion_timestamp`, `turno_fechahora_cierre`, `turno_sobrante`, `turno_faltante`, `turno_entrega_final`) VALUES
(300, '2023-03-10', 1, 1, 600000, 0, 600000, 2, '2023-03-10 12:08:27', '2023-08-31 19:58:35', 5000, 0, 605000),
(341, '2023-07-22', 1, 30, NULL, NULL, NULL, NULL, '2023-08-22 13:00:07', '2023-08-31 21:48:06', NULL, NULL, NULL),
(342, '2023-06-22', 2, 30, NULL, NULL, NULL, NULL, '2023-08-22 13:43:59', '2023-08-31 21:48:13', NULL, NULL, NULL),
(343, '2023-08-23', 1, 30, NULL, NULL, NULL, NULL, '2023-08-23 20:54:43', NULL, NULL, NULL, NULL),
(344, '2023-08-23', 2, 30, NULL, NULL, NULL, NULL, '2023-08-23 22:06:47', NULL, NULL, NULL, NULL),
(345, '2023-08-23', 2, 1, NULL, NULL, NULL, NULL, '2023-08-23 22:10:21', NULL, NULL, NULL, NULL),
(346, '2023-08-23', 1, 30, NULL, NULL, NULL, NULL, '2023-08-23 22:13:26', NULL, NULL, NULL, NULL),
(347, '2023-08-23', 1, 30, NULL, NULL, NULL, NULL, '2023-08-23 22:13:52', NULL, NULL, NULL, NULL),
(348, '2023-08-24', 1, 30, NULL, NULL, NULL, NULL, '2023-08-24 20:01:28', NULL, NULL, NULL, NULL),
(349, '2023-08-24', 1, 30, NULL, NULL, NULL, NULL, '2023-08-24 20:04:07', NULL, NULL, NULL, NULL),
(350, '2023-08-24', 2, 1, NULL, NULL, NULL, NULL, '2023-08-24 20:15:50', NULL, NULL, NULL, NULL),
(351, '2023-08-25', 2, 1, NULL, NULL, NULL, NULL, '2023-08-25 19:32:13', NULL, NULL, NULL, NULL),
(352, '2023-08-25', 2, 1, NULL, NULL, NULL, NULL, '2023-08-25 20:58:42', NULL, NULL, NULL, NULL),
(353, '2023-08-25', 2, 1, NULL, NULL, NULL, NULL, '2023-08-25 21:37:20', NULL, NULL, NULL, NULL),
(354, '2023-08-25', 3, 1, NULL, NULL, NULL, NULL, '2023-08-25 23:21:21', NULL, NULL, NULL, NULL),
(355, '2023-08-28', 2, 30, NULL, NULL, NULL, NULL, '2023-08-28 19:33:50', NULL, NULL, NULL, NULL),
(356, '2023-08-28', 2, 30, NULL, NULL, NULL, NULL, '2023-08-28 19:53:41', NULL, NULL, NULL, NULL),
(357, '2023-08-29', 1, 1, NULL, NULL, NULL, NULL, '2023-08-29 13:26:12', NULL, NULL, NULL, NULL),
(358, '2023-08-29', 1, 30, NULL, NULL, NULL, NULL, '2023-08-29 16:27:23', NULL, NULL, NULL, NULL),
(359, '2023-08-29', 1, 30, NULL, NULL, NULL, NULL, '2023-08-29 16:46:39', NULL, NULL, NULL, NULL),
(360, '2023-08-30', 1, 30, NULL, NULL, NULL, NULL, '2023-08-30 19:44:10', NULL, NULL, NULL, NULL),
(361, '2023-08-31', 1, 1, NULL, NULL, NULL, NULL, '2023-08-31 13:36:11', NULL, NULL, NULL, NULL),
(362, '2023-08-31', 1, 30, NULL, NULL, NULL, NULL, '2023-08-31 14:53:17', NULL, NULL, NULL, NULL),
(363, '2023-08-31', 1, 1, 10000000, 0, 10000000, 1, '2023-08-31 16:28:04', '2023-08-31 22:04:01', 0, 0, 10000000),
(364, '2023-08-31', 1, 30, 500000, 60000, 560000, 1, '2023-08-31 16:28:44', '2023-08-31 21:15:48', 0, 0, 560000),
(365, '2023-09-01', 1, 30, NULL, NULL, NULL, NULL, '2023-09-01 19:27:24', NULL, NULL, NULL, NULL),
(366, '2023-09-01', 1, 30, 200000, 20000, 220000, 1, '2023-09-01 20:18:05', '2023-09-01 20:18:41', 0, 0, 220000),
(367, '2023-09-01', 1, 30, 500000, 0, 500000, 2, '2023-09-01 22:20:33', '2023-09-01 22:58:05', 2000, 0, 502000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USERS`
--

CREATE TABLE `USERS` (
  `user_id` int(5) NOT NULL,
  `user_nombre` varchar(50) NOT NULL,
  `user_apellido` varchar(50) NOT NULL,
  `user_user` varchar(20) NOT NULL,
  `user_password` varchar(15) NOT NULL,
  `user_perfil` int(5) NOT NULL,
  `user_vendedor` varchar(2) NOT NULL,
  `user_transportador` varchar(2) NOT NULL,
  `user_coordina_turno` varchar(2) NOT NULL,
  `user_apoyo_turno` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `USERS`
--

INSERT INTO `USERS` (`user_id`, `user_nombre`, `user_apellido`, `user_user`, `user_password`, `user_perfil`, `user_vendedor`, `user_transportador`, `user_coordina_turno`, `user_apoyo_turno`) VALUES
(0, '--', '--', '--', '--', 4, 'NO', 'NO', 'NO', 'NO'),
(1, 'YULY', 'DIAZ', 'yudiaz', 'yudiaz', 1, 'SI', 'NO', 'SI', 'NO'),
(3, 'KAROL', 'PULIDO', 'kapulido', 'kapulido', 2, 'SI', 'NO', 'NO', 'NO'),
(4, 'MARINO', 'VICTORIA VELAZCO', 'mavictoria', 'mavictoria', 4, 'SI', 'SI', 'NO', 'NO'),
(7, 'CRISTIAN', 'MONSALVE', 'crimonsalve', 'etica2020', 2, 'NO', 'NO', 'NO', 'NO'),
(8, 'SYSTEM', 'ADMIN_DEL_SISTEMA', 'system', 'system2020', 3, 'NO', 'NO', 'NO', 'NO'),
(28, 'WINDI', 'SARRIA QUINTERO', 'wisarria', 'wisarria', 4, 'NO', 'SI', 'NO', 'NO'),
(30, 'ROSI', 'TORREALBA', 'torrealbar', '1122', 1, 'SI', 'NO', 'SI', 'NO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `VENTAS`
--

CREATE TABLE `VENTAS` (
  `venta_id` int(5) NOT NULL,
  `venta_fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `venta_nombre_producto` varchar(50) NOT NULL,
  `venta_nombre_proveedor` varchar(50) NOT NULL,
  `venta_costo_producto` int(10) NOT NULL,
  `venta_valor_venta` int(10) NOT NULL,
  `venta_utilidad` int(10) NOT NULL,
  `user_id` int(5) NOT NULL COMMENT 'vendedor',
  `turno_id` int(5) NOT NULL,
  `venta_tipo` varchar(15) NOT NULL COMMENT 'DOMI, LOCAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `VENTAS`
--

INSERT INTO `VENTAS` (`venta_id`, `venta_fecha`, `venta_nombre_producto`, `venta_nombre_proveedor`, `venta_costo_producto`, `venta_valor_venta`, `venta_utilidad`, `user_id`, `turno_id`, `venta_tipo`) VALUES
(528, '2023-06-20 16:08:21', 'KOLA GRANULADA', 'TITI', 20000, 30000, 10000, 30, 362, 'DOMI'),
(529, '2023-07-31 16:15:07', 'SUERO FISIOLOGICO', 'RR', 20000, 30000, 10000, 30, 362, 'DOMI'),
(530, '2023-08-31 16:17:04', 'ACEITE JHONSON', 'TT', 30000, 40000, 10000, 4, 362, 'DOMI'),
(531, '2023-08-31 18:34:04', 'PRODUCTO DEL TURNO', 'PROVEEDOR X', 60000, 70000, 10000, 1, 364, 'DOMI'),
(532, '2023-08-31 19:52:37', 'PRODUCTO A', 'BEBE', 100000, 150000, 50000, 30, 364, 'DOMI'),
(533, '2023-09-01 20:18:30', 'PRODUCTO GRANDE', 'POPO', 30000, 50000, 20000, 30, 366, 'LOCAL');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ACCESOS`
--
ALTER TABLE `ACCESOS`
  ADD PRIMARY KEY (`acceso_id`);

--
-- Indices de la tabla `BARRIOS`
--
ALTER TABLE `BARRIOS`
  ADD PRIMARY KEY (`barrio_id`);

--
-- Indices de la tabla `DOMICILIOS`
--
ALTER TABLE `DOMICILIOS`
  ADD PRIMARY KEY (`domicilio_id`),
  ADD KEY `barrio_id` (`barrio_id`),
  ADD KEY `trans_interno_id` (`trans_interno_id`),
  ADD KEY `trans_externo_id` (`trans_externo_id`),
  ADD KEY `turno_id` (`turno_id`);

--
-- Indices de la tabla `DOMI_EXTERNOS`
--
ALTER TABLE `DOMI_EXTERNOS`
  ADD PRIMARY KEY (`domi_externo_id`);

--
-- Indices de la tabla `JORNADAS`
--
ALTER TABLE `JORNADAS`
  ADD PRIMARY KEY (`jornada_id`);

--
-- Indices de la tabla `PERFILES`
--
ALTER TABLE `PERFILES`
  ADD PRIMARY KEY (`perfil_id`);

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
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `perfil_id` (`user_perfil`);

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
  MODIFY `acceso_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=244;

--
-- AUTO_INCREMENT de la tabla `BARRIOS`
--
ALTER TABLE `BARRIOS`
  MODIFY `barrio_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT de la tabla `DOMICILIOS`
--
ALTER TABLE `DOMICILIOS`
  MODIFY `domicilio_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT de la tabla `DOMI_EXTERNOS`
--
ALTER TABLE `DOMI_EXTERNOS`
  MODIFY `domi_externo_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `JORNADAS`
--
ALTER TABLE `JORNADAS`
  MODIFY `jornada_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `PERFILES`
--
ALTER TABLE `PERFILES`
  MODIFY `perfil_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `TURNOS`
--
ALTER TABLE `TURNOS`
  MODIFY `turno_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=368;

--
-- AUTO_INCREMENT de la tabla `USERS`
--
ALTER TABLE `USERS`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `VENTAS`
--
ALTER TABLE `VENTAS`
  MODIFY `venta_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=534;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `DOMICILIOS`
--
ALTER TABLE `DOMICILIOS`
  ADD CONSTRAINT `DOMICILIOS_ibfk_1` FOREIGN KEY (`barrio_id`) REFERENCES `BARRIOS` (`barrio_id`),
  ADD CONSTRAINT `DOMICILIOS_ibfk_2` FOREIGN KEY (`trans_interno_id`) REFERENCES `USERS` (`user_id`),
  ADD CONSTRAINT `DOMICILIOS_ibfk_3` FOREIGN KEY (`trans_externo_id`) REFERENCES `DOMI_EXTERNOS` (`domi_externo_id`),
  ADD CONSTRAINT `DOMICILIOS_ibfk_4` FOREIGN KEY (`turno_id`) REFERENCES `TURNOS` (`turno_id`);

--
-- Filtros para la tabla `TURNOS`
--
ALTER TABLE `TURNOS`
  ADD CONSTRAINT `TURNOS_ibfk_1` FOREIGN KEY (`turno_responsable`) REFERENCES `USERS` (`user_id`),
  ADD CONSTRAINT `TURNOS_ibfk_2` FOREIGN KEY (`turno_jornada`) REFERENCES `JORNADAS` (`jornada_id`);

--
-- Filtros para la tabla `USERS`
--
ALTER TABLE `USERS`
  ADD CONSTRAINT `USERS_ibfk_1` FOREIGN KEY (`user_perfil`) REFERENCES `PERFILES` (`perfil_id`);

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
