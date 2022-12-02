<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF=8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


    include_once '../config/Database.php';
    include_once '../class/Cities.php';
    
    $database = new Database();
    $db = $database->getConnection();

    $city = new City($db);
    
    
    $city->id = (isset($_GET['id']) && $_GET['id']) ? $_GET['id'] : '0';

    $city->byStateId = (isset($_GET['byStateId']) && $_GET['byStateId']) ? $_GET['byStateId'] : '0';

    $city->all = (isset($_GET['all']) && $_GET['all']) ? $_GET['all'] : '0';

    $city->suspended = (isset($_GET['suspended']) && $_GET['suspended']) ? $_GET['suspended'] : '0';
    // $data = json_decode(file_get_contents('php://input'));
    // print_r($data);
    // if(!empty($data->id)){
        //     $city->id = $data->id;
        // }
        
    $result = $city->read();

    $baseFilter = mysqli_num_rows($result) >= 0;

    // print_r($result->fetch_assoc());

    switch($city){

        // AllStates && AllStatus
        case $baseFilter && $city->all:
            $cityRecords=array();
            $cityRecords["ciudad"]=array(); 
    
            while ($item = $result->fetch_assoc()) { 	
                extract($item); 
                $itemDetails=array(
                    "id" => $id,
                    "nombre" => $nombre_ciud,
                    "clave" => $clave,
                    "id_edo" => $id_edo,
                    "nombre_edo" => $nombre_edo
                ); 
               array_push($cityRecords["ciudad"], $itemDetails);
            }    
            
            http_response_code(200);     
            echo json_encode($cityRecords);
            break;
        
        
        // AllStates y suspended
        case $baseFilter && $city->all && $city->suspended:
            $cityRecords=array();
            $cityRecords["ciudad"]=array(); 
    
            while ($item = $result->fetch_assoc()) { 	
                extract($item); 
                $itemDetails=array(
                    "id" => $id,
                    "nombre" => $nombre_ciud,
                    "clave" => $clave,
                    "id_edo" => $id_edo,
                    "nombre_edo" => $nombre_edo
                ); 
               array_push($cityRecords["ciudad"], $itemDetails);
            }    
            
            http_response_code(200);     
            echo json_encode($cityRecords);
            break;

        
            // AllStates && nonSuspended <- Else

        
            // ID, byStateId && allStatus
            case $baseFilter && $city->id && $city->all && $city->byStateId:
            $cityRecords=array();
            $cityRecords["ciudad"]=array(); 
    
            while ($item = $result->fetch_assoc()) { 	
                extract($item); 
                $itemDetails=array(
                    "id" => $id,
                    "nombre" => $nombre_ciud,
                    "clave" => $clave,
                    "id_edo" => $id_edo,
                    "nombre_edo" => $nombre_edo
                ); 
               array_push($cityRecords["ciudad"], $itemDetails);
            }    
            
            http_response_code(200);     
            echo json_encode($cityRecords);
            break;



            




        
        // ID, byStateId y Suspended
        case $baseFilter && $city->id && $city->byStateId && $city->suspended:
            $stmt = $this->conn->prepare("SELECT * FROM estado INNER JOIN ciudad ON estado.id = ciudad.id_edo WHERE estado.id = ? AND ciudad.visible=0");
            $stmt->bind_param("i", $this->id);	
            break;
        
        // ID, byStateId y nonSuspended
        case $baseFilter && $city->id && $city->byStateId:
            $cityRecords=array();
            $cityRecords["ciudad"]=array(); 
    
            while ($item = $result->fetch_assoc()) { 	
                extract($item); 
                $itemDetails=array(
                    "id" => $id_ciudad,
                    "nombre_ciud" => $nombre_ciudad,
        //             "clave" => $clave,
        //             "id_edo" => $id_edo,
        //             "nombre_edo" => $nombre_edo
                ); 
               array_push($cityRecords["ciudad"], $itemDetails);
            }    
            
            http_response_code(200);     
            echo json_encode($cityRecords);
            break;

        // ID
        case $baseFilter && $city->id:
            $cityRecords=array();
            $cityRecords["ciudad"]=array(); 
    
            while ($item = $result->fetch_assoc()) { 	
                extract($item); 
                $itemDetails=array(
                    // "id" => $id_ciudad,
                    "nombre_ciud" => $nombre_ciud,
                    "clave" => $clave,
                    "id_edo" => $id_edo,
        //             "nombre_edo" => $nombre_edo
                ); 
               array_push($cityRecords["ciudad"], $itemDetails);
            }    
            
            http_response_code(200);     
            echo json_encode($cityRecords);
            break;


        // allStates && nonSuspended
        case $baseFilter:
            $cityRecords=array();
            $cityRecords["ciudad"]=array(); 
    
            while ($item = $result->fetch_assoc()) { 	
                extract($item); 
                $itemDetails=array(
                    "id" => $id,
                    "nombre" => $nombre_ciud,
                    "clave" => $clave,
                    "id_edo" => $id_edo,
                    "nombre_edo" => $nombre_edo
                ); 
               array_push($cityRecords["ciudad"], $itemDetails);
            }    
            
            http_response_code(200);     
            echo json_encode($cityRecords);
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