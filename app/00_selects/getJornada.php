<?php
//header('Content-Type: application/json');
require "../00_connect/pdo.php";
$sql="SELECT jornada_id,jornada_nombre FROM JORNADAS";
$stmt = $pdo-> prepare($sql);
$stmt -> execute();
$jornada_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo '<option value="0">Seleccionar</option>';
foreach ($jornada_result as $row){
	echo '<option value="'.$row["jornada_id"].'">'.$row["jornada_nombre"].'</option>';
}
?>