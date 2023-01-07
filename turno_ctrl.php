<!DOCTYPE html>

<head>
  <title>turno_ctrl</title>
</head>
<body>
<?php
session_start();
$_SESSION['turno_fecha_creado'] = $_REQUEST['npt_fecha'];
$_SESSION['turno_responsable_id'] = $_REQUEST['npt_responsable_id'];
$_SESSION['turno_jornada_id'] = $_REQUEST['npt_turno_jornada_id'];

  $conexion = mysqli_connect("localhost", "kiron", "123456", "CONTROLCAJA") or
    die("Problemas con la conexión");
mysqli_query($conexion,"INSERT INTO TURNOS(turno_fecha_creado,turno_responsable,turno_jornada)VALUES('$_POST[npt_fecha]',$_POST[npt_responsable_id],$_POST[npt_jornada_id])")or die("Problemas en el select".mysqli_error($conexion));
  mysqli_close($conexion);
  //echo "El turno fue creado";
  echo'<meta http-equiv="REFRESH"content="0;url=venta_home.html">';
?>
</body>