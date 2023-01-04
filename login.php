<?php
session_start();

// Cargar las funciones
require("funciones.php");

//obtener variables
$user_local = $_POST['npt_user'];
$password_local = $_POST['npt_password'];
$_SESSION['nombre_sesion']=$user_local;

//echo $user_local;

//echo $password_local;

//echo $_SESSION['nombre_sesion'];
// Conectar base de datos

$conn=conectarBD();
// Ejecutar consulta
$sql = "SELECT * FROM USERS;";
$resultado = ejecutar_sql($conn,$sql);
$count='0';
//echo $sql;
//echo " valor de count ";
//echo $count;

// capturar array con resultados
while ($fila = mysqli_fetch_array($resultado)){
    $user_bd = $fila['user_user'];
    $password_bd = $fila['user_password'];

    if($user_local == $user_bd & $password_local == $password_bd){
            $user_perfil= $fila['user_perfil'];
            $count='1';

            //echo " perfil de usuario ".$user_perfil;
            //echo "cuenta cambiadad ". $count;
    }
};

echo '
<!doctype html>
<html lang="es">
<meta charset="utf-8">
';


//redirige a pagina de inicio segun nivel de usuario
if ($count=='1')
{
    switch ($user_perfil)
            {
                case '1':
                $_SESSION['user_bd'] = $user_local;
                $_SESSION['password_bd'] = $password_local;
                echo '
                <meta http-equiv="REFRESH"content="0;url=venta_home.html">';
                break;

                case '2':
                $_SESSION['user_bd'] = $user_local;
                $_SESSION['password_bd'] = $password_local;
                echo'
                <meta http-equiv="REFRESH"content="0;url=usua_home_02.php">';
                break;

                case '3':
                $_SESSION['user_bd'] = $user_local;
                $_SESSION['password_bd'] = $password_local;
                echo'
                <meta http-equiv="REFRESH"content="0;url=usua_home_03.php">';
                break;
            }
} else{
echo "Usuario y/o contraseña incorrectos";
};

echo '
</head>
</html>
';

// cerrar la conexión
mysql_close($conn);

?>






