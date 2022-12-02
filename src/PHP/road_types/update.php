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

    if(!empty($data->id) && !empty($data->tipo)){
        $roadType->id = $data->id;
        $roadType->type = $data->tipo;

        if($roadType->update()){
            http_response_code(200);
            echo json_encode(array("message" => "State was uploaded :D"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to update state"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to update state. Data is incomplete."));
    }
