<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'DBConfig.php';

$result = '';
$rows = array();
$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
$json = file_get_contents('php://input');
$obj = json_decode($json,true);

if ($result = mysqli_query($con, "SELECT count(*) as Count, Status FROM `COMPLAINTS` group by Status")) {
        while($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        
    }

mysqli_close($con);

echo json_encode($rows);
?>