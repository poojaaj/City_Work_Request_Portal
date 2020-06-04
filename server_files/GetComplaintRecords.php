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
            
            $Sql_Query = "Select Description, Latitude, Longitude from COMPLAINTS";

            if($res = mysqli_query($link, $Sql_Query)){
                // $Complaint_id = mysqli_insert_id($link);
                
                //Working
                // $row = mysqli_fetch_row($res);
                // $result .= $row[0];
                // $result .= ",";
                // $result .= $row[1];
                
                //Test
                while ($row = mysqli_fetch_row($res)) {
                    // printf ("%s (%s)\n", $row[0], $row[1]);
                    // $result .= '{';
                    $result .= $row[0];
                    $result .= ",";
                    $result .= $row[1];
                    $result .= ",";
                    $result .= $row[2];
                    $result .= ",";
                    // $result .= '},';
                }
            }
            else{
                $result = mysqli_error($link);
            }
        }
    }
}


header('Content-Type: application/json');
echo json_encode($result);