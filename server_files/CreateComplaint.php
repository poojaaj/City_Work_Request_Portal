<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'DBConfig.php';

$target_dir = "uploads/complaints/";

$result = '';
$photo = '';

$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
$json = file_get_contents('php://input');
$obj = $_POST;

if(empty($obj)){
    $result .= "No COMPLAINT POST parameters present";
}
else{
    if(!isset($obj['email']) || empty($obj['email']))
        $result .= "email cannot be empty<br>";
    if(!isset($obj['issue']) || empty($obj['issue']))
        $result .= "issue cannot be empty<br>";
    if (!isset($obj['description']) || empty($obj['description']))
        $result .= "description cannot be empty<br>";
    if (!isset($obj['latitude']) || empty($obj['latitude']))
        $result .= "latitude cannot be empty<br>";
    if (!isset($obj['longitude']) || empty($obj['longitude']))
        $result .= "longitude cannot be empty<br>";
    if (!isset($obj['userRelation']) || empty($obj['userRelation']))
        $result .= "userRelation Name cannot be empty<br>";
    if (!isset($obj['isAnonymous']) || empty($obj['isAnonymous']))
        $result .= "isAnonymous Name cannot be empty<br>";
    if (!isset($obj['isReported']) || empty($obj['isReported']))
        $result .= "isReported cannot be empty<br>";
        
    if(!empty($_FILES) && empty($result)){
        $photo = $target_dir . time() . '-' . basename($_FILES["photo"]["name"]);
        if (!move_uploaded_file($_FILES["photo"]["tmp_name"], '../' . $photo)) {
            $photo = '';
            $result .= "File upload failed<br>";
        }
    }

    if(empty($result)){
        $email = $obj['email'] ?? '';
        $issueCategory = $obj['issue'] ?? '';
        $description = $obj['description'] ?? '';
        $solution = $obj['solution'] ?? '';
        $userRelation = $obj['userRelation'] ?? '';
        $isAnonymous = $obj['isAnonymous'] ?? '';
        $isReported = $obj['isReported'] ?? '';
        $reportedComment = $obj['reportedComment'] ?? '';
        
        $Latitude = $obj['latitude'] ?? '';
        $Longitude = $obj['longitude'] ?? '';
       
        $Sql_Query = "INSERT INTO COMPLAINTS (Email, Anonymity, Latitude, Longitude, Category, Description, photo, Solution, Status, Relationship, Date) 
        VALUES ('$email', '$isAnonymous',   '$Latitude', '$Longitude',  '$issueCategory', '$description','$photo', '$solution', 'New', '$userRelation', CURDATE())";

        if(mysqli_query($con, $Sql_Query)){
            $Complaint_id = mysqli_insert_id($con);
            $result .= 'Comment Registered Successfully. Your complaint id is: '.$Complaint_id ;
            
            $subject = 'Complaint '.$Complaint_id. ' registered successfully!'; 
            $header = "From: uta@cloud"; 
            $messageBody = "This is a message to confirm your complaint: ".$description; 
            
            mail($email, $subject, $messageBody, $header);  
        }
        else{
            $result .= mysqli_error($con);
        }
        
        if(strtolower($isReported) == 'yes'){
            $Sql_Comment_Query = "INSERT INTO Report (Complaint_id,Comments) VALUES ('$Complaint_id','$reportedComment')";
            
            if(!mysqli_query($con, $Sql_Comment_Query)){
                $result .= 'Comment Registered Successfully. Your complaint id is: '.$Complaint_id;
            }
        }
    }
}
mysqli_close($con);
echo json_encode($result);