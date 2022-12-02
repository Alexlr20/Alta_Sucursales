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
    include_once '../class/Localities.php';

    $database = new Database();
    $db = $database->getConnection();

    $locality = new Locality($db);

    $data = json_decode(file_get_contents('php://input'));

    // print_r($data);

    if(!empty($data->id) && !empty($data->nombre) && !empty($data->codigo_postal)){
        $locality->id = $data->id;
        $locality->name = $data->nombre;
        $locality->postal_code = $data->codigo_postal;

        if($locality->update()){
            http_response_code(200);
            echo json_encode(array("message" => "Locality was uploaded :D"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to update locality"));
        }
    }
    else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to update locality. Data is incomplete."));
    }
