<?php
session_start();
header('Content-Type: application/json');
require "pdo.php";

switch ($_GET['accion']) {

    case 'listar_ventas':
        // ENVIA LOS DATOS AL DATATABLES
        $sql = "SELECT
        DATE_FORMAT(venta_fecha,'%Y-%m-%d') AS dia,
        SUM(venta_utilidad) AS utilidad,
        COUNT(venta_id) AS num_gestiones
        FROM VENTAS
        WHERE MONTH(venta_fecha) = 2
        GROUP BY dia
        ORDER BY dia ASC
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

};
