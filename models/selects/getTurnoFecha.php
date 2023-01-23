<?php
//header('Content-Type: application/json');
require "../models/pdo.php";

// $sql="SELECT distinct turno_fecha_creado FROM TURNOS";
// $stmt = $pdo-> prepare($sql);
// $stmt -> execute();
// $turnoFecha_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
// echo '<option value="0">Seleccionar</option>';
// foreach ($turnoFecha_result as $row){
// 	echo '<option value="'.$row["turno_fecha_creado"].'">'.$row["turno_fecha_creado"].'</option>';
// }


//$sql="SELECT DATE_SUB(CURDATE(),INTERVAL 1 DAY)";
$sql="SELECT * FROM TURNOS";
$stmt = $pdo-> prepare($sql);
$stmt -> execute();

//$turnoFecha_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
//echo '<option value="'.$row["turno_fecha_creado"].'">'.$row["turno_fecha_creado"].'</option>';
echo "este es el resultado de la consulta: ";
echo "$stmt";






?>