<?php
// Conexión a la base de datos
$conn = new mysqli("localhost", "kiron", "123456", "CONTROLCAJA02");

// Verificar conexión
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

// Obtener datos del formulario
$fecha = $_POST['fecha'];
$hora = $_POST['hora'];
$temperatura = $_POST['temperatura'];
$humedad = $_POST['humedad'];
$persona = $_POST['persona'];
$observaciones = $_POST['observaciones'];

// Insertar datos en la base de datos
$sql = "INSERT INTO TEMP_HUME (
th_fecha, 
th_hora, 
th_temperatura, 
th_humedad,
th_persona, 
th_observaciones)
VALUES 
('$fecha', '$hora', '$temperatura', '$humedad', '$persona', '$observaciones')";

if ($conn->query($sql) === TRUE) {
    echo "Registro exitoso";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
