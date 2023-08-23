<?php
session_start();
header('Content-Type: application/json');
require "../00_connect/pdo.php";

switch ($_GET['accion']) {

    case 'cargar_comuna':
        $sql = "SELECT
            BARRIOS.barrio_comuna,
            BARRIOS.barrio_recomendacion
            FROM  BARRIOS
            WHERE barrio_id = $_GET[barrio_id];
            ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


  case 'guardar_domicilio':
    $sql = "INSERT INTO DOMICILIOS(
      barrio_id,
      numero_factura,
      btn_domi_interno,
      trans_interno_id,
      btn_domi_externo,
      trans_externo_id,
      valor_domi_externo,
      valor_venta,
      hora_salida,
      hora_llegada,
      inyectologia,
      observaciones,
      turno_id
      )VALUES (
      '$_POST[barrio_id]',
      '$_POST[numero_factura]',
      '$_POST[btn_domi_interno]',
      '$_POST[trans_interno_id]',
      '$_POST[btn_domi_externo]',
      '$_POST[trans_externo_id]',
      '$_POST[valor_domi_externo]',
      '$_POST[valor_venta]',
      '$_POST[hora_salida]',
      '$_POST[hora_llegada]',
      '$_POST[inyectologia]',
      '$_POST[observaciones]',
      '$_POST[turno_id]'
    )";
    $response = $pdo->exec($sql);
    echo json_encode($response);
    break;



};
