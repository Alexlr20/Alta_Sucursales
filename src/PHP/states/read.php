<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF=8");

    include_once '../config/Database.php';
    include_once '../class/States.php';
    
    $database = new Database();
    $db = $database->getConnection();

    $state = new State($db);
    $state->id = (isset($_GET['id']) && $_GET['id']) ? $_GET['id'] : '0';
    
    $state->all = (isset($_GET['all']) && $_GET['all']) ? $_GET['all'] : '0';
    
    $state->suspended = (isset($_GET['suspended']) && $_GET['suspended']) ? $_GET['suspended'] : '0';

    $result = $state->read();

    if(mysqli_num_rows($result) >= 0 && !empty($state->suspended) && (empty($state->id) && empty($state->all))){
        $stateRecords=array();
        $stateRecords["estado"]=array(); 
        while ($item = $result->fetch_assoc()) { 	
            extract($item); 
            $itemDetails=array(
                "id" => $id,
                "nombre_edo" => $nombre_edo,
                "codigo" => $codigo,
            ); 
           array_push($stateRecords["estado"], $itemDetails);
        }    
        
        http_response_code(200);     
        echo json_encode($stateRecords);
    }else if(mysqli_num_rows($result) >= 0 && !empty($state->all) && (empty($state->id) && empty($state->suspended))){
        $stateRecords=array();
        $stateRecords["estado"]=array(); 
        while ($item = $result->fetch_assoc()) { 	
            extract($item); 
            $itemDetails=array(
                "id" => $id,
                "nombre_edo" => $nombre_edo,
                "codigo" => $codigo,
            ); 
           array_push($stateRecords["estado"], $itemDetails);
        }    
        
        http_response_code(200);     
        echo json_encode($stateRecords);
    }else if(mysqli_num_rows($result) >= 0){    
        $stateRecords=array();
        $stateRecords["estado"]=array(); 
        while ($item = $result->fetch_assoc()) { 	
            extract($item); 
            $itemDetails=array(
                "id" => $id,
                "nombre_edo" => $nombre_edo,
                "codigo" => $codigo,
            ); 
           array_push($stateRecords["estado"], $itemDetails);
        }    
        
        http_response_code(200);     
        echo json_encode($stateRecords);
    } else {
        http_response_code(404);
        echo json_encode(
            array("message" => "No item found.")
        );
    }