<?php
session_start();
header('Content-Type: application/json');
require "../00_connect/pdo.php";

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

    case 'consultar_detalle_turno':
        $sql = "SELECT
            TURNOS.turno_id AS turno_id_actual,
            TURNOS.turno_fecha_creado,
            CONCAT(ELT(WEEKDAY(TURNOS.turno_fecha_creado)+ 1, 
        'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom')) AS dia_semana,
            JORNADAS.jornada_nombre,
            CONCAT(USERS.user_nombre,' ',USERS.user_apellido) AS turno_nombres_responsable
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


    case 'carga_dttbl_domi_por_salir':
        $sql = "SELECT
            DATE_FORMAT(DOMICILIOS.hora_creado, '%H:%i') AS hora_creado,
            DOMICILIOS.domicilio_id,
            BARRIOS.barrio_nombre,
            USERS.user_nombre,
            DOMI_EXTERNOS.domi_externo_nombre,
            DOMICILIOS.valor_venta,
            DOMICILIOS.btn_domi_interno,
            DOMICILIOS.btn_domi_externo,
            DOMICILIOS.inyectologia,
            DOMICILIOS.gestion_01,
            DOMICILIOS.gestion_02
            FROM DOMICILIOS
            INNER JOIN USERS
            ON DOMICILIOS.trans_interno_id=USERS.user_id
            INNER JOIN BARRIOS 
            ON DOMICILIOS.barrio_id=BARRIOS.barrio_id
            INNER JOIN DOMI_EXTERNOS
            ON DOMICILIOS.trans_externo_id = DOMI_EXTERNOS.domi_externo_id
            WHERE (hora_salida = 0)
            AND turno_id=$_GET[turno_id]
            ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'carga_dttbl_domi_en_curso':
        $sql = "SELECT
            DATE_FORMAT(DOMICILIOS.hora_creado, '%H:%i') AS hora_creado,
            DOMICILIOS.domicilio_id,
            BARRIOS.barrio_nombre,
            USERS.user_nombre AS domi_interno_nombre,
            DOMI_EXTERNOS.domi_externo_nombre,
            DOMICILIOS.valor_venta,
            DOMICILIOS.btn_domi_interno,
            DOMICILIOS.btn_domi_externo,
            DOMICILIOS.hora_salida,
            DOMICILIOS.gestion_01,
            DOMICILIOS.gestion_02
            FROM DOMICILIOS
            INNER JOIN USERS
            ON DOMICILIOS.trans_interno_id=USERS.user_id
            INNER JOIN BARRIOS 
            ON DOMICILIOS.barrio_id=BARRIOS.barrio_id
            INNER JOIN DOMI_EXTERNOS
            ON DOMICILIOS.trans_externo_id = DOMI_EXTERNOS.domi_externo_id
            WHERE (DOMICILIOS.hora_salida != 0) AND (DOMICILIOS.hora_llegada = 0)
            AND DOMICILIOS.turno_id=$_GET[turno_id]
            ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'carga_dttbl_domi_entregados':
        $sql = "SELECT
			DOMICILIOS.domicilio_id,
			DATE_FORMAT(DOMICILIOS.hora_creado,'%H:%i') AS hora_creado,
            BARRIOS.barrio_nombre,
            USERS.user_nombre,
            DOMI_EXTERNOS.domi_externo_nombre,
            DOMICILIOS.valor_domi_externo,
            DOMICILIOS.valor_venta,
            DOMICILIOS.numero_factura,
            DOMICILIOS.hora_salida,
            DOMICILIOS.hora_llegada,
            DOMICILIOS.observaciones,
            DOMICILIOS.turno_id
            FROM DOMICILIOS 
            INNER JOIN USERS
            ON DOMICILIOS.trans_interno_id=USERS.user_id
            INNER JOIN BARRIOS 
            ON DOMICILIOS.barrio_id=BARRIOS.barrio_id
            INNER JOIN DOMI_EXTERNOS
            ON DOMICILIOS.trans_externo_id = DOMI_EXTERNOS.domi_externo_id
            WHERE (hora_salida != '0') AND (hora_llegada != '0')
            AND (turno_id=$_GET[turno_id]);
            ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;



    case 'carga_dttbl_gestiones':
        // ENVIA LOS DATOS AL DATATABLES
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
        WHERE turno_id=$_GET[turno_id]";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'borrar_venta':
        $sql = "DELETE FROM VENTAS WHERE venta_id=$_GET[venta_id]";
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
        WHERE venta_id=$_GET[venta_id]";
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



    case 'total_utilidad_gestiones':
        $sql = "SELECT
            SUM(venta_utilidad)  AS sumatoria_gestiones
            FROM VENTAS
            WHERE turno_id=$_GET[turno_id]";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'cuenta_de_gestiones':
        $sql = "SELECT
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
            turno_saldo_caja = '$_POST[turno_saldo_caja]',
            turno_total_utilidad = '$_POST[turno_total_utilidad]',
            turno_total_entrega = '$_POST[turno_total_entrega]',
            turno_descuadre = '$_POST[turno_descuadre]',
            turno_fechahora_cierre = now(),
            turno_sobrante = '$_POST[turno_sobrante]',
            turno_faltante = '$_POST[turno_faltante]',
            turno_entrega_final = '$_POST[turno_entrega_final]'
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



    case 'acumulado_mes_usuario_actual':
        $sql = "SELECT
            SUM(venta_utilidad) AS acumulado_utilidad,
            COUNT(venta_utilidad) AS cuenta_nmr_gestiones,
            ROUND(SUM(venta_utilidad)/2,0) AS acumulado_ganancia
            FROM VENTAS
            WHERE (MONTH(venta_fecha) = (MONTH(CURRENT_DATE())))
            AND (user_id=$_GET[user_id])";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'acumulado_turno_usuario_actual':
        $sql = "SELECT
            SUM(venta_utilidad) AS acumulado_utilidad_turno,
            COUNT(venta_utilidad) AS cuenta_nmr_gestiones_turno,
            ROUND(SUM(venta_utilidad)/2,0) AS acumulado_ganancia_turno
            FROM VENTAS
            WHERE (turno_id=$_GET[turno_id])
            AND (user_id=$_GET[user_id])";
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
        $sql = "SELECT 
        VENTAS.venta_id,
        VENTAS.venta_fecha,
        DATE_FORMAT(venta_fecha,'%Y-%m-%d') AS FECHA,
        ELT(WEEKDAY(venta_fecha)+ 1, 
        'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom') AS DIA,
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
        WHERE 
        (MONTH(venta_fecha) = (MONTH(CURRENT_DATE())))
        AND 
        (VENTAS.user_id = $_GET[user_id])
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
        WHERE 
        (MONTH(venta_fecha) = (MONTH(CURRENT_DATE())))
        AND
        (YEAR(venta_fecha) = (YEAR(CURRENT_DATE())))
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
        WHERE venta_fecha
        BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 3 MONTH) AND CURRENT_DATE();

        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;
};
