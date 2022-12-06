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
    include_once '../class/Personal.php';

    $database = new Database();
    $db = $database->getConnection();

    $person = new Personal($db);

    // $data = json_decode(file_get_contents("php://input"));
    $data = json_decode(file_get_contents('php://input'), true);

    $data = $data['newPerson'];

    print_r($data);

    echo 'NOMBRE->'.$data['nombre'];



    if(
        !empty($data['nombre']) &&
        !empty($data['ap_paterno']) &&
        !empty($data['ap_materno']) &&
        !empty($data['telefono']) &&
        !empty($data['area']) &&
        !empty($data['rfc']) &&
        !empty($data['curp']) &&
        !empty($data['sucursal']) &&

        !empty($data['nombre_vialidad']) &&
        !empty($data['numero_exterior']) &&
        !empty($data['tipo_vialidad']) &&
        !empty($data['nombre_localidad']) &&
        !empty($data['colonia']) &&
        !empty($data['municipio']) 
        // !empty($data['usuario'])
    ){
        $person->name = $data['nombre'];
        $person->paternal_surname = $data['ap_paterno'];
        $person->maternal_surname = $data['ap_materno'];
        $person->phone = $data['telefono'];
        $person->area_id = $data['area'];
        $person->rfc = $data['rfc'];
        $person->curp = $data['curp'];
        $person->location_id = $data['sucursal'];

        $person->road_name = $data['nombre_vialidad'];
        $person->int_number = !empty($data['numero_interior']) ? $data['numero_interior'] : null;
        $person->ext_number = $data['numero_exterior'];
        $person->road_type_id = $data['tipo_vialidad'];
        $person->locality_name = $data['nombre_localidad'];
        $person->locality = $data['colonia'];
        $person->city = $data['municipio'];

        if(!empty($data['usuario'])){
            $person->user = $data['usuario'];
        }

        if($person->user){
            $person->email = $data['correo'];
            $person->password = $data['contrasena'];
        }

        if($person->create()){
            http_response_code(201);
            echo json_encode(array("message" => "Person was created :D"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to registry person"));
        }

        // echo 'Person ->';
        // print_r($person);
    }else{
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create item. Data is incomplete"));
    }

    // if(!empty($data->nombre_ciud) && !empty($data->clave) && !empty($data->id_edo)){
    //     $city->name = $data->nombre_ciud;
    //     $city->code = $data->clave;
    //     $city->state = $data->id_edo;

    //     if($city->create()){
    //         http_response_code(201);
    //         echo json_encode(array("message" => "City was created :D"));
    //     } else {
    //         http_response_code(503);
    //         echo json_encode(array("message" => "Unable to create city"));
    //     }
    // } else {
    //     http_response_code(400);
    //     echo json_encode(array("message" => "Unable to create item. Data is incomplete"));
    // }

