<?php
header('Content-Type: application/json');
require "pdo.php";

switch ($_GET['accion']) {
case 'listar_ventas':
    $sql = "SELECT 
        VENTAS.venta_id,
        VENTAS.venta_fecha,
        VENTAS.venta_nombre_producto,
        VENTAS.venta_nombre_proveedor,
        VENTAS.venta_costo_producto,
        VENTAS.venta_valor_venta,
        VENTAS.venta_utilidad,
        VENTAS.user_id,
        VENTAS.turno_id
        FROM VENTAS";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;

case 'agregar_venta':
    $sql = "INSERT INTO VENTAS(
        venta_nombre_producto,
        venta_nombre_proveedor,
        venta_costo_producto,
        venta_valor_venta,
        user_id,
        venta_utilidad
        )
    VALUES (
        $_POST[venta_nombre_producto],
        $_POST[vent_nombre_proveedor],
        $_POST[venta_costo_producto],
        $_POST[venta_valor_venta],
        $_POST[user_id],
        $_POST[venta_utilidad]
    )";
    $response = $pdo->exec($sql);
    echo json_encode($response);
    break;

case 'borrar_venta':
    $sql = "DELETE FROM VENTAS where domi_id=$_GET[domi_id]";
    $response = $pdo->exec($sql);
    echo json_encode($response);
    break;

case 'consultar_venta':
// Para cargar el formulario de edicion del  domicilio
    $sql = "SELECT
        domicilios.domi_id,
        barrios.barrio_id,
        barrios.barrio_nombre,
        barrios.barrio_comuna,
        transportadores.trans_id,
        transportadores.trans_nombre,
        domicilios.domi_valor,
        domicilios.domi_hora_salida,
        domicilios.domi_hora_llegada,
        users.user_id,
        users.user_nombre,
        domicilios.domi_observacion
        FROM VENTAS
        INNER JOIN barrios
        ON domicilios.barrio_id=barrios.barrio_id
        INNER JOIN transportadores
        ON domicilios.trans_id=transportadores.trans_id
        INNER JOIN users
        ON domicilios.user_id=users.user_id
        WHERE domi_id=$_GET[domi_id]
    ";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;

case 'modificar_venta':
    $sql = "UPDATE VENTAS SET
        domi_id=$_POST[domi_id],
        barrio_id=$_POST[barrio_id],
        trans_id=$_POST[trans_id],
        domi_valor=$_POST[domi_valor],
        domi_hora_salida='$_POST[domi_hora_salida]',
        domi_hora_llegada='$_POST[domi_hora_llegada]',
        user_id=$_POST[user_id],
        domi_observacion=$_POST[domi_observacion]
    WHERE domi_id=$_GET[domi_id]";
    $response = $pdo->exec($sql);
    echo json_encode($response);
    break;
}
?>
