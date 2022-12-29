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
    $orgchart->area_id = (isset($_GET['area_id']) && $_GET['area_id']) ? $_GET['area_id'] : '0';
    $orgchart->suspended = (isset($_GET['suspended']) && $_GET['suspended']) ? $_GET['suspended'] : '0';
    $orgchart->all = (isset($_GET['all']) && $_GET['all']) ? $_GET['all'] : '0';

    $result = $orgchart->read();

    $baseFilter = mysqli_num_rows($result) >= 0;

    // print_r($result->fetch_assoc());

    switch($orgchart){
        case $baseFilter && $orgchart->id && $orgchart->area_id:
            $orgchartRecords=array();
            $orgchartRecords["organigrama"]=array(); 
    
            while ($item = $result->fetch_assoc()) { 	
                extract($item); 
                $itemDetails=array(
                    "id" => $id,
                    "nombre_area" => $nombre,
                    "responde_a" => $responde_a,
                ); 
            array_push($orgchartRecords["organigrama"], $itemDetails);
            }    
            
            http_response_code(200);     
            echo json_encode($orgchartRecords);
            break;

        case $baseFilter && $orgchart->id && $orgchart->suspended:
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

        case $baseFilter && $orgchart->id && $orgchart->all:
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

        default:
            http_response_code(404);
            echo json_encode(array("message" => "No item found."));
            break;
    };