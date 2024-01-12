-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-01-2024 a las 21:25:12
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
-- Base de datos: coffeeshop
--
CREATE DATABASE IF NOT EXISTS coffeeshop DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE coffeeshop;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla administrador
--

CREATE TABLE administrador (
  id_administrador int(10) UNSIGNED NOT NULL,
  nombre_administrador varchar(50) NOT NULL,
  apellido_administrador varchar(50) NOT NULL,
  correo_administrador varchar(100) NOT NULL,
  alias_administrador varchar(25) NOT NULL,
  clave_administrador varchar(100) NOT NULL,
  fecha_registro datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla categoria
--

CREATE TABLE categoria (
  id_categoria int(10) UNSIGNED NOT NULL,
  nombre_categoria varchar(50) NOT NULL,
  descripcion_categoria varchar(250) DEFAULT NULL,
  imagen_categoria varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla cliente
--

CREATE TABLE cliente (
  id_cliente int(10) UNSIGNED NOT NULL,
  nombre_cliente varchar(50) NOT NULL,
  apellido_cliente varchar(50) NOT NULL,
  dui_cliente varchar(10) NOT NULL,
  correo_cliente varchar(100) NOT NULL,
  telefono_cliente varchar(9) NOT NULL,
  direccion_cliente varchar(250) NOT NULL,
  nacimiento_cliente date NOT NULL,
  clave_cliente varchar(100) NOT NULL,
  estado_cliente tinyint(1) NOT NULL DEFAULT 1,
  fecha_registro date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla detalle_pedido
--

CREATE TABLE detalle_pedido (
  id_detalle int(10) UNSIGNED NOT NULL,
  id_producto int(10) UNSIGNED NOT NULL,
  cantidad_producto smallint(6) UNSIGNED NOT NULL,
  precio_producto decimal(5,2) UNSIGNED NOT NULL,
  id_pedido int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla pedido
--

CREATE TABLE pedido (
  id_pedido int(10) UNSIGNED NOT NULL,
  id_cliente int(10) UNSIGNED NOT NULL,
  direccion_pedido varchar(250) NOT NULL,
  estado_pedido enum('Pendiente','Finalizado','Entregado','Anulado') NOT NULL,
  fecha_registro date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla producto
--

CREATE TABLE producto (
  id_producto int(10) UNSIGNED NOT NULL,
  nombre_producto varchar(50) NOT NULL,
  descripcion_producto varchar(250) NOT NULL,
  precio_producto decimal(5,2) NOT NULL,
  existencias_producto int(10) UNSIGNED NOT NULL,
  imagen_producto varchar(25) NOT NULL,
  id_categoria int(10) UNSIGNED NOT NULL,
  estado_producto tinyint(1) NOT NULL,
  id_administrador int(10) UNSIGNED NOT NULL,
  fecha_registro date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla administrador
--
ALTER TABLE administrador
  ADD PRIMARY KEY (id_administrador),
  ADD UNIQUE KEY correo_usuario (correo_administrador),
  ADD UNIQUE KEY alias_usuario (alias_administrador);

--
-- Indices de la tabla categoria
--
ALTER TABLE categoria
  ADD PRIMARY KEY (id_categoria),
  ADD UNIQUE KEY nombre_categoria (nombre_categoria);

--
-- Indices de la tabla cliente
--
ALTER TABLE cliente
  ADD PRIMARY KEY (id_cliente),
  ADD UNIQUE KEY dui_cliente (dui_cliente),
  ADD UNIQUE KEY correo_cliente (correo_cliente);

--
-- Indices de la tabla detalle_pedido
--
ALTER TABLE detalle_pedido
  ADD PRIMARY KEY (id_detalle),
  ADD KEY id_producto (id_producto),
  ADD KEY id_pedido (id_pedido);

--
-- Indices de la tabla pedido
--
ALTER TABLE pedido
  ADD PRIMARY KEY (id_pedido),
  ADD KEY id_cliente (id_cliente);

--
-- Indices de la tabla producto
--
ALTER TABLE producto
  ADD PRIMARY KEY (id_producto),
  ADD UNIQUE KEY nombre_producto (nombre_producto,id_categoria),
  ADD KEY id_categoria (id_categoria),
  ADD KEY id_usuario (id_administrador);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla administrador
--
ALTER TABLE administrador
  MODIFY id_administrador int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla categoria
--
ALTER TABLE categoria
  MODIFY id_categoria int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla cliente
--
ALTER TABLE cliente
  MODIFY id_cliente int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla detalle_pedido
--
ALTER TABLE detalle_pedido
  MODIFY id_detalle int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla pedido
--
ALTER TABLE pedido
  MODIFY id_pedido int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla producto
--
ALTER TABLE producto
  MODIFY id_producto int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla detalle_pedido
--
ALTER TABLE detalle_pedido
  ADD CONSTRAINT detalle_pedido_ibfk_1 FOREIGN KEY (id_producto) REFERENCES producto (id_producto) ON UPDATE CASCADE,
  ADD CONSTRAINT detalle_pedido_ibfk_2 FOREIGN KEY (id_pedido) REFERENCES pedido (id_pedido) ON UPDATE CASCADE;

--
-- Filtros para la tabla pedido
--
ALTER TABLE pedido
  ADD CONSTRAINT pedido_ibfk_1 FOREIGN KEY (id_cliente) REFERENCES `cliente` (id_cliente) ON UPDATE CASCADE;

--
-- Filtros para la tabla producto
--
ALTER TABLE producto
  ADD CONSTRAINT producto_ibfk_1 FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria) ON UPDATE CASCADE,
  ADD CONSTRAINT producto_ibfk_2 FOREIGN KEY (id_administrador) REFERENCES administrador (id_administrador) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
