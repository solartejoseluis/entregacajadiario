<?php
session_start();
header('Content-Type: application/json');
require "../00_connect/pdo.php";

switch ($_GET['accion']) {
    case 'listar_gestiones_general':
        $sql = "SELECT
            ELT(MONTH(venta_fecha), 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre') AS mes,
            MONTH(venta_fecha) AS mes_actual,
            YEAR(venta_fecha) AS año,
            SUM(venta_utilidad) AS acumulado_utilidad,
            COUNT(venta_utilidad) AS cuenta_num_gestiones
            FROM VENTAS GROUP BY mes";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'listar_gestiones_turnos_mes':
        $sql = "SELECT
        turno_id,
        turno_fecha_creado,
        ELT(WEEKDAY(turno_fecha_creado)+ 1,'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom') AS dia_semana,
        JORNADAS.jornada_nombre,
        USERS.user_nombre,
        turno_saldo_caja,
        turno_total_utilidad,
        turno_total_entrega,
        turno_faltante,
        turno_sobrante,
        TIME(turno_creacion_timestamp) AS hora_creado,
        TIME(turno_fechahora_cierre) AS hora_cierre
        FROM TURNOS
        INNER JOIN USERS
        ON TURNOS.turno_responsable=USERS.user_id
        INNER JOIN JORNADAS
        ON TURNOS.turno_jornada=JORNADAS.jornada_id
        WHERE MONTH(turno_creacion_timestamp) =$_GET[mes_actual]
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'listar_gestiones_dias_mes':
        $sql = "SELECT
        DATE_FORMAT(turno_fecha_creado,'%Y-%m-%d') AS turno_fecha,
        ELT(WEEKDAY(turno_fecha_creado)+ 1,'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom') AS dia_semana,
        SUM(turno_saldo_caja) AS suma_caja,
        SUM(turno_total_utilidad) AS suma_total_utilidad,
        SUM(SUM(turno_total_utilidad)) OVER (ORDER BY TURNOS.turno_fecha_creado ASC) AS acumulado_utilidad_gestiones,
        SUM(turno_total_entrega) AS suma_total_entrega,

        SUM(turno_faltante) AS suma_total_faltante,
        
        SUM(SUM(turno_faltante)) OVER (ORDER BY TURNOS.turno_fecha_creado ASC) AS acumulado_faltante,
        
        SUM(turno_sobrante) AS suma_total_sobrante,
        
        SUM(SUM(turno_sobrante)) OVER (ORDER BY TURNOS.turno_fecha_creado ASC) AS acumulado_sobrante
        FROM TURNOS
        WHERE MONTH(turno_fecha_creado) = $_GET[mes_actual]
        GROUP BY turno_fecha
        ORDER BY turno_fecha ASC;
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'listar_gestiones_mes':
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
        USERS.user_nombre,
        VENTAS.venta_utilidad,
        VENTAS.turno_id
        FROM VENTAS
        INNER JOIN USERS
        ON VENTAS.user_id=USERS.user_id
        WHERE MONTH(venta_fecha)=$_GET[mes_actual]
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'informe_gestiones_mes':
        $sql = "SELECT
        CONCAT(USERS.user_nombre,' ',USERS.user_apellido)  AS user_nombre,
          SUM(venta_utilidad) AS acumulado_utilidad,
          COUNT(venta_utilidad) AS cuenta_num_gestiones,
          SUM(venta_utilidad)  DIV 2 AS valor_a_pagar
          FROM VENTAS
          INNER JOIN USERS ON USERS.user_id = VENTAS.user_id
          WHERE MONTH(venta_fecha)=$_GET[mes_actual]
          GROUP BY USERS.user_nombre;
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;



    case 'informe_gestiones_mes_turno':
        $sql = "SELECT
        ELT(MONTH(turno_fecha_creado), 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre') AS mes,
        SUM(turno_saldo_caja) AS suma_total_caja,
        SUM(turno_total_utilidad) AS suma_total_utilidad,
        SUM(turno_total_entrega) AS suma_total_entrega,
        
        SUM(turno_faltante) AS suma_total_faltante,
        SUM(turno_sobrante) AS suma_total_sobrante,
        
        SUM(turno_total_utilidad) DIV 2 AS suma_total_pago_vendedor
        FROM TURNOS
        WHERE MONTH(turno_fecha_creado)=$_GET[mes_actual];
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'ver_detalle_turno':
        $sql = "SELECT 
        VENTAS.venta_id,
        VENTAS.venta_nombre_producto,
        VENTAS.venta_nombre_proveedor,
        VENTAS.venta_costo_producto,
        VENTAS.venta_valor_venta,
        CONCAT(USERS.user_nombre,' '. USER.user_apellido)  AS user_nombre,
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



    case 'consultarDatosTurnoActual':
        $sql = "SELECT
            DATE_FORMAT(turno_fecha_creado,'%Y-%m-%d') AS FECHA,
            ELT(WEEKDAY(turno_fecha_creado)+ 1,
            'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom') AS DIA,
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

    case 'listar_domicilios_general':
        $sql = "SELECT
            MONTH(hora_creado) AS mes_actual,
            ELT(MONTH(hora_creado), 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre') AS mes,
            YEAR(hora_creado) AS año,
			COUNT(valor_venta) AS cuenta_domi_total,
            SUM(valor_venta) AS suma_domi_total
            FROM DOMICILIOS GROUP BY mes;";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'listar_domicilios_turnos':
        $sql = "SELECT
           TURNOS.turno_id,
           TURNOS.turno_fecha_creado,
           CONCAT(USERS.user_nombre,' ',USERS.user_apellido) AS responsable_turno,
           ELT(WEEKDAY(hora_creado) + 1,
           'Lun','Mar','Mie','Jue','Vie','Sab','Dom') AS dia_semana,
           JORNADAS.jornada_nombre AS jornada,
           SUM(btn_domi_interno) + SUM(btn_domi_externo) AS total_domi_turno,
           SUM(valor_venta) AS suma_venta,
           SUM(btn_domi_interno) AS cuenta_domi_interno,
           SUM(btn_domi_interno)*500 AS pago_domi_interno,    
           SUM(btn_domi_externo) AS cuenta_domi_externo,
           SUM(valor_domi_externo) AS pago_domi_externo
        FROM
            DOMICILIOS
        INNER JOIN TURNOS ON TURNOS.turno_id = DOMICILIOS.turno_id
        INNER JOIN USERS ON USERS.user_id = TURNOS.turno_responsable
        INNER JOIN JORNADAS ON JORNADAS.jornada_id = TURNOS.turno_jornada
        WHERE (MONTH(hora_creado)=$_GET[mes_actual])
        GROUP BY
            DOMICILIOS.turno_id;
            
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;



    case 'listar_domicilios_dias':
        $sql = "SELECT
        DATE_FORMAT(hora_creado, '%d') AS dia_del_mes,
        DATE_FORMAT(hora_creado, '%M-%d') AS fecha,
        ELT(WEEKDAY(hora_creado) + 1,'Lun','Mar','Mie','Jue','Vie','Sab','Dom') AS dia,
        COUNT(valor_venta) AS cuenta_total,
        SUM(valor_venta) AS venta_total,
        SUM(btn_domi_interno) AS cuenta_domi_interno,
        SUM(btn_domi_interno)*500 AS pago_domi_interno,    
        SUM(btn_domi_externo) AS cuenta_domi_externo,
        SUM(valor_domi_externo) AS pago_domi_externo
        FROM DOMICILIOS
        GROUP BY DATE_FORMAT(hora_creado, '%d');
            ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'listar_domicilios_mes':
        $sql = "SELECT
			DOMICILIOS.domicilio_id,
			DATE_FORMAT(DOMICILIOS.hora_creado,'%Y-%m-%d') AS fecha_creado,
           ELT(WEEKDAY(hora_creado) + 1,
           'Lun','Mar','Mie','Jue','Vie','Sab','Dom') AS dia,
            BARRIOS.barrio_nombre,
            USERS.user_nombre,
            DOMI_EXTERNOS.domi_externo_nombre,
            DOMICILIOS.valor_domi_externo,
            DOMICILIOS.valor_venta,
            DOMICILIOS.numero_factura,
            DOMICILIOS.hora_salida,
            DOMICILIOS.hora_llegada,
            DOMICILIOS.inyectologia,
            DOMICILIOS.gestion_01,
            DOMICILIOS.gestion_02,
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
            AND (MONTH(hora_creado)=$_GET[mes_actual]);
            ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;



    case 'listar_domicilios_informe_int':
        $sql = "SELECT
            CONCAT(USERS.user_nombre,' ',USERS.user_apellido) AS nombres,
            COUNT(trans_interno_id) AS cuenta_domi,
            COUNT(trans_interno_id) * 500 AS a_pagar
        FROM
            DOMICILIOS
        INNER JOIN USERS ON USERS.user_id = DOMICILIOS.trans_interno_id
        WHERE btn_domi_interno = 1
        AND (MONTH(hora_creado)=$_GET[mes_actual])
        GROUP BY
            trans_interno_id
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'calcula_total_domi_mes_int':
        $sql = "SELECT
            COUNT(trans_interno_id) AS total_domi,
            COUNT(trans_interno_id) * 500 AS total_a_pagar
        FROM
            DOMICILIOS
        WHERE
            btn_domi_interno = 1
        AND (MONTH(hora_creado)=$_GET[mes_actual])
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'listar_domicilios_informe_ext':
        $sql = "SELECT
            DOMI_EXTERNOS.domi_externo_nombre AS nombres,
            COUNT(domi_externo_id) AS cuenta_domi,
            SUM(valor_domi_externo) AS pagado_ext
        FROM
            DOMICILIOS
        INNER JOIN DOMI_EXTERNOS ON DOMI_EXTERNOS.domi_externo_id = DOMICILIOS.trans_externo_id
        WHERE
            btn_domi_externo = 1 
            AND(
                MONTH(hora_creado) = $_GET[mes_actual]
            )
        GROUP BY
            domi_externo_id
            ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'calcula_total_domi_mes_ext':
        $sql = "SELECT
            COUNT(trans_externo_id) AS total_domi,
            SUM(valor_domi_externo) AS suma_domi_externo
        FROM
            DOMICILIOS
        WHERE
            btn_domi_externo = 1
        AND (MONTH(hora_creado)=$_GET[mes_actual])
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;
};
