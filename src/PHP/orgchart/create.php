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
    include_once '../class/Orgchart.php';

    $database = new Database();
    $db = $database->getConnection();

    $orgchart = new Orgchart($db);

    // $data = json_decode(file_get_contents("php://input"));
    $data = json_decode(file_get_contents('php://input'), true);
    echo 'AHHHH';

    echo $data['nombre_area'];

    if(
        !empty($data['nombre_area'])
        && !empty($data['id_sucursal'])
    ){
        $orgchart->area = $data['nombre_area'];
        $orgchart->responds_to = $data['responde_a'];
        $orgchart->location_id = $data['id_sucursal'];

        if($orgchart->create()){
            http_response_code(201);
            echo json_encode(array("message" => "Area was created :D"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create area"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create item. Data is incomplete"));
    }
