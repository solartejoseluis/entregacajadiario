<?php
session_start();
$_SESSION['fecha_creado'] = $_POST['npt_fecha'];
$_SESSION['responsable_id'] = $_POST['npt_responsable_id'];
$_SESSION['jornada_id'] = $_POST['npt_jornada_id'];


$conexion = mysqli_connect("localhost", "kiron", "123456", "CONTROLCAJA") or
    die("Problemas con la conexión");

  $sql ="INSERT INTO TURNOS(
      turno_fecha_creado,
      turno_responsable,
      turno_jornada)
    VALUES(
      '$_POST[npt_fecha]',
      $_POST[npt_responsable_id],
      $_POST[npt_jornada_id])";

  mysqli_query($conexion, $sql)or die(
    "Problemas en el select".mysqli_error($conexion));

  mysqli_close($conexion);

//echo 'turno guardado!';

echo'<meta http-equiv="REFRESH"content="0;url=turno2_ctrl.php">';

?>
