<?php
session_start();
header('Content-Type: application/json');
require "pdo.php";
//$usuario_de_sesion = $_SESSION['user_id'];

switch ($_GET['accion']) {

    case 'consultar_acceso':
        // se ordenan descendente por turno_id y solo se muestra el primer registro
        $sql = "SELECT 
        acceso_id, 
        turno_id, 
        user_id 
        FROM ACCESOS 
        WHERE user_id = $_SESSION[user_id]
        ORDER BY turno_id 
        DESC LIMIT 1
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

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
        WHERE turno_id=$_GET[turno_id]
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'guardar_venta':
        $sql = "INSERT INTO VENTAS(
        venta_nombre_producto,
        venta_nombre_proveedor,
        venta_costo_producto,
        venta_valor_venta,
        user_id,
        venta_utilidad,
        turno_id
      )VALUES (
        '$_POST[venta_nombre_producto]',
        '$_POST[venta_nombre_proveedor]',
        $_POST[venta_costo_producto],
        $_POST[venta_valor_venta],
        $_POST[user_id],
        $_POST[venta_utilidad],
        $_POST[turno_id_actual]
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
    
};
