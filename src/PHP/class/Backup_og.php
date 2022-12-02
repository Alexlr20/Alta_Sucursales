<?php
    class City{
        private $cityTable = 'ciudad';
        public $id;
        public $name;
        public $code;
        public $state_id;

        public $byStateId;

        public function __construct($db){
            $this->conn = $db;
        }

        function read(){
            if($this->id && $this->byStateId){
                $stmt = $this->conn->prepare("SELECT ciudad.id as id_ciudad, ciudad.nombre_ciud as nombre_ciudad from estado INNER JOIN ciudad on estado.id = ciudad.id_edo WHERE ciudad.visible=1 AND ciudad.id_edo= ?");
			    $stmt->bind_param("i", $this->id);	
                
            } else if($this->id){
                // $stmt = $this->conn->prepare("SELECT * FROM ".$this->cityTable." WHERE id = ?");
                // $stmt = $this->conn->prepare("SELECT * FROM ".$this->cityTable." WHERE NOT visible = 0 AND id = ?");

                // $stmt = $this->conn->prepare("SELECT * FROM ".$this->cityTable." INNER JOIN estado ON ciudad.id_edo = estado.id WHERE NOT ciudad.visible=0 AND estado.id = ?");

                // SELECT * FROM estado INNER JOIN ciudad ON estado.id=ciudad.id;
                // $stmt = $this->conn->prepare("SELECT ciudad.id as id_ciudad, ciudad.nombre_ciud as nombre_ciudad from estado INNER JOIN ciudad on estado.id = ciudad.id_edo WHERE ciudad.visible=1 AND ciudad.id_edo= ?");
                $stmt = $this->conn->prepare("SELECT ciudad.id_edo, ciudad.nombre_ciud, ciudad.clave FROM estado INNER JOIN ciudad ON estado.id = ciudad.id_edo WHERE ciudad.id = ? AND NOT ciudad.visible=0");

			    $stmt->bind_param("i", $this->id);	
                
            } else {
    			// $stmt = $this->conn->prepare("SELECT * FROM ".$this->cityTable);		
    			// $stmt = $this->conn->prepare("SELECT * FROM ".$this->cityTable." WHERE NOT visible = 0");		
                $stmt = $this->conn->prepare("SELECT * FROM estado INNER JOIN ".$this->cityTable." ON estado.id = ciudad.id_edo WHERE NOT ciudad.visible=0");
            }

            $stmt->execute();			
		    $result = $stmt->get_result();		
		    return $result;
        }

        function create(){
            $stmt = $this->conn->prepare("INSERT INTO ".$this->cityTable." (`nombre_ciud`, `clave`, `id_edo`) VALUES(?,?,?)");
            $this->name = htmlspecialchars(strip_tags($this->name));
            $this->code = htmlspecialchars(strip_tags($this->code));
            $this->state = htmlspecialchars(strip_tags($this->state));

            $stmt->bind_param("ssi", $this->name, $this->code, $this->state);

            if($stmt->execute()){
                return true;
            }
            return false;
        }

        function update(){
            // $stmt = $this->conn->prepare("UPDATE ".$this->cityTable." SET nombre= ?, clave= ? WHERE id= ?");
            $stmt = $this->conn->prepare("UPDATE ".$this->cityTable." SET nombre_ciud= ?, clave= ?, id_edo=? WHERE NOT visible = 0 AND id= ?");

            $this->name = htmlspecialchars(strip_tags($this->name));
            $this->code = htmlspecialchars(strip_tags($this->code));
            $this->state_id = htmlspecialchars(strip_tags($this->state_id));
            $this->id = htmlspecialchars(strip_tags($this->id));


            $stmt->bind_param("ssii", $this->name, $this->code, $this->state_id, $this->id);
            
            if($stmt->execute()){
                return true;
            }
            return false;
        }

        function delete(){
            // $stmt = $this->conn->prepare("DELETE FROM ".$this->cityTable." WHERE id= ?");
            $stmt = $this->conn->prepare("UPDATE ".$this->cityTable." SET visible= 0 WHERE id= ?");

            $this->id = htmlspecialchars(strip_tags($this->id));
            $stmt->bind_param("i", $this->id);

            if($stmt->execute()){
                return true;
            }
            return false;
        }
    }




















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
    // $data = json_decode(file_get_contents('php://input'));
    // print_r($data);
    // if(!empty($data->id)){
    //     $city->id = $data->id;
    // }

    $result = $city->read();

    // print_r($result->fetch_assoc());
    if(mysqli_num_rows($result) >= 0 && !empty($city->id) && !empty($city->byStateId)){
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
    } else if(mysqli_num_rows($result) >= 0 && !empty($city->id)){    
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
    } else if (mysqli_num_rows($result) >= 0) {
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
    } else {
        http_response_code(404);
        echo json_encode(
            array("message" => "No item found.")
        );
    }