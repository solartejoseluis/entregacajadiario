<?php
// Conexión a la base de datos
$conn = new mysqli("localhost", "kiron", "123456", "CONTROLCAJA02");

// Verificar conexión
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

// Consultar registros
$sql = "SELECT
*
FROM TEMP_HUME";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Mostrar datos en formato de tabla HTML
    echo "<table border='1'>
    <tr>
        <th>ID</th>
        <th>Fecha</th>
        <th>Hora</th>
        <th>Temperatura (°C)</th>
        <th>Humedad (%)</th>
        <th>Persona</th>
        <th>Observaciones</th>
    </tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row['th_id'] . "</td>";
        echo "<td>" . $row['th_fecha'] . "</td>";
        echo "<td>" . $row['th_hora'] . "</td>";
        echo "<td>" . $row['th_temperatura'] . "</td>";
        echo "<td>" . $row['th_humedad'] . "</td>";
        echo "<td>" . $row['th_persona'] . "</td>";
        echo "<td>" . $row['th_observaciones'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "No se encontraron registros";
}
$conn->close();
?>
