<?php
session_start();
//RECOGER LOS DATOS DE SECION EN VARIABLES
$turno_id_actual = $_SESSION['turno_id_actual'];
$turno_responsable_id = $_SESSION['responsable_id'];
$turno_jornada_id = $_SESSION['jornada_id'];
require "pdo.php";
  $sql ="INSERT INTO ACCESOS(
      turno_id,
      user_id)
    VALUES(
      $turno_id_actual,
      $turno_responsable_id)";
$stmt = $pdo->prepare($sql);
$stmt->execute();
echo '<meta http-equiv="REFRESH"content="0;url=../views/prueba_venta_home_view.html">';
//echo '<meta http-equiv="REFRESH"content="0;url=../models/turno_consultar_acceso_mdl.php">';
?>