<?php
header('Content-Type: application/json');
require "pdo.php";

switch ($_GET['accion']) {
case 'listar_ventas':
// ENVIA LOS DATOS AL DATATABLES
    $sql = "SELECT 
        VENTAS.venta_id,
        VENTAS.venta_nombre_producto,
        VENTAS.venta_nombre_proveedor,
        VENTAS.venta_costo_producto,
        VENTAS.venta_valor_venta,
        USERS.user_nombre,
        VENTAS.venta_utilidad,
        VENTAS.turno_id
        FROM VENTAS
        INNER JOIN USERS
        ON VENTAS.user_id=USERS.user_id
        ";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;
case 'guardar_venta':
// GRABA EN LA TABLA EL NUEVO REGISTRO
    $sql = "INSERT INTO VENTAS(
        venta_nombre_producto,
        venta_nombre_proveedor,
        venta_costo_producto,
        venta_valor_venta,
        user_id,
        venta_utilidad
        )
    VALUES (
        '$_POST[venta_nombre_producto]',
        '$_POST[venta_nombre_proveedor]',
        $_POST[venta_costo_producto],
        $_POST[venta_valor_venta],
        $_POST[user_id],
        $_POST[venta_utilidad]
    )";
    $response = $pdo->exec($sql);
    echo json_encode($response);
    break;


case 'borrar_venta':
// BORRA EL REGISTRO ENrecuperarRegistro LA TABLA
    $sql = "DELETE FROM VENTAS where venta_id=$_GET[venta_id]";
    $response = $pdo->exec($sql);
    echo json_encode($response);
    break;

case 'consultar_venta':
// VIENE DEL BOTON EDITAR REGISTRO
    $sql = "SELECT
        VENTAS.venta_id,
        VENTAS.venta_nombre_producto,
        VENTAS.venta_nombre_proveedor,
        VENTAS.venta_costo_producto,
        VENTAS.venta_valor_venta,
        VENTAS.user_id,
        USERS.user_nombre,
        VENTAS.venta_utilidad,
        VENTAS.turno_id
        FROM VENTAS
        INNER JOIN USERS
        ON VENTAS.user_id=USERS.user_id
        WHERE venta_id=$_GET[venta_id]
    ";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;


case 'modificar_venta':
//GUARDA REGISTRO EDITADO
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


case 'consultar_utilidad':
    $sql = "SELECT SUM(venta_utilidad) AS utilidad_yuly FROM VENTAS WHERE user_id = 1";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;



}
?>
