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


    if(!empty($data->id)){
        $locality->id = $data->id;
        $relations = $locality->viewRelations();

        if($relations){
            // $rowHasNull = false;
            $colA = false;
            while ($row = $relations->fetch_assoc()) {
                extract($row);
                echo 'Fila -> ';
                print_r($row);

                $colA = is_null($colonia_ubic_suc) ==  1; 

                // if(is_null($colonia_ubic_suc) == 1){
                    // $colA = true;
                // }
            }

            if(mysqli_num_rows($relations) > 0 && ($colA != 1)){
                echo 'Si hay relacion';
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete locality"));
            } else {
                echo 'No hay relaciones :D';
                if($locality->delete()){
                    http_response_code(200);
                    echo json_encode(array("message" => "Locality is hidden now :D"));
                } else {
                    http_response_code(503);
                    echo json_encode(array("message" => "Unable to delete locality"));
                }
            }
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to delete locality. Data is incomplete"));
    }

    // print_r($data);

    // if(!empty($data->id)){
    //     $locality->id = $data->id;
    //     if($locality->delete()){
    //         http_response_code(200);
    //         echo json_encode(array("message" => "Locality was deleted :D"));
    //     } else {
    //         http_response_code(503);
    //         echo json_encode(array("message" => "Unable to delete locality"));
    //     }
    // } else {
    //     http_response_code(400);
    //     echo json_encode(array("message" => "Unable to delete locality. Data is incomplete"));
    // }