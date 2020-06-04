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
    if (!isset($obj['password']) || empty($obj['password']))
        $result .= "Password cannot be empty<br>";
    // if (!isset($obj['role']) || empty($obj['role']))
    //     $result .= "Role cannot be empty<br>";
    if (!isset($obj['fname']) || empty($obj['fname']))
        $result .= "First Name cannot be empty<br>";
    if (!isset($obj['lname']) || empty($obj['lname']))
        $result .= "Last Name cannot be empty<br>";
    if (!isset($obj['language']) || empty($obj['language']))
        $result .= "Language cannot be empty<br>";
    if (!isset($obj['city']) || empty($obj['city']))
        $result .= "City cannot be empty<br>";
    if (!isset($obj['relationship']) || empty($obj['relationship']))
        $result .= "Relationship cannot be empty<br>";
    if (!filter_var($obj['email'], FILTER_VALIDATE_EMAIL))
        $result .= "Invalid email format";
    
    if(empty($result)){
        $email = $obj['email'];
        $password = $obj['password'];
        $f_name = $obj['fname'];
        $l_name = $obj['lname'];
        $language = $obj['language'];
        $city = $obj['city'];
        $relationship = $obj['relationship'];
        
        if(!isset($obj['role']) || empty($obj['role']))
            $role = 'user';
        else
            $role = $obj['role'];

        $CheckSQL = "SELECT * FROM users WHERE email='$email'";
        $run = mysqli_query($con, $CheckSQL);
        if(!$run){
            $result = "MySQL Error";
        }
        else{
            $check = mysqli_fetch_array($run);
        }

        if(isset($check)){
            $result = 'Email Already Exist, Please Try Again !!!';
        }
        else{
            $Sql_Query = "
INSERT INTO users (email, password, role, fname, lname, language, city, relationship) 
VALUES ('$email', '$password', '$role', '$f_name', '$l_name', '$language', '$city', '$relationship')";

            if(mysqli_query($con, $Sql_Query)){
                $result = 'User Registered Successfully' ;
                
                $subject = "Welcome to What's up City!"; 
                $header = "From: uta@cloud"; 
                $messageBody = "This is a welcome message and thanks for registering " .$f_name. "! Let's make " .$city. " city better!"; 
            
                mail($email, $subject, $messageBody, $header);  
            }
            else{
                $result = mysqli_error($con);
            }
        }
    }
}
mysqli_close($con);
echo json_encode($result);