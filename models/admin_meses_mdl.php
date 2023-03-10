<?php
session_start();
header('Content-Type: application/json');
require "pdo.php";


switch ($_GET['accion']) {

    case 'crear_variable_de_paso':
        // se crea la variable de sesion mes
        $sql = "SELECT
        MONTH(turno_fecha_creado) AS mes
        FROM TURNOS
        WHERE MONTH(turno_fecha_creado) = $_GET[mes]
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //voy a aintentar extraer el datos desde el fetch all..
        $_SESSION['mes'] = $result[0]->mes;
        echo json_encode($result);
        break;

   
    case 'listar_ventas':
        // ENVIA LOS DATOS AL DATATABLES
        $sql = "SELECT
            MONTH(venta_fecha) AS mes,
            YEAR(venta_fecha) AS año,
            SUM(venta_utilidad) AS acumulado_utilidad,
            COUNT(venta_utilidad) AS cuenta_num_gestiones
            FROM VENTAS GROUP BY mes";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

};
