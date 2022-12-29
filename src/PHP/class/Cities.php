<?php
    class City{
        private $cityTable = 'ciudad';
        public $id;
        public $name;
        public $code;
        public $state_id;

        public $all;
        public $suspended;
        public $byStateId;

        public function __construct($db){
            $this->conn = $db;
        }

        function viewRelations(){
            $stmt = $this->conn->prepare("SELECT colonia.id AS ciudad_colonia, ubicacion_empleado.id AS ciudad_ubi_emp FROM ciudad
            LEFT JOIN colonia ON colonia.id_ciud = ciudad.id
            LEFT JOIN ubicacion_empleado ON ubicacion_empleado.id_ciudad = ciudad.id WHERE ciudad.id = ?;");

            $this->id = htmlspecialchars(strip_tags($this->id));
            $stmt->bind_param("i", $this->id);

            $stmt->execute();			
		    $result = $stmt->get_result();		
		    return $result;
        }

        function read(){
            switch($this){

                case !empty($this->id) && !empty($this->all) && !empty($this->byStateId):
                    $stmt = $this->conn->prepare("SELECT * FROM estado
                    INNER JOIN ciudad ON estado.id = ciudad.id_edo WHERE ciudad.id_edo = ?;");
			        $stmt->bind_param("i", $this->id);
                    break;
                    
                case !empty($this->id) && !empty($this->suspended) && !empty($this->byStateId);    
                    $stmt = $this->conn->prepare("SELECT * FROM estado
                    INNER JOIN ciudad ON estado.id = ciudad.id_edo
                    WHERE ciudad.visible=0 AND ciudad.id_edo = ?;");

			        $stmt->bind_param("i", $this->id);
                    break;

                // ID, byStateId, nonSuspended
                case !empty($this->id) && !empty($this->byStateId):
                    $stmt = $this->conn->prepare("SELECT
                    ciudad.id as id_ciudad, ciudad.clave,
                    ciudad.nombre_ciud as nombre_ciudad,
                    ciudad.id_edo,
                    estado.nombre_edo
                FROM estado INNER JOIN ciudad on estado.id = ciudad.id_edo WHERE ciudad.visible=1 AND ciudad.id_edo= ?;");
			        $stmt->bind_param("i", $this->id);
                    break;

                // ID, nonSuspended
                case !empty($this->id):
                    $stmt = $this->conn->prepare("SELECT ciudad.id_edo, ciudad.nombre_ciud, ciudad.clave FROM estado INNER JOIN ciudad ON estado.id = ciudad.id_edo WHERE ciudad.id = ? AND NOT ciudad.visible=0");
			        $stmt->bind_param("i", $this->id);
                    break;


                case !empty($this->all):
                    $stmt = $this->conn->prepare("SELECT * FROM estado
                    INNER JOIN ciudad ON estado.id = ciudad.id_edo;");
                    break;


                case !empty($this->suspended):
                    $stmt = $this->conn->prepare("SELECT * FROM estado
                    INNER JOIN ciudad ON estado.id = ciudad.id_edo WHERE ciudad.visible=0;");
                    break;

                default:
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