<?php
// require "../00_connect/pdo.php";
// $sql="SELECT 
// rol_vendedor_id,
// rol_vendedor_descripcion
// FROM ROL_VENDEDOR";
// $stmt = $pdo-> prepare($sql);
// $stmt -> execute();
// $users_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
// echo '<option value="0">Seleccionar</option>';
// foreach ($users_result as $row){
// 	echo '<option value="'.$row["rol_vendedor_id"].'">'.$row["rol_vendedor_descripcion"].'</option>';
// }



require "../00_connect/pdo.php";
$sql="SELECT 
user_id,
user_vendedor
FROM USERS
WHERE user_vendedor='SI'";
$stmt = $pdo-> prepare($sql);
$stmt -> execute();
$users_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo '<option value="0" disabled selected hidden>Seleccionar</option>';
foreach ($users_result as $row){
	echo '<option value="'.$row["rol_vendedor_id"].'">'.$row["rol_vendedor_descripcion"].'</option>';
}


?>