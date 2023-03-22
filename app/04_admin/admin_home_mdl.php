<?php
session_start();
header('Content-Type: application/json');
require "../00_connect/pdo.php";

switch ($_GET['accion']) {

    case 'listar_ventas':
        // ENVIA LOS DATOS AL DATATABLES
        $sql = "SELECT
          ELT(MONTH(venta_fecha), 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre') AS mes,
          MONTH(venta_fecha) AS mes_actual,
          YEAR(venta_fecha) AS año,
          SUM(venta_utilidad) AS acumulado_utilidad,
          COUNT(venta_utilidad) AS cuenta_num_gestiones
          FROM VENTAS GROUP BY mes";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'listar_turnos_mes':
    $sql = "SELECT
    turno_id,
    JORNADAS.jornada_nombre,
    USERS.user_nombre,
    turno_saldo_caja,
    turno_total_utilidad,
    turno_total_entrega,
    turno_descuadre,
    TIME(turno_creacion_timestamp) AS hora_creado,
    TIME(turno_fechahora_cierre) AS hora_cierre
    FROM TURNOS
    INNER JOIN USERS
    ON TURNOS.turno_responsable=USERS.user_id
    INNER JOIN JORNADAS
    ON TURNOS.turno_jornada=JORNADAS.jornada_id
    WHERE MONTH(turno_creacion_timestamp) =$_GET[mes_actual]
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;

case 'listar_dias_mes':
  $sql = "SELECT
    DATE_FORMAT(venta_fecha,'%Y-%m-%d') AS dia,
    ELT(WEEKDAY(venta_fecha)+ 1, 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom') AS nombre_dia,
    SUM(venta_utilidad) AS utilidad,
    COUNT(venta_id) AS num_gestiones
    FROM VENTAS
    WHERE MONTH(venta_fecha) =$_GET[mes_actual]
    GROUP BY dia
    ORDER BY dia ASC
  ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
break;


case 'listar_gestiones_mes':
        $sql = "SELECT
        VENTAS.venta_id,
        VENTAS.venta_fecha,
        DATE_FORMAT(venta_fecha,'%Y-%m-%d') AS FECHA,
        CONCAT(ELT(WEEKDAY(venta_fecha)+ 1,
    'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom')) AS DIA,
        DATE_FORMAT(venta_fecha,'%H-%i') AS HORA,
        VENTAS.venta_nombre_producto,
        VENTAS.venta_nombre_proveedor,
        VENTAS.venta_costo_producto,
        VENTAS.venta_valor_venta,
        VENTAS.venta_utilidad,
        VENTAS.turno_id,
        USERS.user_nombre,
        USERS.user_apellido
        FROM VENTAS
        INNER JOIN USERS
        ON VENTAS.user_id=USERS.user_id
        WHERE MONTH(venta_fecha)=$_GET[mes_actual]
  ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
break;


};