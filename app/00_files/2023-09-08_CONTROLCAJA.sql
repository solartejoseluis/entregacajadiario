-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 09-09-2023 a las 01:17:11
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
(253, 378, 1, '2023-09-08 21:31:46');

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
(128, '2023-09-07 20:12:52', 135, 'gestion', 1, 4, 0, 0, 0, 50000, '15:12', '15:12', '', '', 375),
(129, '2023-09-07 20:12:53', 50, '4455', 1, 4, 0, 0, 0, 30000, '15:12', '15:12', '', '', 375),
(130, '2023-09-07 20:24:07', 4, '5566', 0, 0, 1, 2, 2000, 20000, '15:23', '15:24', '', '', 375),
(131, '2023-09-07 20:30:44', 77, '7898', 1, 28, 0, 0, 0, 30000, '15:30', '15:30', '', '', 375),
(132, '2023-09-07 20:42:07', 81, '4444', 0, 0, 1, 2, 1000, 10000, '15:33', '15:42', '', '', 375),
(133, '2023-09-07 20:42:08', 159, '8888', 1, 28, 0, 0, 0, 60000, '15:34', '15:42', '', '', 375),
(134, '2023-09-07 21:09:12', 43, 'gestion', 0, 0, 1, 3, 1000, 30000, '15:58', '16:09', '', '', 376),
(135, '2023-09-07 21:42:09', 63, '6677', 0, 0, 1, 1, 2000, 60000, '16:41', '16:42', '', '', 376),
(136, '2023-09-07 21:46:58', 67, 'gestion', 1, 28, 0, 0, 0, 100000, '16:46', '16:46', '', '', 377),
(137, '2023-09-08 23:14:22', 55, 'gestion', 1, 28, 0, 0, 0, 100000, '18:12', '18:14', '', '', 378),
(138, '2023-09-08 23:14:19', 59, '5566', 1, 4, 0, 0, 0, 30000, '18:12', '18:14', '', '', 378),
(139, '2023-09-08 23:14:18', 4, '5555', 1, 28, 0, 0, 0, 20000, '18:13', '18:14', '', '', 378);

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
(378, '2023-09-08', 2, 1, NULL, NULL, NULL, NULL, '2023-09-08 21:31:46', NULL, NULL, NULL, NULL);

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
(536, '2023-09-07 20:01:45', 'PRODUCTO A', 'AA', 30000, 50000, 20000, 1, 375, 'DOMI'),
(537, '2023-09-07 20:56:35', 'PRODUCTO ROJO', 'DD', 50000, 90000, 40000, 30, 376, 'LOCAL'),
(538, '2023-09-07 20:58:12', 'PRODUCTO ROSADO', 'KK', 10000, 30000, 20000, 30, 376, 'DOMI'),
(539, '2023-09-07 21:46:28', 'PRODUCTO DOS', '55', 60000, 100000, 40000, 1, 377, 'DOMI'),
(540, '2023-09-08 21:32:30', 'PRODUCTO HIDRAPLUS', 'PP', 50000, 100000, 50000, 1, 378, 'DOMI');

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
  MODIFY `acceso_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;

--
-- AUTO_INCREMENT de la tabla `BARRIOS`
--
ALTER TABLE `BARRIOS`
  MODIFY `barrio_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT de la tabla `DOMICILIOS`
--
ALTER TABLE `DOMICILIOS`
  MODIFY `domicilio_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

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
  MODIFY `turno_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=379;

--
-- AUTO_INCREMENT de la tabla `USERS`
--
ALTER TABLE `USERS`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `VENTAS`
--
ALTER TABLE `VENTAS`
  MODIFY `venta_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=541;

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
