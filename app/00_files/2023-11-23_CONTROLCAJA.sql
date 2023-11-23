-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 23-11-2023 a las 16:02:58
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
(250, 375, 1, '2023-09-07 20:01:17'),
(251, 376, 30, '2023-09-07 20:56:05'),
(252, 377, 1, '2023-09-07 21:45:55'),
(253, 378, 1, '2023-09-08 21:31:46'),
(254, 379, 1, '2023-09-11 22:11:26'),
(255, 380, 30, '2023-09-12 16:05:44'),
(256, 381, 1, '2023-09-13 21:44:26'),
(257, 382, 30, '2023-09-14 14:20:46'),
(258, 383, 1, '2023-09-15 19:34:34'),
(259, 384, 30, '2023-09-19 13:27:39'),
(260, 385, 30, '2023-09-22 19:38:41'),
(261, 386, 1, '2023-09-25 20:26:31'),
(262, 387, 30, '2023-09-27 19:25:43'),
(263, 388, 1, '2023-10-02 19:22:40');

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
  `turno_id` int(5) NOT NULL,
  `gestion_01` int(5) NOT NULL COMMENT 'Almacena el id de gestión asociada por domicilio',
  `gestion_02` int(5) NOT NULL COMMENT 'Almacena el id de gestión asociada por domicilio'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `DOMICILIOS`
--

