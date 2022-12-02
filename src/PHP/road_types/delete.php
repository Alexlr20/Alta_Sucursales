<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: PATCH");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
        return 0;    
     }  

    include_once '../config/Database.php';
    include_once '../class/RoadTypes.php';

    $database = new Database();
    $db = $database->getConnection();

    $roadType = new RoadType($db);

    $data = json_decode(file_get_contents('php://input'));

    if(!empty($data->id)){
        $roadType->id = $data->id;
        if($roadType->delete()){
            http_response_code(200);
            echo json_encode(array("message" => "Road type is now deleted :D"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to delete road type"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to delete road type. Data is incomplete"));
    }