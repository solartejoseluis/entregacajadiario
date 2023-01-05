<?php
session_start();

// Cargar las funciones
require("funciones.php");

//obtener variables
$turno_resposable = $_POST['npt_responsable_id'];
$turno_jornada = $_POST['npt_'];
$turno_fecha_creado = $_POST['npt_fecha'];

// conectar la base de datos
$conn=conectarBD();

// sql de agregar datos a tabla turnos
$sql = "INSERT INTO TURNOS(
  turno_fecha_creado,
  turno_jornada,
  turno_responsable,
)
VALUES(
$POST_[turno_fecha_creado],
$POST_[turno_jornada],
$POST_[turno_responsable],
)
";
$response = $pdo->exec($sql);
echo json_encode($response);
break;

//$sql = "SELECT * FROM USERS;";
//$resultado = ejecutar_sql($conn,$sql);
// $count='0';


// capturar array con resultados
while ($fila = mysqli_fetch_array($resultado)){
    $user_bd = $fila['user_user'];
    $password_bd = $fila['user_password'];
    if($user_local == $user_bd & $password_local == $password_bd){
            $user_perfil= $fila['user_perfil'];
            $count='1';
    }
};
echo '<!doctype html>
    <html lang="es">
    <meta charset="utf-8">';
// REDIRECCION DE PAGINA
if ($count=='1'){
    switch ($user_perfil){
        case '1':
        $_SESSION['user_bd'] = $user_local;
        $_SESSION['password_bd'] = $password_local;
        echo '<meta http-equiv="REFRESH"content="0;url=venta_home.php">';
        break;

        case '2':
        $_SESSION['user_bd'] = $user_local;
        $_SESSION['password_bd'] = $password_local;
        echo'<meta http-equiv="REFRESH"content="0;url=admin_home.php">';
        break;

        case '3':
        $_SESSION['user_bd'] = $user_local;
        $_SESSION['password_bd'] = $password_local;
        echo'<meta http-equiv="REFRESH"content="0;url=usua_home_03.php">';
        break;
    }
}else{echo "Usuario y/o contraseña incorrectos";}

echo '</head>
    </html>';
// CERRAR LA CONEXIÓN
mysql_close($conn);
?>