<?php
//header('Content-Type: application/json');
require "../00_connect/pdo.php";
$sql="SELECT user_id,user_nombre
FROM USERS
WHERE user_vendedor = 1
";
$stmt = $pdo-> prepare($sql);
$stmt -> execute();
$users_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo '<option value="0">Seleccionar</option>';
foreach ($users_result as $row){
	echo '<option value="'.$row["user_id"].'">'.$row["user_nombre"].'</option>';
}
?>