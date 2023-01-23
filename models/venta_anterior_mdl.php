<?php
//session_name("turno_anterior");
session_start();
//Recojo los datos de sesion en variables
$turno_fecha_creado= $_SESSION['fecha_creado_anterior'];
$turno_jornada_id=$_SESSION['jornada_id_anterior'];
$turno_id_anterior=$_SESSION['turno_id_anterior'];


header('Content-Type: application/json');
require "../models/pdo.php";

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
        WHERE turno_id ='$turno_id_anterior'";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
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
        $_POST[turno_id_anterior]
    )";
    $response = $pdo->exec($sql);
    echo json_encode($response);
    break;


case 'borrar_venta':
// BORRA EL REGISTRO ENrecuperarRegistro LA TABLA
    $sql = "DELETE FROM VENTAS  WHERE venta_id=$_GET[venta_id]";
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


case 'consultar_utilidad_vendedor1':
    $sql = "SELECT
    SUM(venta_utilidad) AS utilidad_vendedor1,
    COUNT(venta_utilidad) AS ventas_vendedor1
     FROM VENTAS WHERE (user_id = 1)
     AND (turno_id='$turno_id_anterior')";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;


case 'consultar_utilidad_vendedor2':
    $sql = "SELECT
    SUM(venta_utilidad)  AS utilidad_vendedor2,
    COUNT(venta_utilidad) AS ventas_vendedor2
    FROM VENTAS WHERE
     (user_id = 2)
     AND (turno_id='$turno_id_anterior')";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;


case 'consultar_utilidad_vendedor3':
    $sql = "SELECT
      SUM(venta_utilidad)  AS utilidad_vendedor3,
      COUNT(venta_utilidad) AS ventas_vendedor3
      FROM VENTAS WHERE
      (user_id = 3)
     AND (turno_id='$turno_id_anterior')";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;

case 'consultar_utilidad_vendedor4':
    $sql = "SELECT
    SUM(venta_utilidad)  AS utilidad_vendedor4,
    COUNT(venta_utilidad) AS ventas_vendedor4
    FROM VENTAS WHERE
     (user_id = 4)
      AND (turno_id='$turno_id_anterior')";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;

case 'consultar_utilidad_turno':
    $sql = "SELECT
    SUM(venta_utilidad)  AS utilidad_turno,
    COUNT(venta_utilidad) AS ventas_turno
    FROM VENTAS
    WHERE turno_id='$turno_id_anterior'";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
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
    turno_descuadre = $_POST[turno_descuadre]
    WHERE turno_id = $_GET[turno_id_anterior]";
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
    TURNOS.turno_id AS turno_id_anterior,
    TURNOS.turno_fecha_creado,
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
    WHERE turno_id='$turno_id_anterior'";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
  break;


};
?>
