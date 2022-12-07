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
    public $byStateId;

    public $suspended;
    public $allStatus;



    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    function viewRelations(){
        $stmt = $this->conn->prepare("SELECT horario_x_sucursal.id AS horario_sucursal, area_x_sucursal.id AS area_sucursal FROM sucursal
        LEFT JOIN horario_x_sucursal ON sucursal.id = horario_x_sucursal.id_sucursal
        LEFT JOIN area_x_sucursal ON sucursal.id = area_x_sucursal.id_sucursal WHERE sucursal.id = ?;");

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bind_param("i", $this->id);

        $stmt->execute();			
        $result = $stmt->get_result();		
        return $result;
    }


    function read()
    {

        switch ($this) {
            case !empty($this->byStateId) && !empty($this->id):
                $stmt = $this->conn->prepare("SELECT
                sucursal.id AS id_sucursal, sucursal.nombre, ubicacion_suc.nombre_vialidad, ubicacion_suc.numero_int, ubicacion_suc.numero_ext, ubicacion_suc.id_tipo_vialidad, ubicacion_suc.nombre_localidad, ubicacion_suc.codigo_postal, ubicacion_suc.id_colonia,
                ciudad.id AS id_ciudad, ciudad.id_edo
                FROM sucursal
                INNER JOIN ubicacion_suc ON ubicacion_suc.id = sucursal.ubicacion
                INNER JOIN colonia ON colonia.id = ubicacion_suc.id_colonia
                INNER JOIN ciudad ON ciudad.id = colonia.id_ciud WHERE colonia.id_edo = ?;");
                // SELECT * FROM sucursal
                // INNER JOIN ubicacion_suc ON ubicacion_suc.id = sucursal.id
                // INNER JOIN colonia ON colonia.id = ubicacion_suc.id_colonia WHERE colonia.id_edo = ?;

                $stmt->bind_param("i", $this->id);

                break;

            case !empty($this->id):
                $stmt = $this->conn->prepare("SELECT
                sucursal.id AS id_sucursal, sucursal.nombre, ubicacion_suc.nombre_vialidad, ubicacion_suc.numero_int, ubicacion_suc.numero_ext, ubicacion_suc.id_tipo_vialidad, ubicacion_suc.nombre_localidad, ubicacion_suc.codigo_postal, ubicacion_suc.id_colonia,
                ciudad.id AS id_ciudad, ciudad.id_edo
                FROM sucursal
                INNER JOIN ubicacion_suc ON ubicacion_suc.id = sucursal.ubicacion
                INNER JOIN colonia ON colonia.id = ubicacion_suc.id_colonia
                INNER JOIN ciudad ON ciudad.id = colonia.id_ciud WHERE sucursal.id = ?;");

                $stmt->bind_param("i", $this->id);

                break;

            case !empty($this->suspended):
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
                INNER JOIN estado ON ciudad.id_edo = estado.id WHERE sucursal.suspendida=1;");
                break;

            case !empty($this->allStatus):
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
                INNER JOIN estado ON ciudad.id_edo = estado.id WHERE sucursal.suspendida=0;");

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

    function delete(){
        $stmt = $this->conn->prepare("UPDATE sucursal SET suspendida=1 WHERE id= ?");

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bind_param("i", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
