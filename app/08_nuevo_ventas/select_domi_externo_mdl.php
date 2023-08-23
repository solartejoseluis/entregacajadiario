<?php
require "../00_connect/pdo.php";
$sql="SELECT
domi_externo_id,
domi_externo_nombre
FROM DOMI_EXTERNOS
WHERE domi_externo_id >0
";
$stmt = $pdo->prepare($sql);
$stmt -> execute();
$barrios_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo '<option value="0"></option>';
foreach ($barrios_result as $row){
	echo '<option value="'.$row["domi_externo_id"].'">'.$row["domi_externo_nombre"].'</option>';
}
