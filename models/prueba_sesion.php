<?php
session_start();
$_SESSION['mes'] =3;
//header('Content-Type: application/json');
//require "pdo.php";

$variable = $_SESSION['mes'];
echo "esta es la variable de sesion: ";
echo "$variable";
var_dump($variable);
?>