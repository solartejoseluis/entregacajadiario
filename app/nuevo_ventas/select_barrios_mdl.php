<?php
require "../00_connect/pdo.php";
$sql="SELECT
barrio_id,
barrio_nombre
FROM BARRIOS
";
$stmt = $pdo->prepare($sql);
$stmt -> execute();
$barrios_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo '<option value="0">Seleccionar</option>';
foreach ($barrios_result as $row){
	echo '<option value="'.$row["barrio_id"].'">'.$row["barrio_nombre"].'</option>';
}
