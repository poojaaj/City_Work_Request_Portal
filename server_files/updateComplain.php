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
    if (!isset($obj['complainID']) || empty($obj['complainID']))
        $result .= "complainID cannot be empty<br>";
    if (!isset($obj['status']) || empty($obj['status']))
        $result .= "status cannot be empty<br>";
    
    if(empty($result)){
        
        $complaintID = $obj['complainID'];
        $status = $obj['status'];

        
        $Sql_Query = "UPDATE COMPLAINTS SET Status = '$status' WHERE Complaint_id = '$complaintID'";
            if(mysqli_query($con, $Sql_Query)){
                $result="Complaint updated";
            }
            else{
                $result = mysqli_error($con);
            }
        
    }
}
mysqli_close($con);
echo json_encode($result);