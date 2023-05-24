<?php
require "../00_connect/pdo.php";
$sql="SELECT
user_id,
CONCAT(user_nombre,' ',user_apellido) AS user_nombre
FROM USERS
wHERE user_transportador ='SI'
";
$stmt = $pdo->prepare($sql);
$stmt -> execute();
$clientes_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo '<option value="0">Seleccionar</option>';
foreach ($clientes_result as $row){
	echo '<option value="'.$row["user_id"].'">'.$row["user_nombre"].'</option>';
}
