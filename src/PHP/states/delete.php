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
    include_once '../class/States.php';

    $database = new Database();
    $db = $database->getConnection();

    $state = new State($db);

    $data = json_decode(file_get_contents('php://input'));
    
    if(!empty($data->id)){
        $state->id = $data->id;
        $relations = $state->viewRelations();

        if($relations){
            // $rowHasNull = false;
            $colA = false;
            $colB = false;
            while ($row = $relations->fetch_assoc()) {
                extract($row);
                echo 'Fila ->';
                print_r($row);

                $colA = is_null($estado_ciudad) == 1;
                $colB = is_null($estado_colonia) == 1;
                
                // if(
                //     is_null($estado_ciudad) == 1 || is_null($estado_ciudad) == 1
                // ){
                //     $rowHasNull = true;
                // }
            }

            if(
                mysqli_num_rows($relations) > 0 && (
                    ($colA == 1 && $colB != 1) ||
                    ($colA != 1 && $colB == 1) ||
                    ($colA != 1 && $colB != 1)
                ) 
                // (mysqli_num_rows($relations) > 0 && $rowHasNull == false) == 1
            ){
                echo 'Si hay relacion';
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete state"));
            } else {
                echo 'No hay relaciones :D';
                if($state->delete()){
                    http_response_code(200);
                    echo json_encode(array("message" => "State is hidden now :D"));
                } else {
                    http_response_code(503);
                    echo json_encode(array("message" => "Unable to delete state"));
                }
            }
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to delete state. Data is incomplete"));
    }