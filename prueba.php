 <!DOCTYPE html>
<html>
<head>
<!-- CDN boostrap 5.2.2 css -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
</head>
<body>

<?php
// recolecto variable

$servername = "localhost";
$username = "kiron";
$password = "123456";
$dbname = "CONTROLCAJA";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT
        VENTAS.venta_id,
        VENTAS.venta_nombre_producto,
        VENTAS.venta_nombre_proveedor,
        VENTAS.venta_costo_producto,
        VENTAS.venta_valor_venta,
        VENTAS.venta_utilidad,
        USERS.user_nombre,
        VENTAS.turno_id
        FROM VENTAS
        INNER JOIN USERS
        ON VENTAS.user_id=USERS.user_id
        WHERE turno_id =102";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo "<table class='table table-sm'>
  <tr>
    <th>VENTA ID</th>
    <th>PRODUCTO</th>
    <th>PROVEEDOR</th>
    <th>COSTO</th>
    <th>VALOR VENTA</th>
    <th>UTILIDAD</th>
    <th>VENDEDOR</th>
    <th>TURNO ID</th>

  </tr>";
  // output data of each row
  while($row = $result->fetch_assoc()) {
  echo "
<tr>
  <td>".$row["venta_id"]."</td>
  <td>".$row["venta_nombre_producto"]."</td>
  <td>".$row["venta_nombre_proveedor"]."</td>
  <td>".$row["venta_costo_producto"]."</td>
  <td>".$row["venta_valor_venta"]."</td>
  <td>".$row["venta_utilidad"]."</td>
  <td>".$row["user_nombre"]."</td>
  <td>".$row["turno_id"]."</td>
</tr>";
}
  echo "</table>";
} else {
echo "0 results";
}
$conn->close();
?>
  <!-- CDN jquery 3.6.1 js -->
  <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
  <!-- CDN bootstrap 5.2.2 js -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
</body>
</html>