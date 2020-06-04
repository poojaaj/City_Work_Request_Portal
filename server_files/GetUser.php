<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'DBConfig.php';

$result = '';

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
$json = file_get_contents('php://input');
$obj = json_decode($json,true);

if(empty($obj)){
    $result = "No POST parameters present";
}
else{

    if(!isset($obj['email']) || empty($obj['email']))
        $result .= "Email cannot be empty<br>";
    
    if(empty($result)){
        $email = $obj['email'];
    
    if ($resultQuery = mysqli_query($con, "SELECT * FROM users WHERE email='$email'")) {
        $result= mysqli_fetch_array($resultQuery);

    }
}}
mysqli_close($con);

echo json_encode($result);
?>