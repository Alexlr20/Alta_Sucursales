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
    include_once '../class/RoadTypes.php';

    $database = new Database();
    $db = $database->getConnection();

    $roadType = new RoadType($db);

    $data = json_decode(file_get_contents('php://input'));

    if(!empty($data->id)){
        $roadType->id = $data->id;
        $relations = $roadType->viewRelations();

        if($relations){
            $colA = false;
            $colB = false;
            while ($row = $relations->fetch_assoc()) {
                extract($row);
                echo 'Fila ->';
                print_r($row);

                $colA = is_null($ubi_suc_id_tipo_vialidad) ==  1; 
                $colB = is_null($ubi_emp_tipo_vialidad) == 1;
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
                echo json_encode(array("message" => "Unable to delete road type"));
            } else {
                echo 'No hay relaciones :D';
                if($roadType->delete()){
                    http_response_code(200);
                    echo json_encode(array("message" => "Road type is hidden now :D"));
                } else {
                    http_response_code(503);
                    echo json_encode(array("message" => "Unable to delete road type"));
                }
            }
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to delete road type. Data is incomplete"));
    }

    // if(!empty($data->id)){
    //     $roadType->id = $data->id;
    //     if($roadType->delete()){
    //         http_response_code(200);
    //         echo json_encode(array("message" => "Road type is now deleted :D"));
    //     } else {
    //         http_response_code(503);
    //         echo json_encode(array("message" => "Unable to delete road type"));
    //     }
    // } else {
    //     http_response_code(400);
    //     echo json_encode(array("message" => "Unable to delete road type. Data is incomplete"));
    // }