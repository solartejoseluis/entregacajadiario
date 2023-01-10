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
  };


?>
