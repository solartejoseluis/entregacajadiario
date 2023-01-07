<!DOCTYPE html>
<meta charset="utf-8">

<head>
  <title>Problema</title>
</head>

<body>
  <?php
  $conexion = mysqli_connect("localhost", "kiron", "123456", "BDPRUEBA") or
    die("Problemas con la conexión");
  mysqli_query($conexion, "INSERT INTO PRUEBAS(prueba_fecha_creado,prueba_jornada,prueba_responsable)
  values('$_REQUEST[prueba_fecha_creado]',$_REQUEST[prueba_jornada],$_REQUEST[prueba_responsable])")
  or die("Problemas en el select" . mysqli_error($conexion));
  mysqli_close($conexion);
  echo "La prueba fue creada";
  ?>
</body>