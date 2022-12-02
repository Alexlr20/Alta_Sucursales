<?php
    class RoadType{
        private $roadTypeTable = 'tipo_vialidad';
        public $id;
        public $type;
        public $suspended;
        public $all;

        public function __construct($db){
            $this->conn = $db;
        }

        function read(){
            if($this->id){
                // $stmt = $this->conn->prepare("SELECT * FROM ".$this->roadTypeTable." WHERE id = ?");
                $stmt = $this->conn->prepare("SELECT * FROM ".$this->roadTypeTable." WHERE NOT visible = 0 AND id = ?");

			    $stmt->bind_param("i", $this->id);	
                
            }
            else if($this->all) {
                $stmt = $this->conn->prepare("SELECT * FROM tipo_vialidad");
            } else if($this->suspended){
                $stmt = $this->conn->prepare("SELECT id, tipo, visible AS suspendido FROM tipo_vialidad WHERE visible=0");
            } else {
    			// $stmt = $this->conn->prepare("SELECT * FROM ".$this->roadTypeTable);	
    			$stmt = $this->conn->prepare("SELECT * FROM ".$this->roadTypeTable." WHERE NOT visible = 0");		

            }

            $stmt->execute();			
		    $result = $stmt->get_result();		
		    return $result;
        }

        function create(){
            $stmt = $this->conn->prepare("INSERT INTO ".$this->roadTypeTable." (`tipo`) VALUES(?)");
            $this->type = htmlspecialchars(strip_tags($this->type));

            $stmt->bind_param("s", $this->type);

            if($stmt->execute()){
                return true;
            }
            return false;
        }

        function update(){
            // $stmt = $this->conn->prepare("UPDATE ".$this->roadTypeTable." SET tipo= ? WHERE id= ?");
            $stmt = $this->conn->prepare("UPDATE ".$this->roadTypeTable." SET tipo= ?  WHERE NOT visible = 0 AND id= ?");

            $this->type = htmlspecialchars(strip_tags($this->type));
            $this->id = htmlspecialchars(strip_tags($this->id));

            $stmt->bind_param("si", $this->type, $this->id);
            
            if($stmt->execute()){
                return true;
            }
            return false;
        }

        function delete(){
            // $stmt = $this->conn->prepare("DELETE FROM ".$this->roadTypeTable." WHERE id= ?");
            $stmt = $this->conn->prepare("UPDATE ".$this->roadTypeTable." SET visible= 0 WHERE id= ?");

            $this->id = htmlspecialchars(strip_tags($this->id));
            $stmt->bind_param("i", $this->id);

            if($stmt->execute()){
                return true;
            }
            return false;
        }
    }