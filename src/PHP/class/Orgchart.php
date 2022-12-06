<?php
    class Orgchart{
        private $orgchartTable = 'areas';
        public $id;
        public $area_id;
        public $area;
        public $responds_to;
        private $conn;

        public function __construct($db){
            $this->conn = $db;
        }

        function viewRelations(){
            $stmt = $this->conn->prepare("SELECT area_x_sucursal.id AS area_suc, empleado.id AS area_empleado FROM area
            LEFT JOIN area_x_sucursal ON area_x_sucursal.id_area = area.id
            LEFT JOIN empleado ON empleado.id_area = area.id WHERE area.id = ?;");
    
            $this->id = htmlspecialchars(strip_tags($this->id));
            $stmt->bind_param("i", $this->id);
    
            $stmt->execute();			
            $result = $stmt->get_result();		
            return $result;
        }

        function read(){
            switch($this){

                case !empty($this->area_id):
                    $stmt = $this->conn->prepare("SELECT area.id, area.nombre, area.responde_a FROM area
                    INNER JOIN area_x_sucursal ON area.id = area_x_sucursal.id_area
                    WHERE area_x_sucursal.id_sucursal = ? AND area_x_sucursal.id_area=? AND area_x_sucursal.suspendida=0 AND area.suspendida=0;");

                    $stmt->bind_param("ii", $this->id, $this->area_id);
                    break;

                default:
                    $stmt = $this->conn->prepare("SELECT
                    sucursal.nombre,
                    area.id, area.nombre AS nombre_area, area.responde_a
                    FROM area_x_sucursal
                    INNER JOIN sucursal ON area_x_sucursal.id_sucursal = sucursal.id AND sucursal.id = ?
                    INNER JOIN area ON area_x_sucursal.id_area = area.id;");

                    $stmt->bind_param("i", $this->id);
                    break;
            }

            $stmt->execute();			
		    $result = $stmt->get_result();		
		    return $result;
        }

        function create(){
            switch($this){
                default:
                    $stmt = $this->conn->prepare("CALL insert_area(?, ?, ?);");
                    
                    $this->area = htmlspecialchars(strip_tags($this->area));
                    $this->responds_to = htmlspecialchars(strip_tags($this->responds_to));
                    $this->location_id = htmlspecialchars(strip_tags($this->location_id));
        
                    $stmt->bind_param("ssi",
                        $this->area, $this->responds_to, $this->location_id
                    );
                    break;
            }

            if($stmt->execute()){
                return true;
            }
            
            return false;
        }

        function update(){
            $stmt = $this->conn->prepare("
            UPDATE area SET area.nombre=?, area.responde_a=? WHERE id=?");
            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->area = htmlspecialchars(strip_tags($this->area)); 
            $this->responds_to = htmlspecialchars(strip_tags($this->responds_to));

            $stmt->bind_param("ssi", $this->area, $this->responds_to, $this->id);

            if($stmt->execute()){
                return true;
            }

            return false;
        }

        function delete(){
            $stmt = $this->conn->prepare("UPDATE area SET suspendida=1 WHERE id= ?");
    
            $this->id = htmlspecialchars(strip_tags($this->id));
            $stmt->bind_param("i", $this->id);
    
            if ($stmt->execute()) {
                return true;
            }
            return false;
        }

    }