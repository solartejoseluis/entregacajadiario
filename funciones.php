<?php 


function conectarBD(){
 $conn = @mysqli_connect("localhost", "kironee", "123456","CONTROLCAJA");
   if (!$conn){
     echo "Fallo al conectar la bd";
       }else{
         echo "Conectado a la base de datos";
       };
     return $conn;
   };


// function conectarBD(){
// $conn = new mysqli("localhost", "kiron", "123456", "CONTROLCAJA");
// if ($conn->connect_errno) {
//    die("error de conexión: " . $conn->connect_error);
// }else{
// echo "conectado a la base da datos";
// }
// return $conn;
// };



//$sql = "UPDATE tabla SET columna = 'Valor' WHERE id = 1";

// function ejecutarSQL($sql){
// $resultado->query($sql);
// return $resultado;
// }


function ejecutar_sql($conn,$sql){
	$resultado = mysqli_query($conn,$sql);
	if (!$resultado){
		echo "Error al ejecutar consulta";
		}else{
			echo "consulta realizada";
		};
	return $resultado;
};



// function ejecutar_sql($sql){
// $resultado = mysql_query($sql);
// if (! $resultado ) {die('ERROR AL EJECUTAR LA CONSULTA: '.mysql_error());}
// return $resultado;}



?>