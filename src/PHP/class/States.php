<?php
    class State{
        private $stateTable = 'estado';
        public $id;
        public $name;
        public $code;
        public $all;
        public $suspended;
        

        public function __construct($db){
            $this->conn = $db;
        }

        function viewRelations(){
            $stmt = $this->conn->prepare("SELECT ciudad.id_edo AS estado_ciudad, colonia.id_edo AS estado_colonia FROM estado
            LEFT JOIN  ciudad ON ciudad.id_edo = estado.id
            LEFT JOIN colonia ON colonia.id_edo = estado.id
            WHERE estado.id = ?;");

            $this->id = htmlspecialchars(strip_tags($this->id));
            $stmt->bind_param("i", $this->id);

            $stmt->execute();			
		    $result = $stmt->get_result();		
		    return $result;
        }

        function read(){
            if($this->id){
                $stmt = $this->conn->prepare("SELECT * FROM ".$this->stateTable." WHERE NOT visible = 0 AND id = ?");
                // SELECT * FROM ddsoftware.ciudad WHERE NOT visible = 0;
			    $stmt->bind_param("i", $this->id);	
            } else  if($this->all){
                $stmt = $this->conn->prepare("SELECT * FROM estado");
            } else if ($this->suspended){
                $stmt = $this->conn->prepare("SELECT id, nombre_edo, codigo, visible AS suspendido FROM estado WHERE visible=0;");
            } else {
    			$stmt = $this->conn->prepare("SELECT * FROM ".$this->stateTable." WHERE NOT visible = 0");		
            }

            $stmt->execute();			
		    $result = $stmt->get_result();		
		    return $result;
        }

        function create(){
            $stmt = $this->conn->prepare("INSERT INTO ".$this->stateTable." (`nombre_edo`, `codigo`) VALUES(?,?)");
            $this->name = htmlspecialchars(strip_tags($this->name));
            $this->code = htmlspecialchars(strip_tags($this->code));

            $stmt->bind_param("ss", $this->name, $this->code);

            if($stmt->execute()){
                return true;
            }
            return false;
        }

        function update(){
            $stmt = $this->conn->prepare("UPDATE ".$this->stateTable." SET nombre_edo= ?, codigo= ? WHERE NOT visible = 0 AND id= ?");
            $this->name = htmlspecialchars(strip_tags($this->name));
            $this->code = htmlspecialchars(strip_tags($this->code));
            $this->id = htmlspecialchars(strip_tags($this->id));

            $stmt->bind_param("ssi", $this->name, $this->code, $this->id);
            
            if($stmt->execute()){
                return true;
            }
            return false;
        }

        function delete(){
            // $stmt = $this->conn->prepare("DELETE FROM ".$this->stateTable." WHERE id= ?");
            $stmt = $this->conn->prepare("UPDATE ".$this->stateTable." SET visible= 0 WHERE id= ?");

            $this->id = htmlspecialchars(strip_tags($this->id));
            $stmt->bind_param("i", $this->id);

            if($stmt->execute()){
                return true;
            }
            return false;
        }
    }