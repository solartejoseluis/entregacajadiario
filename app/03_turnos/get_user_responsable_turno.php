<?php
require "../00_connect/pdo.php";
$sql="SELECT
user_id,
user_nombre,
CONCAT(user_nombre,' ',user_apellido) AS nombres
FROM USERS
WHERE user_coordina_turno='SI'
";
$stmt = $pdo-> prepare($sql);
$stmt -> execute();
$users_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo '<option value="0" disabled selected hidden>Elija Un Responsable</option>';
foreach ($users_result as $row){
	echo '<option value="'.$row["user_id"].'">'.$row["nombres"].'</option>';
}
?>