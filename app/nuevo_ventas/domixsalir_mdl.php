<?php
session_start();
header('Content-Type: application/json');
require "../00_connect/pdo.php";

switch ($_GET['accion']) {

    case 'modificar_domicilio':
    $sql = "UPDATE DOMICILIOS SET
      barrio_id= '$_POST[barrio_id]',
      numero_factura= '$_POST[numero_factura]',
      trans_interno_id= '$_POST[trans_interno_id]',
      trans_externo_id= '$_POST[trans_externo_id]',
      valor_domi_externo= '$_POST[valor_domi_externo]',
      valor_venta= '$_POST[valor_venta]',
      hora_salida= '$_POST[hora_salida]',
      inyectologia= '$_POST[inyectologia]',
      observaciones= '$_POST[observaciones]'
      WHERE domicilio_id=$_GET[domicilio_id]
    ";
        $response = $pdo->exec($sql);
        echo json_encode($response);
        break;


        case 'define_hora_salida':
            $sql = "UPDATE DOMICILIOS SET
            hora_salida=DATE_FORMAT(NOW(),'%H:%i')
            WHERE domicilio_id=$_GET[domicilio_id]
            ";
                $response = $pdo->exec($sql);
                echo json_encode($response);
                break;

     case 'consultar_domi_por_salir':
        $sql = "SELECT
			DOMICILIOS.domicilio_id,
            DOMICILIOS.barrio_id,
            DOMICILIOS.trans_interno_id,
            DOMICILIOS.trans_externo_id,
            DOMICILIOS.valor_domi_externo,
            DOMICILIOS.valor_venta,
            DOMICILIOS.numero_factura,
            DOMICILIOS.hora_salida,
            DOMICILIOS.inyectologia,
            DOMICILIOS.observaciones,
            DOMICILIOS.turno_id
            FROM DOMICILIOS 
            WHERE domicilio_id=$_GET[domicilio_id]
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;


    case 'borrar_domi':
        $sql = "DELETE
        FROM DOMICILIOS 
        WHERE domicilio_id=$_GET[domicilio_id]
        ";
        $response = $pdo->exec($sql);
        echo json_encode($response);

        break;
};
