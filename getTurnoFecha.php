<?php
//header('Content-Type: application/json');
require "pdo.php";
$sql="SELECT turno_id,turno_fecha_creado FROM TURNOS";
$stmt = $pdo-> prepare($sql);
$stmt -> execute();
$turnoFecha_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo '<option value="0">Seleccionar</option>';
foreach ($turnoFecha_result as $row){
	echo '<option value="'.$row["turno_id"].'">'.$row["turno_fecha_creado"].'</option>';
}
?>