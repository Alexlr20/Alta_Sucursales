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
    include_once '../class/Locations.php';

    $database = new Database();
    $db = $database->getConnection();

    $location = new Location($db);

    // $data = json_decode(file_get_contents("php://input"));

    $data = json_decode(file_get_contents('php://input'), true);
    // echo $data->dias;
    // print_r( json_decode($data["requestData"], true) );

    $data = json_decode($data["requestData"], true);
    print_r($data);

    // echo $data->dias;

    // echo 'DIAAA->>>'.$data['dias'];

    // foreach ($data['dias'] as $day){
    //     echo 'SCHEDULE ID -> '.$day['scheduleId'];
    // }

    if(
        !empty($data['nombre_sucursal']) &&
        !empty($data['nombre_vialidad']) &&
        !empty($data['num_exterior']) &&
        !empty($data['tipo_vialidad']) &&
        !empty($data['nombre_localidad']) &&
        !empty($data['colonia']) &&
        !empty($data['codigo_postal']) &&
        !empty($data['dias'])
    ){

        $location->location_name = $data['nombre_sucursal'];
        $location->road_name = $data['nombre_vialidad'];
        $location->int_number = !empty($data['num_interior']) ? $data['num_interior'] : 'NULL';
        $location->ext_number = $data['num_exterior'];
        $location->road_type_id = $data['tipo_vialidad'];
        $location->locality_name = $data['nombre_localidad'];
        $location->locality_id = $data['colonia'];
        $location->postal_code = $data['codigo_postal'];
        $location->days = $data['dias'];

        if($location->create()){
            http_response_code(201);
            echo json_encode(array("message" => "Location was created :D"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create location"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create location. Data is incomplete"));
        // echo 'ERROR DE MYSQL -> '.$this->conn->error;
        // echo 'ERROR DE MYSQL -> '.$db;
        // print_r();
    }

