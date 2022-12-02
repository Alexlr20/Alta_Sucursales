<?php
    class Orgchart{
        private $orgchartTable = 'areas';
        public $id;
        public $area;
        public $responds_to;
        private $conn;

        public function __construct($db){
            $this->conn = $db;
        }

        function read(){
            switch($this){
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
            UPDATE ".$this->orgchartTable." SET area=?, responde_a=? WHERE id=?");
            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->area = htmlspecialchars(strip_tags($this->area));
            $this->responde_a = htmlspecialchars(strip_tags($this->responde_a));

            $stmt->bind_param("ssi", $this->area, $this->responde_a, $this->id);

            if($stmt->execute()){
                return true;
            }

            return false;
        }

    }