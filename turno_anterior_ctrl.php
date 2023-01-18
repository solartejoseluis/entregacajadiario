<?php
session_name("turno_anterior");
session_start();

// Recojo los datos que vienen del formulario y los pongo en variable de sesion para que esten disponibles en la hoja venta_anterior.html:
$_SESSION["fecha_creado_anterior"] = $_POST['npt_fecha_anterior'];
$_SESSION["jornada_id_anterior"] = $_POST['npt_jornada_id_anterior'];
$_SESSION["turno_id_anterior"] = 0;


  //header('Content-Type: application/json');
require "pdo.php";

$sql = "SELECT
turno_id as turno_id_anterior,
turno_fecha_creado,
turno_jornada,
turno_responsable,
turno_saldo_caja,
turno_total_utilidad,
turno_total_entrega,
turno_descuadre
FROM TURNOS 
WHERE (turno_fecha_creado='$_POST[npt_fecha_anterior]')
AND (turno_jornada=$_POST[npt_jornada_id_anterior])
  ";
 
$stmt = $pdo -> prepare($sql);
$stmt -> execute();

// seleccion del dato y grabarlo en variable de sesion
 while ($arr = $stmt->fetch(PDO::FETCH_ASSOC)) {
    //echo $arr['turno_id_actual'];
$_SESSION['turno_id_anterior'] = $arr['turno_id_anterior'];
 };

if ($_SESSION["turno_id_anterior"]>0){
//echo "la variable de sesion es . $_SESSION[turno_id_anterior]";
echo'<meta http-equiv="REFRESH"content="0;url=venta_anterior_view.html">';


}else{

echo "el turno no existe (se mantuvo en valor cero)";

};

?>