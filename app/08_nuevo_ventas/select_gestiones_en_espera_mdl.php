<?php
require "../00_connect/pdo.php";

switch ($_GET['accion']) {

	case 'carga_slct_gestiones_wait':
		$sql = "SELECT 
		VENTAS.venta_id,
		VENTAS.venta_nombre_producto,
		VENTAS.venta_nombre_proveedor,
		VENTAS.venta_costo_producto,
		VENTAS.venta_valor_venta,
		USERS.user_nombre,
		VENTAS.venta_utilidad,
		VENTAS.turno_id,
		VENTAS.venta_tipo
		FROM VENTAS
		INNER JOIN USERS
		ON VENTAS.user_id=USERS.user_id
		WHERE venta_tipo='WAIT'
		";
		$stmt = $pdo->prepare($sql);
		$stmt->execute();
		$result_01 = $stmt->fetchAll(PDO::FETCH_ASSOC);
		echo '<option value="0"></option>';
		foreach ($result_01 as $row) {
			echo '<option value="' . $row["venta_id"] . '">' . $row["venta_nombre_producto"] . " - " . $row["venta_nombre_proveedor"] . " - " . $row["venta_valor_venta"] . '</option>';
		}
		break;

// 	case 'carga_slct_gestiones_wait_02':
// 		$sql02 = "SELECT 
// 			VENTAS.venta_id,
// 			VENTAS.venta_nombre_producto,
// 			VENTAS.venta_nombre_proveedor,
// 			VENTAS.venta_costo_producto,
// 			VENTAS.venta_valor_venta,
// 			USERS.user_nombre,
// 			VENTAS.venta_utilidad,
// 			VENTAS.turno_id,
// 			VENTAS.venta_tipo
// 			FROM VENTAS
// 			INNER JOIN USERS
// 			ON VENTAS.user_id=USERS.user_id
// 			WHERE venta_tipo='WAIT'
// ";
// 		$stmt02 = $pdo->prepare($sql02);
// 		$stmt02->execute();
// 		$result_02 = $stmt02->fetchAll(PDO::FETCH_ASSOC);
// 		echo '<option value="0"></option>';
// 		foreach ($result_02 as $row) {
// 			echo
// 			'<option value="'
// 				. $row["venta_id"]
// 				. '">'
// 				. $row["venta_nombre_producto"]
// 				. " - "
// 				. $row["venta_nombre_proveedor"]
// 				. " - "
// 				. $row["venta_valor_venta"]
// 				. '</option>';
// 		}
// 		break;
}
