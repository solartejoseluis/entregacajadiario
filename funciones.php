<?php 

//conexion bd que pide datos de entrada
// function conectar_mysql($host,$usr,$pass,$db)
// {
// 	$conn = mysql_connect($host,$usr,$pass);
// 	if(! $conn){die ('ERROR AL CONECTAR MYSQL:'.mysql_error());}
// 	$bd = mysql_select_db($db, $conn);
//  	if (! $bd ){die ('ERROR AL CONECTAR CON LA BASE DE DATOS: '.mysql_error() );}
// 	return $conn;
// }

// //CONECTAR A LA BASE DE DATOS
// function conectarBD()
// {
// 	$conn = mysql_connect('localhost','kiron','123456');
// 	if(! $conn){die ('ERROR AL CONECTAR MYSQL:'.mysql_error());}
// 	$bd = mysql_select_db('CONTROLCAJA', $conn);
// 	 if (! $bd ){die ('ERROR AL CONECTAR CON LA BASE DE DATOS: '.mysql_error() );}
// 	echo " base de datos conectada";
// 	return $conn;
// };



// function ejecutar_sql($sql){
// $resultado = mysql_query($sql);
// if (! $resultado ) {die('ERROR AL EJECUTAR LA CONSULTA: '.mysql_error());}
// return $resultado;};

//CONECTAR A LA BASE DE DATOS ACTUALIZADA


function conectarBD(){
	$conn = @mysqli_connect("localhost", "kiron", "123456","CONTROLCAJA");
		if (!$conn){
			echo "Fallo al conectar la bd";
		    }else{
		    	//echo "Conectado a la base de datos";
		    };
			return $conn;
		};


function ejecutar_sql($conn,$sql){
	$resultado = mysqli_query($conn,$sql);
	if (!$resultado){
		echo "Error al ejecutar consulta";
		}else{
			//echo "consulta realizada";
		};
	return $resultado;
};
?>