<?php
require "../00_connect/pdo.php";
$sql="SELECT
jornada_id,
jornada_nombre 
FROM JORNADAS
";
$stmt = $pdo-> prepare($sql);
$stmt -> execute();
$jornada_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo '<option value="0"  disabled selected hidden>Elija Jornada</option>';
foreach ($jornada_result as $row){
	echo '<option value="'.$row["jornada_id"].'">'.$row["jornada_nombre"].'</option>';
}
?>