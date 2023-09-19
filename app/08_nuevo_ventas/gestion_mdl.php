<?php
session_start();
header('Content-Type: application/json');
require "../00_connect/pdo.php";

switch ($_GET['accion']) {

    case 'guardar_nueva_gestion':
        $sql = "INSERT INTO VENTAS(
        venta_nombre_producto,
        venta_nombre_proveedor,
        venta_costo_producto,
        venta_valor_venta,
        venta_utilidad,
        user_id,
        turno_id,
        venta_tipo
      )VALUES (
        '$_POST[venta_nombre_producto]',
        '$_POST[venta_nombre_proveedor]',
        '$_POST[venta_costo_producto]',
        '$_POST[venta_valor_venta]',
        '$_POST[venta_utilidad]',
        '$_POST[user_id]',
        '$_POST[turno_id]',
        '$_POST[venta_tipo]'
    )";
        $response = $pdo->exec($sql);
        echo json_encode($response);
        break;

    case 'borrar_venta':
        $sql = "DELETE FROM VENTAS WHERE venta_id=$_GET[venta_id]";
        $response = $pdo->exec($sql);
        echo json_encode($response);
        break;

    case 'consultar_venta':
        $sql = "SELECT
        VENTAS.venta_id,
        VENTAS.user_id,
        VENTAS.venta_nombre_producto,
        VENTAS.venta_nombre_proveedor,
        VENTAS.venta_costo_producto,
        VENTAS.venta_valor_venta,
        VENTAS.venta_utilidad,
        VENTAS.turno_id
        FROM VENTAS
        INNER JOIN USERS
        ON VENTAS.user_id=USERS.user_id
        WHERE venta_id=$_GET[venta_id]
    ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'modificar_venta':
        $sql = "UPDATE VENTAS SET
        venta_nombre_producto='$_POST[venta_nombre_producto]',
        venta_nombre_proveedor='$_POST[venta_nombre_proveedor]',
        venta_costo_producto=$_POST[venta_costo_producto],
        venta_valor_venta=$_POST[venta_valor_venta],
        user_id=$_POST[user_id],
        venta_utilidad=$_POST[venta_utilidad]
        WHERE venta_id=$_GET[venta_id]";
        $response = $pdo->exec($sql);
        echo json_encode($response);
        break;
};
