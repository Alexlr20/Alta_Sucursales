<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF=8");

    include_once '../config/Database.php';
    include_once '../class/RoadTypes.php';
    
    $database = new Database();
    $db = $database->getConnection();

    $roadType = new RoadType($db);

    $roadType->id = (isset($_GET['id']) && $_GET['id']) ? $_GET['id'] : '0';
    
    $roadType->all = (isset($_GET['all']) && $_GET['all']) ? $_GET['all'] : '0';

    $roadType->suspended = (isset($_GET['suspended']) && $_GET['suspended']) ? $_GET['suspended'] : '0';

    // echo $roadType->id;

    $result = $roadType->read();

    if(mysqli_num_rows($result) >= 0 && !empty($state->suspended) && (empty($state->id) && empty($state->all))){
        $roadTypeRecords=array();
        $roadTypeRecords["tipo_vialidad"]=array(); 
        while ($item = $result->fetch_assoc()) { 	
            extract($item); 
            $itemDetails=array(
                "id" => $id,
                "tipo" => $tipo,
            ); 
           array_push($roadTypeRecords["tipo_vialidad"], $itemDetails);
        }    
        
        http_response_code(200);     
        echo json_encode($roadTypeRecords);
    } else if(mysqli_num_rows($result) >= 0 && !empty($state->all) && (empty($state->id) && empty($state->suspended))){
        $roadTypeRecords=array();
        $roadTypeRecords["tipo_vialidad"]=array(); 
        while ($item = $result->fetch_assoc()) { 	
            extract($item); 
            $itemDetails=array(
                "id" => $id,
                "tipo" => $tipo,
            ); 
           array_push($roadTypeRecords["tipo_vialidad"], $itemDetails);
        }    
        
        http_response_code(200);     
        echo json_encode($roadTypeRecords);
    } else if(mysqli_num_rows($result) >= 0){    
        $roadTypeRecords=array();
        $roadTypeRecords["tipo_vialidad"]=array(); 
        while ($item = $result->fetch_assoc()) { 	
            extract($item); 
            $itemDetails=array(
                "id" => $id,
                "tipo" => $tipo,
            ); 
           array_push($roadTypeRecords["tipo_vialidad"], $itemDetails);
        }    
        
        http_response_code(200);     
        echo json_encode($roadTypeRecords);
    } else {
        http_response_code(404);
        echo json_encode(
            array("message" => "No item found.")
        );
    }