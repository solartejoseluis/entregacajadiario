<?php
session_start();
header('Content-Type: application/json');
require "pdo.php";

switch ($_GET['accion']) {
   
    case 'listar_ventas':
        // ENVIA LOS DATOS AL DATATABLES
        $sql = "SELECT
            ELT(MONTH(venta_fecha), 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre') AS mes,
            YEAR(venta_fecha) AS año,
            SUM(venta_utilidad) AS acumulado_utilidad,
            COUNT(venta_utilidad) AS cuenta_num_gestiones
            FROM VENTAS GROUP BY mes";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'listar_ventas_mes_vendedor':
        // ENVIA LOS DATOS AL DATATABLES
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
        VENTAS.turno_id
        FROM VENTAS
        INNER JOIN USERS
        ON VENTAS.user_id=USERS.user_id
        WHERE (MONTH(venta_fecha) = 2
        AND (VENTAS.user_id = $_GET[user_id])
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

};
