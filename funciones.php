<?php 

//conexion bd que pide datos de entrada
function conectar_mysql($host,$usr,$pass,$db)
{ 
	$conn = mysql_connect($host,$usr,$pass); 
	if(! $conn){die ('ERROR AL CONECTAR MYSQL:'.mysql_error());} 
	$bd = mysql_select_db($db, $conn);
 	if (! $bd ){die ('ERROR AL CONECTAR CON LA BASE DE DATOS: '.mysql_error() );} 
	return $conn;
}

//conecto bd gestion_indicadores
function conectarBD()
{ 
	$conn = mysql_connect('localhost','kiron','123456');
	if(! $conn){die ('ERROR AL CONECTAR MYSQL:'.mysql_error());} 
	$bd = mysql_select_db('CONTROLCAJA', $conn);
	 if (! $bd ){die ('ERROR AL CONECTAR CON LA BASE DE DATOS: '.mysql_error() );} 
	return $conn;
}



function ejecutar_sql($sql){
$resultado = mysql_query($sql);
if (! $resultado ) {die('ERROR AL EJECUTAR LA CONSULTA: '.mysql_error());}
return $resultado;}





 ?>