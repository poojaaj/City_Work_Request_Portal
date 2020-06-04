<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$postData = file_get_contents('php://input');

$result = '';

if(empty($postData)){
    $result = "No POST parameters present";
}
else{
    $data = json_decode($postData, TRUE);
    
    if(!$data){
        $result = "Invalid input JSON";
    }
    else{
        $db_user_name = "poojajee_whats_up_user";
        $db_password =  "whats_up_user1234";
        $host = "localhost";
        $db_name = "poojajee_Whats_up_city";
        
        $link = mysqli_connect($host, $db_user_name, $db_password, $db_name);
        
        if (!$link) {
            $result = "Unable to connect to MySQL. " . PHP_EOL . 
            "Debugging errno: " . mysqli_connect_errno() . PHP_EOL . 
            "Debugging error: " . mysqli_connect_error() . PHP_EOL;
        }
        else{
        
            $email = $data['email'];
            $password = $data['password'];
            
            $query = "SELECT * FROM users WHERE email = '" . $email . "' AND password = '" . $password . "'";
            if($run = mysqli_query($link, $query)){
                $num_row = mysqli_num_rows($run);
                if($num_row > 0){
                    $result = mysqli_fetch_array($run);
                }
                else{
                    $result = "Credentials do not match!";
                }
            }
            else{
                // $result = "Something went wrong";
            $result = mysqli_error($link);
                
            }
        }
    }
}


header('Content-Type: application/json');
echo json_encode($result);