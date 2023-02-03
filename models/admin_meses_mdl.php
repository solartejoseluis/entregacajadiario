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
        echo json_encode($result); 
        
        $_SESSION['mes'] = json_decode($result.mes);
             
        
        
        // seleccion del dato y grabarlo en variable de sesion
        //while ($arr = $stmt->fetch(PDO::FETCH_ASSOC)) {
        //echo $arr['mes'];
        //$_SESSION['mes'] = $arr['mes'];
       // };
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
