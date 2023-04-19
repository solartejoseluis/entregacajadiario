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
        '$_POST[user_vendedor]'
    )";
        $response = $pdo->exec($sql);
        echo json_encode($response);
        break;

    case 'borrar_venta':
        $sql = "DELETE FROM VENTAS  WHERE venta_id=$_GET[venta_id]";
        $response = $pdo->exec($sql);
        echo json_encode($response);
        break;

    case 'consultar_venta':
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

    case 'consultar_utilidad_vendedor1':
        $sql = "SELECT
            SUM(venta_utilidad) AS utilidad_vendedor1,
            COUNT(venta_utilidad) AS ventas_vendedor1
            FROM VENTAS WHERE (user_id = 1)
            AND (turno_id=$_GET[turno_id])";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'consultar_utilidad_vendedor2':
        $sql = "SELECT
            SUM(venta_utilidad)  AS utilidad_vendedor2,
            COUNT(venta_utilidad) AS ventas_vendedor2
            FROM VENTAS WHERE (user_id = 2)
            AND (turno_id=$_GET[turno_id])";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'consultar_utilidad_vendedor3':
        $sql = "SELECT
            SUM(venta_utilidad)  AS utilidad_vendedor3,
            COUNT(venta_utilidad) AS ventas_vendedor3
            FROM VENTAS WHERE (user_id = 3)
            AND (turno_id=$_GET[turno_id])";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'consultar_utilidad_vendedor4':
        $sql = "SELECT
            SUM(venta_utilidad)  AS utilidad_vendedor4,
            COUNT(venta_utilidad) AS ventas_vendedor4
            FROM VENTAS WHERE (user_id = 4)
            AND (turno_id=$_GET[turno_id])";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'consultar_utilidad_turno':
        $sql = "SELECT
            SUM(venta_utilidad)  AS utilidad_turno,
            COUNT(venta_utilidad) AS ventas_turno
            FROM VENTAS
            WHERE turno_id=$_GET[turno_id]";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'guardar_inicio':
        $sql = "INSERT INTO TURNOS(
        turno_fecha,
        turno_jornada,
        turno_responsable
        )
    VALUES (
        '$_POST[fecha_actual]',
        $_POST[jornada_id],
        $_POST[responsable_id]
    )";
        $response = $pdo->exec($sql);
        echo json_encode($response);
        break;


    case 'guardar_cierre_turno':
        $sql = "UPDATE TURNOS SET
            turno_saldo_caja = $_POST[turno_saldo_caja],
            turno_total_utilidad = $_POST[turno_total_utilidad],
            turno_total_entrega = $_POST[turno_total_entrega],
            turno_descuadre = $_POST[turno_descuadre],
            turno_fechahora_cierre = now()
    WHERE turno_id = $_GET[turno_id]";
        $response = $pdo->exec($sql);
        echo json_encode($response);
        break;


    case 'guardar_turno':
        $sql = "INSERT INTO TURNOS(
        turno_fecha_creado,
        turno_jornada,
        turno_responsable)
        VALUES(
        '$_POST[turno_fecha_creado]',
        $_POST[turno_jornada],
        $_POST[turno_responsable])";
        $response = $pdo->exec($sql);
        echo json_encode($response);
        break;

    case 'consultarDatosTurnoActual':
        $sql = "SELECT
            TURNOS.turno_id AS turno_id_actual,
            TURNOS.turno_jornada,
            TURNOS.turno_responsable,
            USERS.user_nombre,
            USERS.user_apellido,
            JORNADAS.jornada_nombre
            FROM TURNOS
            INNER JOIN USERS
            ON USERS.user_id=TURNOS.turno_responsable
            INNER JOIN JORNADAS
            ON JORNADAS.jornada_id=TURNOS.turno_jornada
            WHERE turno_id=$_GET[turno_id]";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'consultar_acumulado':
        $sql = "SELECT
            MONTH(venta_fecha) AS mes_actual,
            SUM(venta_utilidad) AS acumulado_utilidad,
            COUNT(venta_utilidad) AS cuenta_num_gestiones,
            ROUND(SUM(venta_utilidad)/2,0) AS acumulado_ganancia
            FROM VENTAS
            WHERE (MONTH(venta_fecha) = (MONTH(CURRENT_DATE())))
            AND (user_id=$_GET[user_id])
            ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'consultar_turno_cerrado':
        $sql = "SELECT
            turno_saldo_caja,
            turno_total_utilidad,
            turno_total_entrega,
            turno_descuadre
            FROM TURNOS
            WHERE turno_id=$_GET[turno_id]
            ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'listar_ventas_mes_vendedor':
        // ENVIA LOS DATOS AL DATATABLES
        $sql = "SELECT 
        VENTAS.venta_id,
        VENTAS.venta_fecha,
        DATE_FORMAT(venta_fecha,'%Y-%m-%d') AS FECHA,
        CONCAT(ELT(WEEKDAY(venta_fecha)+ 1, 
        'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom')) AS DIA,
        DATE_FORMAT(venta_fecha,'%H-%i') AS HORA,
        VENTAS.venta_nombre_producto,
        VENTAS.venta_nombre_proveedor,
        VENTAS.venta_costo_producto,
        VENTAS.venta_valor_venta,
        VENTAS.venta_utilidad,
        VENTAS.turno_id
        FROM VENTAS
        INNER JOIN USERS
        ON VENTAS.user_id=USERS.user_id
        WHERE (MONTH(venta_fecha) = (MONTH(CURRENT_DATE())))
        AND (VENTAS.user_id = $_GET[user_id])
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'listar_ventas_agrupadas_por_dia_vendedor':
        $sql = "SELECT 
        DATE_FORMAT(venta_fecha,'%Y-%m-%d') AS FECHA,
        CONCAT(ELT(WEEKDAY(venta_fecha)+ 1, 
    'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom')) AS DIA,
		SUM(venta_utilidad) AS UTILIDAD,
		COUNT(venta_id) AS NUM_GESTIONES
        FROM VENTAS
        INNER JOIN USERS
        ON VENTAS.user_id=USERS.user_id
        WHERE (MONTH(venta_fecha) = (MONTH(CURRENT_DATE())))
        AND (VENTAS.user_id = $_GET[user_id])
        GROUP BY FECHA
		ORDER BY FECHA ASC;
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'listar_ventas_mes_todos':
        // ENVIA LOS DATOS AL DATATABLES
        $sql = "SELECT 
        VENTAS.venta_id,
        VENTAS.venta_fecha,
        DATE_FORMAT(venta_fecha,'%Y-%m-%d') AS FECHA,
        CONCAT(ELT(WEEKDAY(venta_fecha)+ 1, 
    'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom')) AS DIA,
        DATE_FORMAT(venta_fecha,'%H-%i') AS HORA,
        VENTAS.venta_nombre_producto,
        VENTAS.venta_nombre_proveedor,
        VENTAS.venta_costo_producto,
        VENTAS.venta_valor_venta,
        VENTAS.venta_utilidad,
        VENTAS.turno_id,
        USERS.user_nombre,
        USERS.user_apellido
        FROM VENTAS
        INNER JOIN USERS
        ON VENTAS.user_id=USERS.user_id
        WHERE (MONTH(venta_fecha) = (MONTH(CURRENT_DATE())))
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;
};
