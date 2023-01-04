<?php 

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