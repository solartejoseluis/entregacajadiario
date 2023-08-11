<?php
require "../00_connect/pdo.php";
$sql="SELECT 
user_id AS vendedor_id,
CONCAT(user_nombre,' ',user_apellido) AS vendedor_nombres
FROM USERS
WHERE user_perfil = 1
";
$stmt = $pdo-> prepare($sql);
$stmt -> execute();
$users_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo '<option value="0"></option>';
foreach ($users_result as $row){
	echo '<option value="'.$row["vendedor_id"].'">'.$row["vendedor_nombres"].'</option>';
}
