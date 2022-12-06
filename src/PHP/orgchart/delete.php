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



    
    if(!empty($data->id)){
        $orgchart->id = $data->id;
        $relations = $orgchart->viewRelations();

        if($relations){
            // $rowHasNull = false;
            $colA = false;
            $colB = false;
            while ($row = $relations->fetch_assoc()) {
                extract($row);
                echo 'Fila -> ';
                print_r($row);
                $colA = is_null($area_suc) == 1;
                $colB = is_null($area_empleado) == 1;
            }

            if(
                mysqli_num_rows($relations) > 0 && (
                    ($colA == 1 && $colB != 1) ||
                    ($colA != 1 && $colB == 1) ||
                    ($colA != 1 && $colB != 1)
                )
            ){
                echo 'Si hay relacion';
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete area"));
            } else {
                echo 'No hay relaciones :D';
                if($orgchart->delete()){
                    http_response_code(200);
                    echo json_encode(array("message" => "Area is hidden now :D"));
                } else {
                    http_response_code(503);
                    echo json_encode(array("message" => "Unable to delete area"));
                }
            }
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to delete area. Data is incomplete"));
    }


    // print_r($data);
    // print_r($data);

    // if(!empty($data->id)){
    //     echo $data->id;
    //     $city->id = $data->id;
    //     if($city->delete()){
    //         http_response_code(200);
    //         echo json_encode(array("message" => "City was deleted :D"));
    //     } else {
    //         http_response_code(503);
    //         echo json_encode(array("message" => "Unable to delete city"));
    //     }
    // } else {
    //     http_response_code(400);
    //     echo json_encode(array("message" => "Unable to delete city. Data is incomplete"));
    // }