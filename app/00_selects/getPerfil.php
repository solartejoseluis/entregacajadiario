<?php
require "../00_connect/pdo.php";
$sql="SELECT 
perfil_id,
perfil_nombre,
perfil_descripcion 
FROM PERFILES";
$stmt = $pdo-> prepare($sql);
$stmt -> execute();
$users_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo '<option value="0">Seleccionar</option>';
foreach ($users_result as $row){
	echo '<option value="'.$row["perfil_id"].'">'.$row["perfil_nombre"].'</option>';
}
?>