<?php
//header('Content-Type: application/json');
require "../pdo.php";
$sql="SELECT trans_id,trans_nombre FROM transportadores";
$stmt = $pdo-> prepare($sql);
$stmt -> execute();
$transportadores_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo '<option value="0">Seleccionar</option>';
foreach ($transportadores_result as $row){
	echo '<option value="'.$row["trans_id"].'">'.$row["trans_nombre"].'</option>';
}
?>