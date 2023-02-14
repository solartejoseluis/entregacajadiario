-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 08-02-2023 a las 23:27:26
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
(119, 229, 2);

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
(5, 'DOM / FEST 8:00am - 10:00pm');

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
  `turno_fechahora_cierre` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `TURNOS`
--

INSERT INTO `TURNOS` (`turno_id`, `turno_fecha_creado`, `turno_jornada`, `turno_responsable`, `turno_saldo_caja`, `turno_total_utilidad`, `turno_total_entrega`, `turno_descuadre`, `turno_creacion_timestamp`, `turno_fechahora_cierre`) VALUES
(229, '2023-02-08', 2, 2, NULL, NULL, NULL, NULL, '2023-02-08 20:45:43', '2023-02-08 21:25:51'),
(230, '2023-02-08', 1, 1, 556200, 7900, 564100, 0, '2023-02-08 20:57:13', '2023-02-08 21:01:20'),
(231, '2023-02-07', 1, 2, 388600, 36800, 425400, 0, '2023-02-08 21:03:24', '2023-02-08 21:25:18'),
(232, '2023-02-07', 2, 1, 913600, 33000, 946600, 10500, '2023-02-08 21:27:01', '2023-02-08 21:30:48'),
(233, '2023-02-06', 1, 1, 221900, 27000, 248900, 0, '2023-02-08 21:32:03', '2023-02-08 21:41:37'),
(234, '2023-02-06', 2, 2, 809500, 34000, 843500, 0, '2023-02-08 21:42:35', '2023-02-08 21:45:15'),
(235, '2023-02-05', 5, 2, 1139200, 52000, 1191200, 0, '2023-02-08 21:46:05', '2023-02-08 21:49:50'),
(236, '2023-02-04', 3, 1, 647100, 15000, 662100, 0, '2023-02-08 21:51:07', '2023-02-08 21:53:00'),
(237, '2023-02-04', 4, 2, 747600, 23900, 771500, 0, '2023-02-08 21:53:51', '2023-02-08 21:55:31'),
(238, '2023-02-03', 1, 1, 403600, 92000, 495600, 0, '2023-02-08 21:56:21', '2023-02-08 21:59:19'),
(239, '2023-02-02', 1, 2, 412700, 28000, 440700, 0, '2023-02-08 22:00:00', '2023-02-08 22:01:54'),
(240, '2023-02-02', 2, 1, 735500, 6300, 741800, 0, '2023-02-08 22:02:41', '2023-02-08 22:06:14'),
(241, '2023-02-01', 1, 1, 481700, 175200, 656900, 0, '2023-02-08 22:06:56', '2023-02-08 22:11:51'),
(242, '2023-02-01', 2, 2, 698200, 40300, 738500, 100, '2023-02-08 22:12:52', '2023-02-08 22:16:45');

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
(1, 'YULY VANESSA', 'DIAZ', 'yudiaz', 'yudiaz', 1, 1),
(2, 'LORENA', 'BUENO', 'lobueno', 'lobueno', 1, 1),
(3, 'KAROL', 'PULIDO', 'kapulido', 'kapulido', 2, 1),
(4, 'MARINO', 'PEREZ', 'mavictoria', 'mavictoria', 0, 1),
(7, 'CRISTIAN', 'MONSALVE', 'crimonsalve', 'etica2020', 2, 0),
(8, 'SYSTEM', 'ADMIN_DEL_SISTEMA', 'system', 'system2020', 3, 0);

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
(169, '2023-02-08 20:50:43', 'TERBINAFINA CREMA', 'FARMAUNIDOS', 11500, 16500, 5000, 2, 229),
(170, '2023-02-08 21:00:33', 'INMOX 60MG', 'FAVORITA', 30000, 37900, 7900, 1, 230),
(171, '2023-02-08 21:05:34', 'LACTULAX', 'DROGUERIA CESPEDES', 4500, 10000, 5500, 2, 231),
(172, '2023-02-08 21:06:15', 'ANEMIDOX', 'RENE', 60000, 70000, 10000, 1, 231),
(173, '2023-02-08 21:07:04', 'TRASS', 'BUENOS AIRES JULIAN', 16000, 28000, 12000, 2, 231),
(174, '2023-02-08 21:09:12', 'DIHIDROCODEINA', 'DROGUIFARMA', 26700, 36000, 9300, 2, 231),
(175, '2023-02-08 21:28:12', 'BETADUO', 'RENE', 28000, 42000, 14000, 1, 232),
(176, '2023-02-08 21:28:48', 'BROMURO', 'FELIPE', 10000, 20000, 10000, 1, 232),
(177, '2023-02-08 21:29:31', 'CILOSTAL', 'FELIPE', 15000, 20000, 5000, 1, 232),
(178, '2023-02-08 21:30:12', 'ACIDO VALPROICO', 'MULTISERVICIOS', 6000, 10000, 4000, 1, 232),
(179, '2023-02-08 21:40:11', 'METOPROLOL SUCCINATO 100 MG', 'YOLANDA', 10000, 20000, 10000, 1, 233),
(180, '2023-02-08 21:40:43', 'SUCRALFATO', 'YOLANDA', 5000, 20000, 15000, 1, 233),
(181, '2023-02-08 21:41:16', 'PARCHE LEON', 'FAVORITA', 10000, 12000, 2000, 1, 233),
(182, '2023-02-08 21:43:25', 'FLUZETRIN', 'FAVORITA', 28000, 35000, 7000, 2, 234),
(183, '2023-02-08 21:44:03', 'DISTENTIA', 'YESS', 53000, 75000, 22000, 2, 234),
(184, '2023-02-08 21:44:53', 'DAFLON 500', 'DIEGO PALMAR', 20000, 25000, 5000, 1, 234),
(185, '2023-02-08 21:46:53', 'CARPROL 100 MG', 'FARMAUNIDOS', 33000, 40000, 7000, 2, 235),
(186, '2023-02-08 21:47:33', 'PIPOTIAZINA', 'COSMOCENTRO', 10000, 20000, 10000, 1, 235),
(187, '2023-02-08 21:48:13', 'ENTRESTO', 'DIEGO PALMAR', 80000, 115000, 35000, 2, 235),
(188, '2023-02-08 21:51:56', 'CONTEC TALLA L', 'MULTISERVICIOS', 35000, 45000, 10000, 1, 236),
(189, '2023-02-08 21:52:37', 'SULFATO DE ZINC TAB', 'SALUD DESCUENTOS', 10500, 15500, 5000, 1, 236),
(190, '2023-02-08 21:54:35', 'FENALGEX', 'FERNANDO', 29000, 45900, 16900, 1, 237),
(191, '2023-02-08 21:55:10', 'DORIXINA RELAX', 'CHIMINANGOS', 15000, 22000, 7000, 2, 237),
(192, '2023-02-08 21:57:01', 'CLEAROVAC', 'FARMACENTRO', 40000, 70000, 30000, 1, 238),
(193, '2023-02-08 21:57:26', 'NIFEDIPINO', 'FELIPE', 6000, 10000, 4000, 1, 238),
(194, '2023-02-08 21:57:52', 'ACIDO VALPROICO', 'ALBEIRO', 6000, 10000, 4000, 1, 238),
(195, '2023-02-08 21:58:28', 'CURAM 1G', 'COLOMBO', 11500, 45500, 34000, 1, 238),
(196, '2023-02-08 21:58:54', 'SYSTANE', 'FELIPE', 20000, 40000, 20000, 1, 238),
(197, '2023-02-08 22:00:50', 'TRASS', 'JULIAN', 16000, 26000, 10000, 2, 239),
(198, '2023-02-08 22:01:17', 'NOFERTYL', 'COLOMBO', 16000, 34000, 18000, 2, 239),
(199, '2023-02-08 22:05:54', 'PAROXETINA', 'SANTA RITA', 13700, 20000, 6300, 2, 240),
(200, '2023-02-08 22:07:33', 'CLENOX', 'MANUEL', 27000, 45000, 18000, 2, 241),
(201, '2023-02-08 22:08:10', 'PLENIV', 'FARFAN HERMANOS', 10800, 15000, 4200, 1, 241),
(202, '2023-02-08 22:08:37', 'NOFERTYL', 'COLOMBO', 8000, 17000, 9000, 1, 241),
(203, '2023-02-08 22:09:10', 'SINALGEN 2', 'RENE', 156000, 280000, 124000, 1, 241),
(204, '2023-02-08 22:10:08', 'MOMETASONA CREMA', 'JHON DEIVI', 14000, 24000, 10000, 3, 241),
(205, '2023-02-08 22:10:50', 'CROMOGLICATO OFTALMICO', 'PHARMACEUTICA', 6000, 16000, 10000, 1, 241),
(206, '2023-02-08 22:13:39', 'NOFERTYL', 'COLOMBO', 8000, 17000, 9000, 2, 242),
(207, '2023-02-08 22:14:12', 'WINADEINE F', 'DAVID', 15000, 35000, 20000, 2, 242),
(208, '2023-02-08 22:14:58', 'FVERONIQ MINI', 'SALUD DESCUENTOS', 24800, 27800, 3000, 1, 242),
(209, '2023-02-08 22:15:45', 'FEMELLE 20CD', 'FARFAN HERMANOS', 23900, 28000, 4100, 1, 242),
(210, '2023-02-08 22:16:21', 'PLENIV', 'FARFAN HERMANOS', 10800, 15000, 4200, 2, 242),
(211, '2023-02-08 22:17:49', 'BECLOMETASONA', 'FELIPE', 10000, 35000, 25000, 2, 229),
(212, '2023-02-08 22:18:38', 'MIELTERTOS JARABE', 'LA FAVORITA', 22000, 28000, 6000, 1, 229);

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
  MODIFY `acceso_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT de la tabla `JORNADAS`
--
ALTER TABLE `JORNADAS`
  MODIFY `jornada_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `TURNOS`
--
ALTER TABLE `TURNOS`
  MODIFY `turno_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;

--
-- AUTO_INCREMENT de la tabla `USERS`
--
ALTER TABLE `USERS`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `VENTAS`
--
ALTER TABLE `VENTAS`
  MODIFY `venta_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

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
