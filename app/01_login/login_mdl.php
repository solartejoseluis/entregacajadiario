<?php
session_start();

//obtener variables
$nptUser = $_POST['npt_user'];
$nptPassword = $_POST['npt_password'];

// CONECTAR BASE DE DATOS
$conn = @mysqli_connect("localhost", "kiron", "123456","CONTROLCAJA");

if (!$conn){
  echo "Fallo al conectar la bd";
}else{
  $resultado = mysqli_query($conn,"SELECT * FROM USERS");
  if(!$resultado){
    echo "Error al ejecutar consulta";
    }else{$count='0';
      }
  };
// capturar array con resultados
while ($fila = mysqli_fetch_array($resultado)){
  $userUser = $fila['user_user'];
  $userPassword = $fila['user_password'];

  if($nptUser == $userUser & $nptPassword == $userPassword){
    $userPerfil= $fila['user_perfil'];
    $userId= $fila['user_id'];

    $count='1';
  }
};
// REDIRECCION DE PAGINA
if ($count=='1'){
  switch ($userPerfil){
    case '1':
      $_SESSION['user_user'] = $userUser;
      $_SESSION['user_password'] = $userPassword;
      $_SESSION['user_id'] = $userId;
      echo '<meta http-equiv="REFRESH"content="0;url=../03_turnos/turno_opcion_view.html">';
      break;

    case '2':
      $_SESSION['user_user'] = $nptUser;
      $_SESSION['user_password'] = $nptPassword;
      $_SESSION['user_perfil'] = $userPerfil;
      echo'<meta http-equiv="REFRESH"content="0;url=../04_admin/admin_home_view.html">';
      break;

    case '3':
      $_SESSION['user_user'] = $nptUser;
      $_SESSION['user_password'] = $nptPassword;
      $_SESSION['user_perfil'] = $userPerfil;
      echo'<meta http-equiv="REFRESH"content="0;url=../06_system/turno_todos_view.html">';
      break;
  }
}else{
  echo'<meta http-equiv="REFRESH"content="0;url=login_error_view.html">';
  };

// CERRAR LA CONEXIÓN
mysqli_close($conn);
?>