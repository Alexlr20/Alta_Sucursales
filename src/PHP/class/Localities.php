<?php
class Locality
{
    private $conn;
    private $localityTable = 'colonia';
    public $id;
    public $name;
    public $postal_code;
    public $state_name;
    public $byCityId;
    public $city_id;

    public $filter;
    public $visible;
    public $state_id;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    function viewRelations(){
        $stmt = $this->conn->prepare("SELECT ubicacion_suc.id AS colonia_ubic_suc FROM colonia
        LEFT JOIN ubicacion_suc ON ubicacion_suc.id_colonia = colonia.id WHERE colonia.id = ?;");

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bind_param("i", $this->id);

        $stmt->execute();			
        $result = $stmt->get_result();		
        return $result;
    }

    function read(){
        // if ($this->id) {
        //     // $stmt = $this->conn->prepare("SELECT * FROM ".$this->localityTable." WHERE id = ?");
        //     // $stmt = $this->conn->prepare("SELECT * FROM ".$this->localityTable." WHERE NOT visible = 0 AND id = ?");
        //     // $stmt = $this->conn->prepare("SELECT colonia.id, colonia.nombre, colonia.codigo_postal, estado.nombre_edo, ciudad.nombre_ciud FROM colonia INNER JOIN ciudad ON colonia.id_ciud = ciudad.id INNER JOIN estado ON colonia.id_edo = estado.id WHERE estado.visible=1 AND ciudad.visible=1 AND colonia.visible=1 AND colonia.id = ?;");
        //     // $stmt = $this->conn->prepare("SELECT colonia.id, colonia.nombre, colonia.codigo_postal, estado.nombre_edo, ciudad.nombre_ciud FROM colonia INNER JOIN ciudad ON colonia.id_ciud = ciudad.id INNER JOIN estado ON colonia.id_edo = estado.id WHERE estado.visible=1 AND ciudad.visible=1 AND colonia.visible=1 AND colonia.id = ?;");
        //     $stmt = $this->conn->prepare("SELECT colonia.id, colonia.nombre, colonia.codigo_postal, colonia.id_edo, colonia.id_ciud FROM colonia INNER JOIN ciudad ON colonia.id_ciud = ciudad.id INNER JOIN estado ON colonia.id_edo = estado.id WHERE estado.visible=1 AND ciudad.visible=1 AND colonia.visible=1 AND colonia.id=?;");
        //     $stmt->bind_param("i", $this->id);
        // } else {
        //     // $stmt = $this->conn->prepare("SELECT * FROM ".$this->localityTable);		
        //     // $stmt = $this->conn->prepare("SELECT * FROM ".$this->localityTable." WHERE NOT visible = 0");		
        //     // $stmt = $this->conn->prepare("SELECT * FROM ".$this->localityTable." WHERE NOT visible = 0");	
        //     // $stmt = $this->conn->prepare("SELECT colonia.id, colonia.nombre, colonia.codigo_postal, colonia.id_edo, colonia.id_ciud FROM colonia INNER JOIN ciudad ON colonia.id_ciud = ciudad.id INNER JOIN estado ON colonia.id_edo = estado.id WHERE estado.visible=1 AND ciudad.visible=1 AND colonia.visible=1;");	
        //     $stmt = $this->conn->prepare("SELECT colonia.id, colonia.nombre, colonia.codigo_postal, estado.nombre_edo, ciudad.nombre_ciud FROM colonia INNER JOIN ciudad ON colonia.id_ciud = ciudad.id INNER JOIN estado ON colonia.id_edo = estado.id WHERE estado.visible=1 AND ciudad.visible=1 AND colonia.visible=1;");
        //     /*
        //         SELECT ciudad.id as id_ciudad, ciudad.nombre_ciud as nombre_ciudad from estado INNER JOIN ciudad on estado.id = ciudad.id_edo WHERE ciudad.visible=1 AND ciudad.id_edo= ?
                

        //         SELECT * FROM student INNER JOIN course ON student.course_id = course.course_id INNER JOIN lecturer ON student.lecturer_id = lecturer.lecturer_id;
        //         SELECT * FROM locality INNER JOIN ciudad ON locality.id_ciud = ciudad.id INNER JOIN estado ON locality.id_edo = estado.id
        //         */
        // }

        switch ($this) {
            case !empty($this->filter):
                $statement = "SELECT
                    colonia.id, colonia.nombre, colonia.codigo_postal,
                    estado.nombre_edo,
                    ciudad.nombre_ciud
                FROM colonia
                INNER JOIN ciudad ON colonia.id_ciud = ciudad.id
                INNER JOIN estado ON colonia.id_edo = estado.id
                WHERE ";

                if($this->state_id){
                    $statement .= 'estado.id = '.$this->state_id;
                }

                if($this->city_id){
                    if($this->state_id) $statement .= ' AND ';
                    $statement .= 'ciudad.id = '.$this->state_id;
                }

                if($this->visible){
                    if($this->state_id || $this->city_id) $statement .= ' AND ';
                    $statement .= 'colonia.visible='.$this->visible;
                }

                // echo 'QUERY ->> '.$statement;
                $stmt = $this->conn->prepare($statement);

                break;


            case $this->id && $this->byCityId:
                $stmt = $this->conn->prepare("SELECT colonia.id, colonia.nombre, colonia.codigo_postal, colonia.id_edo, colonia.id_ciud FROM colonia INNER JOIN ciudad ON colonia.id_ciud = ciudad.id INNER JOIN estado ON colonia.id_edo = estado.id WHERE estado.visible=1 AND ciudad.visible=1 AND colonia.visible=1 AND ciudad.id=?;");
                $stmt->bind_param("i", $this->id);
                break;
            case $this->id:
                $stmt = $this->conn->prepare("SELECT colonia.id, colonia.nombre, colonia.codigo_postal, colonia.id_edo, colonia.id_ciud FROM colonia INNER JOIN ciudad ON colonia.id_ciud = ciudad.id INNER JOIN estado ON colonia.id_edo = estado.id WHERE estado.visible=1 AND ciudad.visible=1 AND colonia.visible=1 AND colonia.id=?;");
                $stmt->bind_param("i", $this->id);
                break;
            default:
                $stmt = $this->conn->prepare("SELECT colonia.id, colonia.nombre, colonia.codigo_postal, estado.nombre_edo, ciudad.nombre_ciud FROM colonia INNER JOIN ciudad ON colonia.id_ciud = ciudad.id INNER JOIN estado ON colonia.id_edo = estado.id WHERE estado.visible=1 AND ciudad.visible=1 AND colonia.visible=1;");
                break;
        }

        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }

    function create(){
        $stmt = $this->conn->prepare("INSERT INTO " . $this->localityTable . " (`nombre`, `codigo_postal`, `id_edo`, `id_ciud`) VALUES(?,?,?,?)");

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->postal_code = htmlspecialchars(strip_tags($this->postal_code));
        $this->city_id = htmlspecialchars(strip_tags($this->city_id));
        $this->state_id = htmlspecialchars(strip_tags($this->state_id));

        $stmt->bind_param("ssii", $this->name, $this->postal_code, $this->state_id, $this->city_id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function update(){
        // $stmt = $this->conn->prepare("UPDATE ".$this->localityTable." SET nombre= ?, codigo_postal= ? WHERE id= ?");
        $stmt = $this->conn->prepare("UPDATE " . $this->localityTable . " SET nombre= ?, codigo_postal= ? WHERE NOT visible = 0 AND id= ?");


        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->postal_code = htmlspecialchars(strip_tags($this->postal_code));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bind_param("ssi", $this->name, $this->postal_code, $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function delete()
    {
        // $stmt = $this->conn->prepare("DELETE FROM ".$this->localityTable." WHERE id= ?");
        $stmt = $this->conn->prepare("UPDATE " . $this->localityTable . " SET visible= 0 WHERE id= ?");

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bind_param("i", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
