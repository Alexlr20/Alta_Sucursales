<?php
class Location
{
    public $id;

    public $location_name;
    public $road_name;
    public $int_number;
    public $ext_number;
    public $road_type_id;
    public $locality_name;
    public $locality_id;
    public $postal_code;
    public $days;



    public function __construct($db)
    {
        $this->conn = $db;
    }

    function read()
    {

        switch ($this) {
            case $this->id:
                // $stmt = $this->conn->prepare("SELECT ciudad.id, ciudad.nombre_ciud AS nombre, ciudad.clave, ciudad.id_edo, estado.nombre_edo FROM estado INNER JOIN ciudad ON estado.id = ciudad.id_edo");
                // $stmt = $this->conn->prepare("INSERT INTO ubicacion_suc(nombre_vialidad, numero_int, numero_ext,id_tipo_vialidad,nombre_localidad,id_colonia, codigo_postal) VALUES(?,?,?,?,?,?,?);");
                
                $stmt = $this->conn->prepare("SELECT 
                sucursal.nombre,
                tipo_vialidad.tipo,
                ubicacion_suc.nombre_vialidad, ubicacion_suc.numero_int, ubicacion_suc.numero_ext, ubicacion_suc.codigo_postal,
                colonia.nombre AS nombre_colonia,
                ciudad.nombre_ciud,
                estado.nombre_edo
                FROM sucursal
                INNER JOIN ubicacion_suc ON sucursal.ubicacion = ubicacion_suc.id AND sucursal.id = ?
                INNER JOIN tipo_vialidad ON tipo_vialidad.id = ubicacion_suc.id_tipo_vialidad
                INNER JOIN colonia ON colonia.id = ubicacion_suc.id_colonia
                INNER JOIN ciudad ON colonia.id_ciud = ciudad.id
                INNER JOIN estado ON ciudad.id_edo = estado.id;");

                $stmt->bind_param("i", $this->id);

                break;

            default:
                $stmt = $this->conn->prepare("SELECT 
                sucursal.id, sucursal.nombre,
                tipo_vialidad.tipo,
                ubicacion_suc.nombre_vialidad, ubicacion_suc.numero_int, ubicacion_suc.numero_ext, ubicacion_suc.codigo_postal,
                colonia.nombre AS nombre_colonia,
                ciudad.nombre_ciud,
                estado.nombre_edo
                FROM sucursal
                INNER JOIN ubicacion_suc ON sucursal.ubicacion = ubicacion_suc.id
                INNER JOIN tipo_vialidad ON tipo_vialidad.id = ubicacion_suc.id_tipo_vialidad
                INNER JOIN colonia ON colonia.id = ubicacion_suc.id_colonia
                INNER JOIN ciudad ON colonia.id_ciud = ciudad.id
                INNER JOIN estado ON ciudad.id_edo = estado.id;");

                break;
        }

        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }

    function create(){
        switch($this){
            default:
                $stmt = $this->conn->prepare("
                CALL insert_location(?, ?, ?, ?, ?, ?, ?, ?)
                ");
                // SET @UltimaSucursalId = LAST_INSERT_ID();
    
                $this->location_name = htmlspecialchars(strip_tags($this->location_name));
                $this->road_name = htmlspecialchars(strip_tags($this->road_name));
                $this->int_number = htmlspecialchars(strip_tags($this->int_number));
                $this->ext_number = htmlspecialchars(strip_tags($this->ext_number));
                $this->road_type_id = htmlspecialchars(strip_tags($this->road_type_id));
                $this->locality_name = htmlspecialchars(strip_tags($this->locality_name));
                $this->locality_id = htmlspecialchars(strip_tags($this->locality_id));
                $this->postal_code = htmlspecialchars(strip_tags($this->postal_code));

                // $this->location_id = 1;
    
                $stmt->bind_param("sssiisii",
                    $this->location_name,  $this->road_name, $this->int_number, $this->ext_number, $this->road_type_id,
                    $this->locality_name, $this->locality_id, $this->postal_code
                );

                foreach ($this->days as $day){
                    // $stmt2 = $this->conn->prepare("CALL insert_schedule(?, ?, ?, @UltimaSucursalId);");   
                    $stmt2 = $this->conn->prepare("CALL insert_schedule(?, ?, ?, 7);");   
                    $d = htmlspecialchars(strip_tags($day['dia']));
                    $check_in_time = htmlspecialchars(strip_tags($day['hora_inicial']));
                    $check_out_time = htmlspecialchars(strip_tags($day['hora_final'])); 
                    
                    $stmt2->bind_param("sss", $d, $check_in_time, $check_out_time);    
                    $stmt2->execute();
                }

                break;
            }
 

        if ($stmt->execute()){
            return true;
        }
        return false;
    }



    function update()
    {
        // $stmt = $this->conn->prepare("UPDATE ".$this->cityTable." SET nombre= ?, clave= ? WHERE id= ?");
        $stmt = $this->conn->prepare("UPDATE " . $this->cityTable . " SET nombre_ciud= ?, clave= ?, id_edo=? WHERE NOT visible = 0 AND id= ?");

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->code = htmlspecialchars(strip_tags($this->code));
        $this->state_id = htmlspecialchars(strip_tags($this->state_id));
        $this->id = htmlspecialchars(strip_tags($this->id));


        $stmt->bind_param("ssii", $this->name, $this->code, $this->state_id, $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function delete()
    {
        // $stmt = $this->conn->prepare("DELETE FROM ".$this->cityTable." WHERE id= ?");
        $stmt = $this->conn->prepare("UPDATE " . $this->cityTable . " SET visible= 0 WHERE id= ?");

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bind_param("i", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
