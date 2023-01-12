<?php
session_start();

header('Content-Type: application/json');
require "pdo.php";

switch ($_GET['accion']) {
  case 'listar_resumen':
  // ENVIA LOS DATOS AL DATATABLES
    $sql = "SELECT 
        TURNOS.turno_id,
        TURNOS.turno_fecha_creado,
        JORNADAS.jornada_nombre,
        USERS.user_nombre,
        TURNOS.turno_saldo_caja,
        TURNOS.turno_total_utilidad,
        TURNOS.turno_total_entrega,
        TURNOS.turno_descuadre
        FROM TURNOS
        INNER JOIN JORNADAS
        ON TURNOS.turno_jornada=JORNADAS.jornada_id
        INNER JOIN USERS
        ON TURNOS.turno_responsable=USERS.user_id";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;



case 'consultar_utilidad_vendedor1':
    $sql = "SELECT
    SUM(venta_utilidad) AS utilidad_vendedor1,
    COUNT(venta_utilidad) AS ventas_vendedor1
     FROM VENTAS WHERE (user_id = 1)
     AND (turno_id=$_GET[turno_id])";
     $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;


case 'consultar_utilidad_vendedor2':
    $sql = "SELECT
    SUM(venta_utilidad)  AS utilidad_vendedor2,
    COUNT(venta_utilidad) AS ventas_vendedor2
    FROM VENTAS WHERE
     (user_id = 2)
     AND (turno_id=$_GET[turno_id])";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;


case 'consultar_utilidad_vendedor3':
    $sql = "SELECT
      SUM(venta_utilidad)  AS utilidad_vendedor3,
      COUNT(venta_utilidad) AS ventas_vendedor3
      FROM VENTAS WHERE
      (user_id = 3)
     AND (turno_id=$_GET[turno_id])";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;

case 'consultar_utilidad_vendedor4':
    $sql = "SELECT
    SUM(venta_utilidad)  AS utilidad_vendedor4,
    COUNT(venta_utilidad) AS ventas_vendedor4
    FROM VENTAS WHERE
     (user_id = 4)
     AND (turno_id=$_GET[turno_id])";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;

case 'consultar_utilidad_turno':
    $sql = "SELECT
    SUM(venta_utilidad)  AS utilidad_turno,
    COUNT(venta_utilidad) AS ventas_turno
    FROM VENTAS
    WHERE turno_id=$_GET[turno_id]";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;


case 'listar_ventas_dia':
// ENVIA LOS DATOS AL DATATABLES
    $sql = "SELECT
        VENTAS.venta_id,
        VENTAS.venta_nombre_producto,
        VENTAS.venta_nombre_proveedor,
        VENTAS.venta_costo_producto,
        VENTAS.venta_valor_venta,
        USERS.user_nombre,
        VENTAS.venta_utilidad,
        VENTAS.turno_id
        FROM VENTAS
        INNER JOIN USERS
        ON VENTAS.user_id=USERS.user_id
        ";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;
  };
?>
