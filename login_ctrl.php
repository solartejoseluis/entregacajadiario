<?php
session_start();

// Cargar las funciones
//require("funciones.php");

//obtener variables
$user_local = $_POST['npt_user'];
$password_local = $_POST['npt_password'];
$_SESSION['nombre_sesion']=$user_local;

//$conn=conectarBD();

// CONECTAR BASE DE DATOS
 $conn = @mysqli_connect("localhost", "kiron", "123456","CONTROLCAJA");
   if (!$conn){
     echo "Fallo al conectar la bd";
       }else{
$resultado = mysqli_query($conn,"SELECT * FROM USERS");
  if (!$resultado){echo "Error al ejecutar consulta";}
  else{
    //echo "consulta realizada";
  };
    //$resultado = ejecutar_sql($conn,$sql);
    $count='0';

// capturar array con resultados
while ($fila = mysqli_fetch_array($resultado)){
    $user_bd = $fila['user_user'];
    $password_bd = $fila['user_password'];

    if($user_local == $user_bd & $password_local == $password_bd){
            $user_perfil= $fila['user_perfil'];
            $count='1';
    }
  };

echo '<!DOCTYPE html>
    <html lang="es">
    <meta charset="utf-8">';
// REDIRECCION DE PAGINA
if ($count=='1'){
    switch ($user_perfil){
        case '1':
        $_SESSION['user_bd'] = $user_local;
        $_SESSION['password_bd'] = $password_local;
        echo '<meta http-equiv="REFRESH"content="0;url=turno_view.html">';
        break;

        case '2':
        $_SESSION['user_bd'] = $user_local;
        $_SESSION['password_bd'] = $password_local;
        echo'<meta http-equiv="REFRESH"content="0;url=admin_home.html">';
        break;

        case '3':
        $_SESSION['user_bd'] = $user_local;
        $_SESSION['password_bd'] = $password_local;
        echo'<meta http-equiv="REFRESH"content="0;url=usua_home_03.html">';
        break;
    }
}else{echo "Usuario y/o contraseña incorrectos";}

echo '</head>
    </html>';
       };

//$sql = "SELECT * FROM USERS;";



// CERRAR LA CONEXIÓN
mysql_close($conn);
?>