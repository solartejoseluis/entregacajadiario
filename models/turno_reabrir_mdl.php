<?php
//session_name("turno_anterior");
//session_start();

// Recojo los datos que vienen del formulario y los pongo en variable de sesion para que esten disponibles en la hoja venta_anterior.html:
//$_SESSION["fecha_creado_anterior"] = $_POST['npt_fecha_anterior'];
//$_SESSION["jornada_id_anterior"] = $_POST['npt_jornada_id_anterior'];
//$_SESSION["turno_id_anterior"] = 0;


header('Content-Type: application/json');
require "pdo.php";

switch ($_GET['accion']) {
  case 'listar_resumen':
   // consulta para cargar el datatables 
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
        ON TURNOS.turno_responsable=USERS.user_id
        WHERE (TURNOS.turno_responsable = 2)
        AND (TURNOS.turno_fecha_creado = DATE_SUB(CURDATE(),INTERVAL 1 DAY))
        ";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;
  }


?>