<?php
session_start();
//RECOGER LOS DATOS DE SESION EN VARIABLES
$turno_fecha_creado = $_SESSION['fecha_creado'];
$turno_responsable_id = $_SESSION['responsable_id'];
$turno_jornada_id = $_SESSION['jornada_id'];
//header('Content-Type: application/json');
require "../00_connect/pdo.php";
$sql = "SELECT
    TURNOS.turno_id AS turno_id_actual
    FROM TURNOS
    WHERE (turno_fecha_creado = '$turno_fecha_creado')
    AND (turno_jornada = '$turno_jornada_id')
    AND (turno_responsable = '$turno_responsable_id')";
$stmt = $pdo->prepare($sql);
$stmt->execute();
// seleccion del dato y grabarlo en variable de sesion
while ($arr = $stmt->fetch(PDO::FETCH_ASSOC)) {
    //echo $arr['turno_id_actual'];
    $_SESSION['turno_id_actual'] = $arr['turno_id_actual'];
};
//echo "la variable de sesion es . $_SESSION[turno_id_actual]";
echo '<meta http-equiv="REFRESH"content="0;url=turno_crear_acceso_mdl.php">';
