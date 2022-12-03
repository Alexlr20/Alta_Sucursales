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
    include_once '../class/Orgchart.php';

    $database = new Database();
    $db = $database->getConnection();

    $orgchart = new Orgchart($db);

    $data = json_decode(file_get_contents('php://input'));

    print_r($data);

    if(
        !empty($data->id) &&
        !empty($data->area)
    ){
        $orgchart->id = $data->id;
        $orgchart->area = !empty($data->area)? $data->area : "NULL";
        $orgchart->responds_to = $data->responde_a;

        if($orgchart->update()){
            http_response_code(200);
            echo json_encode(array("message" => "Area was uploaded :D"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to update area"));
        }
    }
    else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to update city. Data is incomplete."));
    }
