<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF=8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


    include_once '../config/Database.php';
    include_once '../class/Personal.php';
    
    $database = new Database();
    $db = $database->getConnection();

    $personal = new Personal($db);
    
    
    $personal->id = (isset($_GET['id']) && $_GET['id']) ? $_GET['id'] : '0';
        
    $result = $personal->read();

    $baseFilter = mysqli_num_rows($result) >= 0;

    // print_r($result->fetch_assoc());

    switch($personal){
        case $baseFilter:
            $personalRecords=array();
            $personalRecords["personal"]=array(); 
    
            while ($item = $result->fetch_assoc()) { 	
                extract($item); 
                $itemDetails=array(
                    "id" => $id,
                    "nombre" => $nombre,
                    "ap_paterno" => $ap_paterno,
                    "ap_materno" => $ap_materno,
                    "telefono" => $telefono,
                    "area" => $area,
                    "id_usuario" => $id_usuario
                ); 
               array_push($personalRecords["personal"], $itemDetails);
            }    
            
            http_response_code(200);     
            echo json_encode($personalRecords);
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