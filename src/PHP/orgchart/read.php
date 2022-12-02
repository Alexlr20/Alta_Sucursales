<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF=8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


    include_once '../config/Database.php';
    include_once '../class/Orgchart.php';
    
    $database = new Database();
    $db = $database->getConnection();

    $orgchart = new Orgchart($db);
    
    
    $orgchart->id = (isset($_GET['id']) && $_GET['id']) ? $_GET['id'] : '0';

    $result = $orgchart->read();

    $baseFilter = mysqli_num_rows($result) >= 0;

    // print_r($result->fetch_assoc());

    switch($orgchart){
            case $baseFilter && $orgchart->id:
            $orgchartRecords=array();
            $orgchartRecords["organigrama"]=array(); 
    
            while ($item = $result->fetch_assoc()) { 	
                extract($item); 
                $itemDetails=array(
                    "id" => $id,
                    "nombre_area" => $nombre_area,
                    "responde_a" => $responde_a,
                ); 
               array_push($orgchartRecords["organigrama"], $itemDetails);
            }    
            
            http_response_code(200);     
            echo json_encode($orgchartRecords);
            break;

        case $baseFilter:
            break;

        default:
            http_response_code(404);
            echo json_encode(array("message" => "No item found."));
    };



    // if(mysqli_num_rows($result) >= 0 && !empty($city->id) && !empty($city->byStateId)){
    //     $cityRecords=array();
    //     $cityRecords["ciudad"]=array(); 

    //     while ($item = $result->fetch_assoc()) { 	
    //         extract($item); 
    //         $itemDetails=array(
    //             "id" => $id_ciudad,
    //             "nombre_ciud" => $nombre_ciudad,
    // //             "clave" => $clave,
    // //             "id_edo" => $id_edo,
    // //             "nombre_edo" => $nombre_edo
    //         ); 
    //        array_push($cityRecords["ciudad"], $itemDetails);
    //     }    
        
    //     http_response_code(200);     
    //     echo json_encode($cityRecords);
    // } else if(mysqli_num_rows($result) >= 0 && !empty($city->id)){    
    //     $cityRecords=array();
    //     $cityRecords["ciudad"]=array(); 

    //     while ($item = $result->fetch_assoc()) { 	
    //         extract($item); 
    //         $itemDetails=array(
    //             // "id" => $id_ciudad,
    //             "nombre_ciud" => $nombre_ciud,
    //             "clave" => $clave,
    //             "id_edo" => $id_edo,
    // //             "nombre_edo" => $nombre_edo
    //         ); 
    //        array_push($cityRecords["ciudad"], $itemDetails);
    //     }    
        
    //     http_response_code(200);     
    //     echo json_encode($cityRecords);
    // } else if (mysqli_num_rows($result) >= 0) {
    //     $cityRecords=array();
    //     $cityRecords["ciudad"]=array(); 

    //     while ($item = $result->fetch_assoc()) { 	
    //         extract($item); 
    //         $itemDetails=array(
    //             "id" => $id,
    //             "nombre" => $nombre_ciud,
    //             "clave" => $clave,
    //             "id_edo" => $id_edo,
    //             "nombre_edo" => $nombre_edo
    //         ); 
    //        array_push($cityRecords["ciudad"], $itemDetails);
    //     }    
        
    //     http_response_code(200);     
    //     echo json_encode($cityRecords);
    // } else {
    //     http_response_code(404);
    //     echo json_encode(
    //         array("message" => "No item found.")
    //     );
    // }