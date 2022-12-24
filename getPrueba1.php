<?php
header('Content-Type: application/json');
require 'pdo.php';
//$sql="SELECT barrio_id, barrio_nombre FROM barrios";
$barrio_nombre =$_GET['barrio_nombre'];
$sql="SELECT barrio_id, barrio_nombre FROM barrios WHERE barrio_nombre LIKE '%".$barrio_nombre."%'";
$stmt = $pdo-> prepare($sql);
$stmt -> execute();
$result_prueba1 = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result_prueba1);
?>
