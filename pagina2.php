<!DOCTYPE html>
<meta charset="utf-8">

<head>
  <title>Problema</title>
</head>

<body>
  <?php

session_start();

$_SESSION["nombre"] = "Pepito Conejo";
print "<p>El nombre es $_SESSION[nombre]</p>";
$_SESSION['turno_actual'] = 0;
print "<p>El nombre es $_SESSION[turno_actual]</p>";




  $conexion = mysqli_connect("localhost", "kiron", "123456", "BDPRUEBA") or
    die("Problemas con la conexión");


//consulta en una variable
$sql=
"INSERT INTO PRUEBAS(prueba_fecha_creado,prueba_jornada,prueba_responsable)
  values('$_REQUEST[prueba_fecha_creado]',$_REQUEST[prueba_jornada],$_REQUEST[prueba_responsable])";


// ejecucion de la consulta
  mysqli_query($conexion, $sql) or die("Problemas en el select".mysqli_error($conexion));


// cierre de la conexion
  mysqli_close($conexion);


  echo "La prueba fue creada";
  ?>
</body>