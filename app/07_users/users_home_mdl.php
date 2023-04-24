<?php
session_start();
header('Content-Type: application/json');
require "../00_connect/pdo.php";


switch ($_GET['accion']) {

    case 'listar_usuarios':
        $sql = "SELECT
        user_id,
        user_nombre,
        user_apellido,
        user_user,
        user_password,
        user_perfil,
        user_vendedor 
        FROM USERS 
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'guardar_nuevo_usuario':
        $sql = "INSERT INTO USERS(
        user_nombre,
        user_apellido,
        user_user,
        user_password,
        user_perfil,
        user_vendedor
      )VALUES (
        '$_POST[user_nombre]',
        '$_POST[user_apellido]',
        '$_POST[user_user]',
        '$_POST[user_password]',
        $_POST[user_perfil],
        $_POST[user_vendedor]
    )";
        $response = $pdo->exec($sql);
        echo json_encode($response);
        break;

    case 'borrar_usuario':
        $sql = "DELETE FROM USERS
        WHERE user_id=$_GET[user_id]";
        $response = $pdo->exec($sql);
        echo json_encode($response);
        break;

    case 'consultar_usuario':
        $sql = "SELECT
        user_id,
        user_nombre,
        user_apellido,
        user_user,
        user_password,
        user_perfil,
        user_vendedor,
        PERFILES.perfil_id,
        ROL_VENDEDOR.rol_vendedor_id
        FROM USERS
        INNER JOIN PERFILES
        ON USERS.user_perfil=PERFILES.perfil_id
        INNER JOIN ROL_VENDEDOR
        ON USERS.user_vendedor=ROL_VENDEDOR.rol_vendedor_id
        WHERE user_id=$_GET[user_id]
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
