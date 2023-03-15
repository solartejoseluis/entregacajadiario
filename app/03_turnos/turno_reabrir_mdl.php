<?php
//session_name("turno_anterior");
session_start();
// Recojo los datos que vienen del formulario y los pongo en variable de sesion para que esten disponibles en la hoja venta_anterior.html:
//$_SESSION["fecha_creado_anterior"] = $_POST['npt_fecha_anterior'];
//$_SESSION["jornada_id_anterior"] = $_POST['npt_jornada_id_anterior'];
//$_SESSION["turno_id_anterior"] = 0;
// muestro las variables del session
// echo "$_SESSION[user_bd]";
// echo "$_SESSION[password_bd]";
// echo "$_SESSION[user_id]";
$user_id = "$_SESSION[user_id]";
// echo "este es el id:";
// echo "$user_id";



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
        WHERE TURNOS.turno_fecha_creado
        BETWEEN DATE_SUB(CURDATE(),INTERVAL 1 DAY)
        AND CURDATE()
        AND TURNOS.turno_responsable ='$user_id';
        ";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;



//   case 'cargar_turno_id_anterior':
//    // consulta para crear la variable de sesion turno_id_anterior
//     $sql = "SELECT
//     TURNOS.turno_id AS turno_id_anterior
//     FROM TURNOS
//     WHERE turno_id = $_GET[turno_id]
//     ";
//     //$response = $pdo->exec($sql);
//     $stmt = $pdo -> prepare($sql);
//     $stmt -> execute();
//     echo json_encode($stmt); 
//     // seleccion del dato y grabarlo en variable de sesion
//     while ($arr = $stmt->fetch(PDO::FETCH_ASSOC)) {
//       //echo $arr['turno_id_anterior'];
//     $_SESSION['turno_id_anterior'] = $arr['turno_id_anterior'];
//  };
// break;



  }