INSERT INTO `DOMICILIOS` (`domicilio_id`, `hora_creado`, `barrio_id`, `numero_factura`, `btn_domi_interno`, `trans_interno_id`, `btn_domi_externo`, `trans_externo_id`, `valor_domi_externo`, `valor_venta`, `hora_salida`, `hora_llegada`, `inyectologia`, `observaciones`, `turno_id`, `gestion_01`, `gestion_02`) VALUES
(128, '2023-09-07 20:12:52', 135, 'gestion', 1, 4, 0, 0, 0, 50000, '15:12', '15:12', '', '', 375, 0, 0),
(129, '2023-09-07 20:12:53', 50, '4455', 1, 4, 0, 0, 0, 30000, '15:12', '15:12', '', '', 375, 0, 0),
(130, '2023-09-07 20:24:07', 4, '5566', 0, 0, 1, 2, 2000, 20000, '15:23', '15:24', '', '', 375, 0, 0),
(131, '2023-09-07 20:30:44', 77, '7898', 1, 28, 0, 0, 0, 30000, '15:30', '15:30', '', '', 375, 0, 0),
(132, '2023-09-07 20:42:07', 81, '4444', 0, 0, 1, 2, 1000, 10000, '15:33', '15:42', '', '', 375, 0, 0),
(133, '2023-09-07 20:42:08', 159, '8888', 1, 28, 0, 0, 0, 60000, '15:34', '15:42', '', '', 375, 0, 0),
(134, '2023-09-07 21:09:12', 43, 'gestion', 0, 0, 1, 3, 1000, 30000, '15:58', '16:09', '', '', 376, 0, 0),
(135, '2023-09-07 21:42:09', 63, '6677', 0, 0, 1, 1, 2000, 60000, '16:41', '16:42', '', '', 376, 0, 0),
(136, '2023-09-07 21:46:58', 67, 'gestion', 1, 28, 0, 0, 0, 100000, '16:46', '16:46', '', '', 377, 0, 0),
(137, '2023-09-08 23:14:22', 55, 'gestion', 1, 28, 0, 0, 0, 100000, '18:12', '18:14', '', '', 378, 0, 0),
(138, '2023-09-08 23:14:19', 59, '5566', 1, 4, 0, 0, 0, 30000, '18:12', '18:14', '', '', 378, 0, 0),
(139, '2023-09-08 23:14:18', 4, '5555', 1, 28, 0, 0, 0, 20000, '18:13', '18:14', '', '', 378, 0, 0),
(140, '2023-09-11 22:12:21', 72, 'gestion', 1, 4, 0, 0, 0, 16000, '17:12', '17:12', '', '', 379, 0, 0),
(141, '2023-09-12 16:08:30', 107, 'gestion', 1, 4, 0, 0, 0, 80000, '11:07', '11:08', '', '', 380, 0, 0),
(142, '2023-09-14 16:23:21', 4, 'gestion', 1, 4, 0, 0, 0, 300000, '11:11', '11:23', '', '', 381, 0, 0),
(143, '2023-09-14 16:27:06', 2, '4444', 1, 4, 0, 0, 0, 10000, '11:26', '11:27', '', 'observacion uno', 382, 0, 0),
(144, '2023-09-15 19:55:09', 160, '3333', 1, 28, 0, 0, 0, 20000, '14:55', '14:55', '', '', 383, 0, 0),
(145, '2023-09-15 19:58:53', 5, '4444', 1, 4, 0, 0, 0, 20000, '14:58', '14:58', '', '', 383, 0, 0),
(146, '2023-09-15 20:01:24', 48, 'gestion', 0, 0, 1, 3, 4000, 15000, '15:01', '15:01', '', '', 383, 0, 0),
(147, '2023-09-19 16:52:04', 50, '1122', 1, 4, 0, 0, 0, 30000, '09:32', '11:52', '', '', 384, 0, 0),
(148, '2023-09-19 17:39:35', 3, 'gestion', 1, 4, 0, 0, 0, 50000, '12:38', '12:39', '', '', 384, 0, 0),
(149, '2023-09-22 19:39:15', 2, '1111', 1, 4, 0, 0, 0, 30000, '14:39', '14:39', '', '', 384, 0, 0),
(150, '2023-10-09 20:37:37', 2, '5555', 1, 4, 0, 0, 0, 60000, '15:08', '15:37', '', '', 388, 0, 0),
(151, '2023-10-09 20:37:35', 1, '6666', 0, 0, 1, 1, 6000, 60000, '15:08', '15:37', '', '', 388, 0, 0),
(153, '2023-10-09 19:44:47', 2, '1111', 1, 4, 0, 0, 0, 20000, '09:40', '14:44', '', '', 388, 0, 0),
(154, '2023-10-09 19:44:47', 1, '1111', 1, 4, 0, 0, 0, 60000, '14:44', '14:44', '', '', 388, 0, 0),
(155, '2023-10-09 20:37:36', 4, '2222', 1, 28, 0, 0, 0, 50000, '15:08', '15:37', '', '', 388, 0, 0),
(156, '2023-10-09 20:37:35', 56, '4444', 1, 28, 0, 0, 0, 50000, '15:08', '15:37', '', '', 388, 0, 0),
(157, '2023-10-09 20:08:13', 33, '7777', 1, 28, 0, 0, 0, 10000, '14:45', '15:08', '', '', 388, 0, 0),
(158, '2023-10-09 20:08:13', 40, '2222', 1, 4, 0, 0, 0, 10000, '14:46', '15:08', '', '', 388, 0, 0),
(159, '2023-11-07 14:46:56', 3, '33', 1, 4, 0, 0, 0, 50000, '09:46', '09:46', '', 'comentario', 388, 0, 0),
(160, '2023-11-07 15:57:18', 5, '33', 1, 4, 0, 0, 0, 50000, '10:14', '10:57', '', 'comentario2', 388, 50000, 0),
(161, '2023-11-07 16:43:09', 1, '2', 0, 0, 1, 2, 4000, 20000, '11:42', '11:43', '', 'observo', 388, 50000, 50000),
(162, '2023-11-07 17:03:52', 58, '3', 1, 4, 0, 0, 0, 10000, '12:03', '12:03', '', 'observo mucho', 388, 100000, 0),
(163, '2023-11-07 17:03:52', 3, '1', 0, 0, 1, 2, 3000, 10000, '12:03', '12:03', '', 'no', 388, 0, 0),
(164, '2023-11-08 22:45:02', 1, '11', 0, 0, 1, 1, 3000, 10000, '17:45', '17:45', '', 'prueba de agregar dos domicilios', 388, 20000, 50000),
(165, '2023-11-08 22:44:58', 2, '1', 0, 0, 1, 1, 2000, 10000, '17:44', '17:44', '', 'observa', 388, 100000, 0),
(166, '2023-11-09 14:15:06', 1, '1', 0, 0, 1, 2, 2000, 10000, '09:15', '09:15', '', 'se fue', 388, 20000, 100000),
(167, '2023-11-15 20:49:05', 1, '1234', 1, 4, 0, 0, 0, 10000, '10:42', '15:49', '', '', 388, 50000, 50000),
(168, '2023-11-15 20:49:04', 1, '1', 0, 0, 1, 2, 3000, 10000, '14:54', '15:49', '', '', 388, 20000, 0),
(169, '2023-11-15 20:49:04', 5, 'gestion', 0, 0, 1, 4, 3000, 30000, '15:48', '15:49', '', 'una observaion', 388, 0, 0),
(170, '2023-11-15 20:54:44', 5, '1', 0, 0, 1, 3, 3000, 10000, '15:54', '15:54', '', 'ninguna', 388, 100000, 0),
(171, '2023-11-15 22:02:21', 1, '200', 1, 4, 0, 0, 0, 50000, '16:30', '17:02', '', 'cualquiera', 388, 0, 0),
(172, '2023-11-15 22:02:22', 33, '30', 0, 0, 1, 3, 5000, 10000, '16:33', '17:02', '', 'alguna', 388, 0, 0),
(173, '2023-11-15 22:02:23', 69, '11', 1, 4, 0, 0, 0, 50000, '16:49', '17:02', '', 'no', 388, 0, 0),
(174, '2023-11-15 22:02:22', 51, '22', 0, 0, 1, 2, 3000, 40000, '16:37', '17:02', '', '44', 388, 0, 0),
(175, '2023-11-15 22:02:23', 160, '5555', 0, 0, 1, 1, 60000, 60000, '16:49', '17:02', '', 'ninguna', 388, 0, 0),
(176, '2023-11-15 23:11:18', 1, '1', 0, 0, 1, 3, 6000, 20000, '18:11', '18:11', '', '', 388, 100000, 0),
(177, '2023-11-21 13:38:02', 42, '1111', 0, 0, 1, 3, 2000, 40000, '08:38', '', '', '', 388, 0, 0);

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
(1, 'Sema 7am-2pm'),
(2, 'Sema 2pm-10pm'),
(3, 'Sab 7am-2pm'),
(4, 'Sab 2pm10pm'),
(5, 'DomFest 8am-10pm');

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
(375, '2023-09-07', 2, 1, 2500000, 20000, 2520000, 1, '2023-09-07 20:01:17', '2023-09-07 20:53:29', 0, 0, 2520000),
(376, '2023-09-07', 2, 30, 1000000, 60000, 1060000, 2, '2023-09-07 20:56:05', '2023-09-07 21:43:17', 3000, 0, 1063000),
(377, '2023-09-07', 1, 1, NULL, NULL, NULL, NULL, '2023-09-07 21:45:55', NULL, NULL, NULL, NULL),
(378, '2023-09-08', 2, 1, NULL, NULL, NULL, NULL, '2023-09-08 21:31:46', NULL, NULL, NULL, NULL),
(379, '2023-09-11', 2, 1, NULL, NULL, NULL, NULL, '2023-09-11 22:11:26', NULL, NULL, NULL, NULL),
(380, '2023-09-12', 1, 30, 60000, 60000, 120000, 1, '2023-09-12 16:05:44', '2023-09-12 16:16:19', 0, 0, 120000),
(381, '2023-09-13', 1, 1, NULL, NULL, NULL, NULL, '2023-09-13 21:44:26', NULL, NULL, NULL, NULL),
(382, '2023-09-14', 1, 30, 400000, 30000, 430000, 1, '2023-09-14 14:20:46', '2023-09-14 16:27:36', 0, 0, 430000),
(383, '2023-09-15', 2, 1, NULL, NULL, NULL, NULL, '2023-09-15 19:34:34', NULL, NULL, NULL, NULL),
(384, '2023-09-19', 1, 30, NULL, NULL, NULL, NULL, '2023-09-19 13:27:39', NULL, NULL, NULL, NULL),
(385, '2023-09-22', 2, 30, NULL, NULL, NULL, NULL, '2023-09-22 19:38:41', NULL, NULL, NULL, NULL),
(386, '2023-09-25', 1, 1, NULL, NULL, NULL, NULL, '2023-09-25 20:26:31', NULL, NULL, NULL, NULL),
(387, '2023-09-27', 2, 30, NULL, NULL, NULL, NULL, '2023-09-27 19:25:43', NULL, NULL, NULL, NULL),
(388, '2023-10-02', 2, 1, 5000000, 240000, 5240000, 2, '2023-10-02 19:22:40', '2023-11-21 14:49:17', 1000, 0, 5241000);

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
(536, '2023-09-07 20:01:45', 'PRODUCTO A', 'AAAAA', 30000, 50000, 20000, 1, 388, 'DOMI'),
(537, '2023-09-07 20:56:35', 'PRODUCTO ROJO', 'DD', 50000, 90000, 40000, 30, 376, 'LOCAL'),
(538, '2023-09-07 20:58:12', 'PRODUCTO ROSADO', 'KK', 10000, 30000, 20000, 30, 376, 'DOMI'),
(539, '2023-09-07 21:46:28', 'PRODUCTO DOS', '55', 60000, 100000, 40000, 1, 377, 'DOMI'),
(540, '2023-09-08 21:32:30', 'PRODUCTO HIDRAPLUS', 'PP', 50000, 100000, 50000, 1, 378, 'DOMI'),
(541, '2023-09-11 22:11:47', 'PRODUCTO UNO', 'TT', 4000, 16000, 12000, 30, 379, 'DOMI'),
(542, '2023-09-12 16:06:28', 'PRODUCTO Z', 'VV', 10000, 20000, 10000, 30, 380, 'LOCAL'),
(543, '2023-09-12 16:07:37', 'PRODUCTO ZZ', 'MM', 30000, 80000, 50000, 30, 380, 'DOMI'),
(544, '2023-09-13 21:44:43', 'PRODUCTO BUENO', 'QQ', 20000, 50000, 30000, 3, 381, 'DOMI'),
(545, '2023-09-14 14:35:02', 'PRODUCTO VERDE', 'II', 50000, 70000, 20000, 30, 382, 'LOCAL'),
(546, '2023-09-14 15:30:06', 'PRODUCTO AMARILLO', 'RR', 20000, 30000, 10000, 3, 382, 'LOCAL'),
(547, '2023-09-15 19:59:35', 'PRODUCTO VERDE', 'FF', 30000, 50000, 20000, 4, 383, 'LOCAL'),
(548, '2023-09-15 20:00:54', 'PRODUCTO ROJO', 'GG', 10000, 15000, 5000, 1, 383, 'DOMI'),
(549, '2023-09-19 13:50:17', 'PRODUCTO CAFESITO', 'II', 20000, 50000, 30000, 30, 384, 'DOMI'),
(550, '2023-10-02 19:59:55', 'VERDE CLARO', 'UNA SEÑORA', 20000, 30000, 10000, 3, 388, 'DOMI'),
(551, '2023-10-02 20:00:17', 'NARANJA ROJIZO', 'DON PEDRITO', 40000, 60000, 20000, 3, 388, 'DOMI'),
(554, '2023-10-31 16:08:18', 'PRODUCTO HALLOWEEN 01', 'CALAVERA', 20000, 40000, 20000, 3, 388, 'DOMI'),
(555, '2023-11-01 20:06:53', 'PRODUCTO MIERCOLES', 'GATO', 40000, 50000, 10000, 3, 388, 'DOMI'),
(556, '2023-11-01 21:26:52', '33', 'RATON', 10000, 20000, 10000, 1, 388, 'DOMI'),
(557, '2023-11-01 21:31:56', 'LISTERINE GRIS OSCURO', 'RATON', 30000, 50000, 20000, 1, 388, 'DOMI'),
(558, '2023-11-01 23:10:03', '2233', 'GATO', 10000, 30000, 20000, 3, 388, 'DOMI'),
(559, '2023-11-07 16:43:49', 'PRODUCTO VERDE OLIVA', 'RANA', 70000, 100000, 30000, 1, 388, 'DOMI'),
(560, '2023-11-15 20:48:34', 'A', 'GATO', 10000, 30000, 20000, 3, 388, 'DOMI'),
(561, '2023-11-15 20:55:42', 'PRODUCTO NARANJA OSCURO', 'MURCI', 40000, 100000, 60000, 4, 388, 'DOMI');

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
  MODIFY `acceso_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=264;

--
-- AUTO_INCREMENT de la tabla `BARRIOS`
--
ALTER TABLE `BARRIOS`
  MODIFY `barrio_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT de la tabla `DOMICILIOS`
--
ALTER TABLE `DOMICILIOS`
  MODIFY `domicilio_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

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
  MODIFY `turno_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=389;

--
-- AUTO_INCREMENT de la tabla `USERS`
--
ALTER TABLE `USERS`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `VENTAS`
--
ALTER TABLE `VENTAS`
  MODIFY `venta_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=562;

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
