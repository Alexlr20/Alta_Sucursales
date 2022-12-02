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
    include_once '../class/Cities.php';

    $database = new Database();
    $db = $database->getConnection();

    $city = new City($db);

    // $data = json_decode(file_get_contents("php://input"));
    $data = json_decode(file_get_contents('php://input'));

    print_r($data);

    if(!empty($data->nombre_ciud) && !empty($data->clave) && !empty($data->id_edo)){
        $city->name = $data->nombre_ciud;
        $city->code = $data->clave;
        $city->state = $data->id_edo;

        if($city->create()){
            http_response_code(201);
            echo json_encode(array("message" => "City was created :D"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create city"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create item. Data is incomplete"));
    }
