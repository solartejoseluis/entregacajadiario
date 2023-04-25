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
        user_vendedor,
        PERFILES.perfil_nombre,
        ROL_VENDEDOR.rol_vendedor_descripcion 
        FROM USERS
        INNER JOIN PERFILES
        ON USERS.user_perfil = PERFILES.perfil_id
        INNER JOIN ROL_VENDEDOR
        ON USERS.user_vendedor = ROL_VENDEDOR.rol_vendedor_id 
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
        PERFILES.perfil_nombre,
        ROL_VENDEDOR.rol_vendedor_id,
        ROL_VENDEDOR.rol_vendedor_descripcion
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


    case 'modificar_usuario':
        $sql = "UPDATE USERS SET
        user_nombre='$_POST[npt_edit_user_nombre]',
        user_apellido='$_POST[npt_edit_user_apellido]',
        user_user=$_POST[npt_edit_user_user],
        user_password=$_POST[npt_edit_user_password],
        perfil_id=$_POST[npt_edit_perfil_id],
        rol_vendedor_id=$_POST[npt_edit_rol_vendedor_id]
        WHERE user_id=$_GET[user_id]";
        $response = $pdo->exec($sql);
        echo json_encode($response);
        break;
};
