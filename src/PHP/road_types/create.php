<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF=8");
    header("Acesss-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
        return 0;    
     }  

    include_once '../config/Database.php';
    include_once '../class/RoadTypes.php';

    $database = new Database();
    $db = $database->getConnection();

    $roadType = new RoadType($db);
    
    $data = json_decode(file_get_contents('php://input'));

    print_r($data);

    if(!empty($data->tipo)){
        $roadType->type = $data->tipo;

        if($roadType->create()){
            http_response_code(201);
            echo json_encode(array("message" => "State was uploaded :D"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create state"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create item. Data is incomplete"));
    }
