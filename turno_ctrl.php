<!DOCTYPE html>

<head>
  <title>turno_ctrl</title>
</head>

<body>
  <?php
  $conexion = mysqli_connect("localhost", "kiron", "123456", "CONTROLCAJA") or
    die("Problemas con la conexión");

// CAPTURO LOS DATOS
$turno_fecha_creado = '_$POST["npt_fecha"]';
$turno_jornada = $_POST["npt_jornada_id"];
$turno_responsable = $POST_["npt_responsable_id"];


  mysqli_query(
  $conexion, "INSERT INTO TURNOS(
  turno_fecha_creado,
  turno_responsable,
  turno_jornada)
  VALUES(
    $turno_fecha_creado,
    $turno_responsable,
    $turno_jornada)");
  or die("Problemas en el select" . mysqli_error($conexion));
  mysqli_close($conexion);
  echo "El turno fue creado";
  ?>
</body>