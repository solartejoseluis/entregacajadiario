<?php
session_start();
header('Content-Type: application/json');
require "../00_connect/pdo.php";

switch ($_GET['accion']) {

    case 'listar_ventas':
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

    case 'listar_turnos_mes':
    $sql = "SELECT
    turno_id,
    turno_fecha_creado,
    ELT(WEEKDAY(turno_fecha_creado)+ 1,'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom') AS dia_semana,
    JORNADAS.jornada_nombre,
    USERS.user_nombre,
    turno_saldo_caja,
    turno_total_utilidad,
    turno_total_entrega,
    turno_descuadre,
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

case 'listar_dias_mes':
  $sql = "SELECT
    DATE_FORMAT(turno_fecha_creado,'%Y-%m-%d') AS turno_fecha,
    ELT(WEEKDAY(turno_fecha_creado)+ 1,'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom') AS dia_semana,
    SUM(turno_saldo_caja) AS suma_caja,
    SUM(turno_total_utilidad) AS suma_total_utilidad,
    SUM(SUM(turno_total_utilidad)) OVER (ORDER BY TURNOS.turno_fecha_creado ASC) AS acumulado_utilidad_gestiones,
    SUM(turno_total_entrega) AS suma_total_entrega,
    SUM(turno_descuadre) AS suma_total_descuadre,
    SUM(SUM(turno_descuadre)) OVER (ORDER BY TURNOS.turno_fecha_creado ASC) AS acumulado_descuadre
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


case 'informe_mes':
        $sql = "SELECT
          USERS.user_nombre,
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



case 'informe_mes_turno':
$sql = "SELECT
ELT(MONTH(turno_fecha_creado), 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre') AS mes,
SUM(turno_saldo_caja) AS suma_total_caja,
SUM(turno_total_utilidad) AS suma_total_utilidad,
SUM(turno_total_entrega) AS suma_total_entrega,
SUM(turno_descuadre) AS suma_total_descuadre,
SUM(turno_total_utilidad) DIV 2 AS suma_total_pago_vendedor
FROM TURNOS
WHERE MONTH(turno_fecha_creado)=$_GET[mes_actual];
";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
break;


};