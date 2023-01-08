-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 08-01-2023 a las 09:29:49
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
(5, 'DOMINGO 8:00am - 4:00pm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PRUEBAS`
--

CREATE TABLE `PRUEBAS` (
  `prueba_id` int(5) NOT NULL,
  `prueba_fecha_creado` varchar(50) NOT NULL,
  `prueba_jornada` int(5) NOT NULL,
  `prueba_responsable` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, '2022-12-30', 1, 1, 6000, 5000, 4000, 20000, '2023-01-08 08:19:18'),
(6, '2023-01-02', 1, 1, 5, 6, 7, 8, '2023-01-08 08:19:18'),
(7, '2023-01-07', 1, 1, 600000, 161919, 761919, 10000, '2023-01-08 08:19:18'),
(89, '2023-01-08', 2, 2, 50000, 71000, 121000, 1000, '2023-01-08 08:19:18'),
(90, '2023-01-08', 5, 1, 200000, 59000, 259000, 2000, '2023-01-08 08:19:18'),
(91, '2023-01-08', 5, 2, 45000, 10000, 55000, 0, '2023-01-08 08:20:39'),
(92, '2023-01-08', 3, 3, 45000, 10, 45010, 0, '2023-01-08 08:24:44');

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
(28, NULL, 'PRODUCTO CAMBIADO HOY', 'LA FAVORITA', 5000, 6000, 5000, 3, 1),
(43, NULL, 'JARABE DE PALO', 'PETRI', 10000, 20000, 10000, 2, 7),
(44, NULL, 'ROSAS DEL CAMPO', 'VIKY', 40000, 60000, 20000, 4, 7),
(45, NULL, 'PIEDRA DE MOLER', 'PULOL', 45000, 90000, 45000, 2, 7),
(46, NULL, 'RR', 'RR', 3000, 40000, 37000, 2, 89),
(47, NULL, 'TT', 'TT', 6000, 10000, 4000, 1, 89),
(48, NULL, 'GG', 'GG', 20000, 50000, 30000, 4, 89),
(49, NULL, 'PRODUCTO 5', 'JOJO', 15000, 50000, 35000, 1, 90),
(50, NULL, 'UU', 'UU', 50000, 70000, 20000, 1, 90),
(51, NULL, 'UU', 'UU', 6000, 10000, 4000, 4, 90),
(52, '2023-01-08 08:12:42', 'BB', 'BB', 30000, 45000, 15000, 3, 90),
(53, '2023-01-08 08:20:56', 'YY', 'YY', 45000, 50000, 5000, 2, 91),
(54, '2023-01-08 08:21:21', 'FF', 'FF', 5000, 10000, 5000, 3, 91),
(55, '2023-01-08 08:25:59', '77', '77', 10, 20, 10, 1, 92);

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
  MODIFY `turno_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT de la tabla `USERS`
--
ALTER TABLE `USERS`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `VENTAS`
--
ALTER TABLE `VENTAS`
  MODIFY `venta_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

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
