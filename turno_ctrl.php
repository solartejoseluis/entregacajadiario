<?php
session_start();

// Cargar las funciones
require("funciones.php");

//obtener variables
$turno_fecha_creado = $_POST['npt_fecha'];
$turno_jornada = $_POST['npt_jornada_id'];
$turno_responsable = $_POST['npt_responsable_id'];

// conectar la base de datos
$conn=conectarBD();

// sql de agregar datos a tabla turnos
$sql = "INSERT INTO TURNOS(
  turno_fecha_creado,
  turno_jornada,
  turno_responsable)
VALUES(
'$turno_fecha_creado',
turno_jornada,
turno_responsable)";
//$resultado = ejecutar_sql($conn,$sql);
$resultado = ejecutarSQL($sql);

// echo "
// <html>
// <head>
//   <meta http-equiv='REFRESH' content='0;url=venta_home.php'>
// </head>
// </html>
// ";

echo "llego al final del turno_ctrl.php"


// CERRAR LA CONEXIÓN
mysql_close($conn);
?>