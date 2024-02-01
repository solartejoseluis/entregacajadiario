<?php
//creado el  2022-12-22
// definición de variables
$dsn="mysql:host=localhost;port=3306;dbname=CONTROLCAJA02";
$username="kiron";
$password="123456";
$options= array(
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8mb4'",
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC 
); 
//bloque trycatch
try {
    //definir la conexion
    $pdo = new PDO($dsn,$username,$password,$options);
    //asignar el modo de error PDO a la excepcion    
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connected Succesfully";
} catch (PDOException $e) {
    //mensaje de fallo
    echo "Connection failed: ". $e->getMessage();
    die();
}

?>