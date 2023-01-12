-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 12-01-2023 a las 23:51:27
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
  `turno_fecha_creado` varchar(50) DEFAULT NULL,
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
(100, '2023-01-09', 5, 2, 1554900, 1554900, 1554900, 0, '2023-01-12 22:05:09'),
(101, '2023-01-10', 1, 2, 344900, 2900, 347800, 0, '2023-01-12 22:09:28'),
(102, '2023-01-10', 2, 1, 975100, 76900, 1052000, 6500, '2023-01-12 22:20:13'),
(103, '2023-01-11', 1, 1, 316400, 25000, 341400, 0, '2023-01-12 22:37:41'),
(104, '2023-01-11', 2, 2, 928100, 17000, 945100, 0, '2023-01-12 22:41:45'),
(105, '2023-01-12', 1, 2, 198300, 0, 198300, 0, '2023-01-12 22:49:22');

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
  `user_perfil` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `USERS`
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
(100, '2023-01-10 15:09:45', 'FACETIX SUAVE', 'FAVORITA', 10000, 12900, 2900, 2, 101),
(101, '2023-01-10 19:20:30', 'MUXOL FLEM NIÑOS', 'SALUD DESCUENTOS', 32000, 48000, 16000, 1, 102),
(102, '2023-01-10 19:22:47', 'GELCLAIR', 'SALUD DESCUENTOS', 14300, 18300, 4000, 1, 102),
(103, '2023-01-10 19:21:00', 'DOLEX 2+', 'SALUD DESCUENTOS', 10500, 12800, 2300, 1, 102),
(104, '2023-01-10 19:26:01', 'VALSARTAN 160 MK', 'SALUD DESCUENTOS', 39900, 48500, 8600, 1, 102),
(105, '2023-01-10 19:27:29', 'QUETIAPINA 25 MG MK', 'SALUD DESCUENTOS', 11500, 13500, 2000, 1, 102),
(106, '2023-01-10 19:28:48', 'NEURO UP', 'SALUD DESCUENTOS', 79600, 95600, 16000, 1, 102),
(107, '2023-01-10 19:30:18', 'ANEMIDOX', 'RENE', 60000, 78000, 18000, 1, 102),
(108, '2023-01-10 19:31:40', 'TRANEXAM', 'SALUD DESCUENTOS', 29700, 39700, 10000, 1, 102),
(109, '2023-01-11 15:37:53', 'MUXOL NIÑOS', 'SALUD DESCUENTOS', 32000, 47000, 15000, 1, 103),
(110, '2023-01-11 15:39:12', 'AGUJAS', 'FELIPE', 10000, 20000, 10000, 1, 103),
(111, '2023-01-11 19:41:52', 'MAXIPROS', 'ANDINA', 25000, 27000, 2000, 2, 104),
(112, '2023-01-11 19:43:02', 'BECLOMETASONA', 'YOLANDA', 15000, 25000, 10000, 2, 104),
(113, '2023-01-11 19:44:12', 'TRANEXAMICO', 'SALUD DESCUENTOS', 29700, 34700, 5000, 1, 104);

--
-- Índices para tablas volcadas
--

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
-- AUTO_INCREMENT de la tabla `JORNADAS`
--
ALTER TABLE `JORNADAS`
  MODIFY `jornada_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `TURNOS`
--
ALTER TABLE `TURNOS`
  MODIFY `turno_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT de la tabla `USERS`
--
ALTER TABLE `USERS`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `VENTAS`
--
ALTER TABLE `VENTAS`
  MODIFY `venta_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

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
