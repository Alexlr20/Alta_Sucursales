<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF=8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


    include_once '../config/Database.php';
    include_once '../class/Locations.php';
    
    $database = new Database();
    $db = $database->getConnection();

    $location = new Location($db);
    
    
    $location->id = (isset($_GET['id']) && $_GET['id']) ? $_GET['id'] : '0';

    // $city->byStateId = (isset($_GET['byStateId']) && $_GET['byStateId']) ? $_GET['byStateId'] : '0';

    // $city->all = (isset($_GET['all']) && $_GET['all']) ? $_GET['all'] : '0';

    // $city->suspended = (isset($_GET['suspended']) && $_GET['suspended']) ? $_GET['suspended'] : '0';
    
    
    $result = $location->read();
    $baseFilter = mysqli_num_rows($result) >= 0;
    // print_r($result->fetch_assoc());

    switch($location){

        // AllStates && AllStatus
        case $baseFilter && $location->id:
            $locationRecords=array();
            $locationRecords["sucursal"]=array(); 
    
            while ($item = $result->fetch_assoc()) { 	
                extract($item); 
                $itemDetails=array(
                    "id_sucursal" => $id_sucursal,
                    "nombre" => $nombre,
                    "nombre_vialidad" => $nombre_vialidad,
                    "numero_int" => $numero_int,
                    "numero_ext" => $numero_ext,
                    "id_tipo_vialidad" => $id_tipo_vialidad,
                    "nombre_localidad" => $nombre_localidad,
                    "codigo_postal" => $codigo_postal,
                    "id_colonia" => $id_colonia,
                    "id_ciudad" => $id_ciudad,
                    "id_edo" => $id_edo
                ); 
               array_push($locationRecords["sucursal"], $itemDetails);
            }    
            
            http_response_code(200);     
            echo json_encode($locationRecords);
            break;
        
        case $baseFilter:
            $locationRecords=array();
            $locationRecords["sucursal"]=array(); 
    
            while ($item = $result->fetch_assoc()) { 	
                extract($item); 
                $itemDetails=array(
                    "id" => $id,
                    "nombre" => $nombre,
                    "tipo" => $tipo,
                    "nombre_vialidad" => $nombre_vialidad,
                    "numero_int" => $numero_int,
                    "numero_ext" => $numero_ext,
                    "codigo_postal" => $codigo_postal,
                    "nombre_colonia" => $nombre_colonia,
                    "nombre_ciud" => $nombre_ciud,
                    "nombre_edo" => $nombre_edo
                ); 
               array_push($locationRecords["sucursal"], $itemDetails);
            }    
            
            http_response_code(200);     
            echo json_encode($locationRecords);
            break;

        default:
            http_response_code(404);
            echo json_encode(array("message" => "No item found."));
    };
