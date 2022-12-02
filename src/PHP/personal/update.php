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
    include_once '../class/Cities.php';

    $database = new Database();
    $db = $database->getConnection();

    $city = new City($db);

    $data = json_decode(file_get_contents('php://input'));

    print_r($data);

    // echo $data->id;
    // echo $data->nombre;
    // echo $data->clave;

    // $city->id = $data->clave;
    // echo $city->id;

    // echo "ID vacio? ".empty($data->id);
    

    if(
        !empty($data->id) &&
        !empty($data->nombre_ciud) &&
        !empty($data->clave) &&
        !empty($data->id_edo)
    ){
        $city->id = $data->id;
        $city->name = $data->nombre_ciud;
        $city->code = $data->clave;
        $city->state_id = $data->id_edo;

        if($city->update()){
            http_response_code(200);
            echo json_encode(array("message" => "City was uploaded :D"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to update city"));
        }
    }
    else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to update city. Data is incomplete."));
    }
