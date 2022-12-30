-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 30-12-2022 a las 04:35:20
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `CAJA_DIARIA`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TURNOS`
--

CREATE TABLE `TURNOS` (
  `turno_id` int(5) NOT NULL,
  `turno_fecha` date NOT NULL,
  `turno_horario` varchar(50) NOT NULL,
  `turno_responsable` int(5) NOT NULL COMMENT 'user_id',
  `turno_saldo_caja` int(10) DEFAULT NULL,
  `turno_total_utilidad` int(10) DEFAULT NULL,
  `turno_total_a entregar` int(10) DEFAULT NULL,
  `turno_descuadre` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USERS`
--

CREATE TABLE `USERS` (
  `user_id` int(5) NOT NULL,
  `user_nombre` varchar(50) NOT NULL,
  `user_apellido` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `USERS`
--

INSERT INTO `USERS` (`user_id`, `user_nombre`, `user_apellido`) VALUES
(1, 'YULY VANESSA', 'DIAZ'),
(2, 'LORENA', 'BUENO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `VENTAS`
--

CREATE TABLE `VENTAS` (
  `venta_id` int(5) NOT NULL,
  `venta_fecha` date DEFAULT NULL,
  `venta_nombre_producto` varchar(50) NOT NULL,
  `venta_nombre_proveedor` varchar(50) NOT NULL,
  `venta_costo_producto` int(10) NOT NULL,
  `venta_valor_venta` int(10) NOT NULL,
  `venta_utilidad` int(10) NOT NULL,
  `user_id` int(5) NOT NULL,
  `turno_id` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `VENTAS`
--

INSERT INTO `VENTAS` (`venta_id`, `venta_fecha`, `venta_nombre_producto`, `venta_nombre_proveedor`, `venta_costo_producto`, `venta_valor_venta`, `venta_utilidad`, `user_id`, `turno_id`) VALUES
(6, NULL, 'MEXANA TALCO', 'FREDDY', 4500, 5000, 600, 2, NULL),
(10, NULL, 'producto', 'jhgghgj', 7000, 9000, 2000, 1, NULL),
(11, NULL, 'jhkjh', 'jhkjh', 3000, 5000, 2000, 1, NULL),
(12, NULL, 'jklkljl', 'kjkjl', 2000, 3000, 1000, 1, NULL),
(13, NULL, 'PRODUCTO', 'AUGUSTO', 2000, 3000, 1000, 1, NULL),
(14, NULL, 'KLJKLJKL', 'KJKLJKLJ', 3000, 5000, 2000, 2, NULL),
(15, NULL, 'jkjkjk', 'llll', 4000, 5000, 1000, 2, NULL),
(16, NULL, 'TERRAMICINA', 'JAVIER', 2000, 3000, 1000, 1, NULL),
(17, NULL, 'CUALQUIER COSAS', 'CUALQUIERA', 2000, 4000, 2000, 2, NULL),
(20, NULL, 'OO', 'OO', 56000, 66000, 10000, 1, NULL),
(21, NULL, 'Q', 'q', 50000, 70000, 20000, 1, NULL),
(22, NULL, 'KKK', 'KKK', 10000, 20000, 10000, 2, NULL),
(23, NULL, 'LL', 'LL', 3000, 5000, 2000, 2, NULL),
(24, NULL, 'XX', 'XX', 3000, 7000, 4000, 1, NULL);

--
-- Índices para tablas volcadas
--

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
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `USERS`
--
ALTER TABLE `USERS`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `VENTAS`
--
ALTER TABLE `VENTAS`
  MODIFY `venta_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `VENTAS`
--
ALTER TABLE `VENTAS`
  ADD CONSTRAINT `VENTAS_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
