<?php
session_start();
//RECOGER LOS DATOS DE SECION EN VARIABLES
//$turno_id_actual = $_SESSION['turno_id_actual'];
//$turno_responsable_id = $_SESSION['responsable_id'];
//$turno_jornada_id = $_SESSION['jornada_id'];
require "pdo.php";

$sql = "SELECT 
        MAX(acceso_id),
        turno_id
        FROM ACCESO
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        // seleccion del dato y grabarlo en variable de sesion
        while ($arr = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $turno_id_actual = $arr['turno_id'];
            echo $arr['turno_id'];
            echo $turno_id_actual;
        };

//la variable la voya pasar por get..
//echo '<meta http-equiv="REFRESH"content="0;url=../views/venta_home_view.html">';
//echo '<meta http-equiv="REFRESH"content="0;url=../models/venta_home_mdl.php">';
?>