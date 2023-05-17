<?php
require "../00_connect/pdo.php";
$sql="SELECT
cliente_id,
CONCAT(cliente_nombre,' ',cliente_apellido) AS cliente_nombre
FROM CLIENTES
";
$stmt = $pdo->prepare($sql);
$stmt -> execute();
$clientes_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo '<option value="0">Seleccionar</option>';
foreach ($clientes_result as $row){
	echo '<option value="'.$row["cliente_id"].'">'.$row["cliente_nombre"].'</option>';
}
