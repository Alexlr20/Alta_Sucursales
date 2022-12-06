<?php
    class Personal{
        // public $id;

        public $curp;
        public $location_id;
        public $phone;
        public $area_id;
        public $rfc;
        public $name;
        public $paternal_surname;
        public $maternal_surname;
        
        public $road_name;
        public $int_number;
        public $ext_number;
        public $road_type_id;
        public $locality_name;
        public $locality;
        public $city;
        
        public $email;
        public $password;
        public $user;

        public $isUser;
        public $employeeToUser;

        public function __construct($db){
            $this->conn = $db;
        }

        function viewRelations(){
            $stmt = $this->conn->prepare("SELECT usuario.id_empleado AS usuario_empleado FROM empleado
            INNER JOIN usuario ON usuario.id_empleado = empleado.id WHERE empleado.id = ?;");
    
            $this->id = htmlspecialchars(strip_tags($this->id));
            $stmt->bind_param("i", $this->id);
    
            $stmt->execute();			
            $result = $stmt->get_result();		
            return $result;
        }

        function read(){

            switch($this){
                case !empty($this->id) && !empty($this->isUser):
                    $stmt = $this->conn->prepare("SELECT 
                        empleado.id AS id_empleado, empleado.nombre, empleado.ap_paterno, empleado.ap_materno, empleado.rfc, empleado.curp, empleado.id_sucursal, empleado.id_area, empleado.telefono,
                        ubicacion_empleado.nombre_vialidad, ubicacion_empleado.numero_int, ubicacion_empleado.numero_ext, ubicacion_empleado.tipo_vialidad, ubicacion_empleado.nombre_localidad, ubicacion_empleado.colonia,
                        ciudad.id_edo, ciudad.id AS id_ciudad,
                        usuario.correo, usuario.contrasena
                    FROM usuario
                    INNER JOIN empleado ON usuario.id_empleado = empleado.id
                    INNER JOIN ubicacion_empleado ON ubicacion_empleado.id = empleado.id_ubicacion
                    INNER JOIN ciudad ON ciudad.id = ubicacion_empleado.id_ciudad WHERE empleado.id = ?;");
                    $stmt->bind_param("i", $this->id);
                    break;

                case !empty($this->id):
                    $stmt = $this->conn->prepare("SELECT 
                        empleado.id AS id_empleado, empleado.nombre, empleado.ap_paterno, empleado.ap_materno, empleado.rfc, empleado.curp, empleado.id_sucursal, empleado.id_area, empleado.telefono,
                        ubicacion_empleado.nombre_vialidad, ubicacion_empleado.numero_int, ubicacion_empleado.numero_ext, ubicacion_empleado.tipo_vialidad, ubicacion_empleado.nombre_localidad, ubicacion_empleado.colonia,
                        ciudad.id_edo, ciudad.id AS id_ciudad
                    FROM empleado
                    INNER JOIN ubicacion_empleado ON ubicacion_empleado.id = empleado.id_ubicacion
                    INNER JOIN ciudad ON ciudad.id = ubicacion_empleado.id_ciudad WHERE empleado.id = ?;");
			        $stmt->bind_param("i", $this->id);
                    break;

                default:
                    $stmt = $this->conn->prepare("SELECT
                        empleado.id, empleado.nombre, empleado.ap_paterno, empleado.ap_materno, empleado.telefono,
                        area.nombre AS area,
                        usuario.id AS id_usuario
                    FROM empleado
                    INNER JOIN area ON empleado.id_area = area.id
                    LEFT JOIN usuario ON empleado.id = usuario.id_empleado
                    WHERE empleado.suspendido=0
                    ORDER BY empleado.id;");
                    break;
                }
            

            $stmt->execute();			
		    $result = $stmt->get_result();		
		    return $result;
        }

        function create(){

            switch($this){

                // 'ADSFAE1231', 1, 81123423, 2, 'AFEAFAE1241', 'Mario','Perez', 'Martinez',
                // 'Vialidad 02', '12312', 1423, 1, 'Los 02', 'Colonia 02',
                // 'olaaa@gmail.com', 'contrasena102'
                case !empty($this->user):
                    $stmt = $this->conn->prepare("CALL insert_user(
                        ?, ?, ?, ?, ?, ?, ?, ?,
                        ?, ?, ?, ?, ?, ?, ?,
                        ?, ?
                    );");
        
                    $this->name = htmlspecialchars(strip_tags($this->name));
                    $this->paternal_surname = htmlspecialchars(strip_tags($this->paternal_surname));
                    $this->maternal_surname = htmlspecialchars(strip_tags($this->maternal_surname));
                    $this->phone = htmlspecialchars(strip_tags($this->phone));
                    $this->area_id = htmlspecialchars(strip_tags($this->area_id));
                    $this->rfc = htmlspecialchars(strip_tags($this->rfc));
                    $this->curp = htmlspecialchars(strip_tags($this->curp));
                    $this->location_id = htmlspecialchars(strip_tags($this->location_id));
                    
                    $this->road_name = htmlspecialchars(strip_tags($this->road_name));
                    $this->int_number = htmlspecialchars(strip_tags($this->int_number));
                    $this->ext_number = htmlspecialchars(strip_tags($this->ext_number));
                    $this->road_type_id = htmlspecialchars(strip_tags($this->road_type_id));
                    $this->locality_name = htmlspecialchars(strip_tags($this->locality_name));
                    $this->locality = htmlspecialchars(strip_tags($this->locality));
                    $this->city = htmlspecialchars(strip_tags($this->city));
                    
                    $this->email = htmlspecialchars(strip_tags($this->email));
                    $this->password = htmlspecialchars(strip_tags($this->password));
        
        
                    // $stmt->bind_param("siiissssssiississ",
                    // $stmt->bind_param("siiissssssiississ ",
                    $stmt->bind_param("siiissssssiississ",
                        $this->curp,  $this->location_id, $this->phone, $this->area_id, $this->rfc, $this->name, $this->paternal_surname, $this->maternal_surname,
                        $this->road_name, $this->int_number, $this->ext_number, $this->road_type_id, $this->locality_name, $this->locality, $this->city,
                        $this->email, $this->password
                    );
                    break;

                default:
                    $stmt = $this->conn->prepare("CALL insert_employee(
                        ?, ?, ?, ?, ?, ?, ?, ?,
                        ?, ?, ?, ?, ?, ?, ?
                    );");
        
                    $this->name = htmlspecialchars(strip_tags($this->name));
                    $this->paternal_surname = htmlspecialchars(strip_tags($this->paternal_surname));
                    $this->maternal_surname = htmlspecialchars(strip_tags($this->maternal_surname));
                    $this->phone = htmlspecialchars(strip_tags($this->phone));
                    $this->area_id = htmlspecialchars(strip_tags($this->area_id));
                    $this->rfc = htmlspecialchars(strip_tags($this->rfc));
                    $this->curp = htmlspecialchars(strip_tags($this->curp));
                    $this->location_id = htmlspecialchars(strip_tags($this->location_id));
                    
                    $this->road_name = htmlspecialchars(strip_tags($this->road_name));
                    $this->int_number = htmlspecialchars(strip_tags($this->int_number));
                    $this->ext_number = htmlspecialchars(strip_tags($this->ext_number));
                    $this->road_type_id = htmlspecialchars(strip_tags($this->road_type_id));
                    $this->locality_name = htmlspecialchars(strip_tags($this->locality_name));
                    $this->locality = htmlspecialchars(strip_tags($this->locality));
                    $this->city = htmlspecialchars(strip_tags($this->city));

                    // $stmt->bind_param("siiissssssiissi",
                    $stmt->bind_param("siiissssssiissi",
                        $this->curp,  $this->location_id, $this->phone, $this->area_id, $this->rfc, $this->name, $this->paternal_surname, $this->maternal_surname,
                        $this->road_name, $this->int_number, $this->ext_number, $this->road_type_id, $this->locality_name, $this->locality, $this->city
                    );

                    break;
            }

            if($stmt->execute()){
                return true;
            }
            return false;
        }

        function update(){

            switch($this){
                case !empty($this->employeeToUser) && !empty($this->id):
                    $stmt = $this->conn->prepare("CALL update_employee_to_user(
                        ?, ?, ?, ?, ?, ?, ?, ?,
                        ?,  ?, ?, ?, ?, ?, ?,
                        ?, ?, ?)");

                    $this->name = htmlspecialchars(strip_tags($this->name));
                    $this->paternal_surname = htmlspecialchars(strip_tags($this->paternal_surname));
                    $this->maternal_surname = htmlspecialchars(strip_tags($this->maternal_surname));
                    $this->phone = htmlspecialchars(strip_tags($this->phone));
                    $this->area_id = htmlspecialchars(strip_tags($this->area_id));
                    $this->rfc = htmlspecialchars(strip_tags($this->rfc));
                    $this->curp = htmlspecialchars(strip_tags($this->curp));
                    $this->location_id = htmlspecialchars(strip_tags($this->location_id));
                    
                    $this->road_name = htmlspecialchars(strip_tags($this->road_name));
                    $this->int_number = htmlspecialchars(strip_tags($this->int_number));
                    $this->ext_number = htmlspecialchars(strip_tags($this->ext_number));
                    $this->road_type_id = htmlspecialchars(strip_tags($this->road_type_id));
                    $this->locality_name = htmlspecialchars(strip_tags($this->locality_name));
                    $this->locality = htmlspecialchars(strip_tags($this->locality));
                    $this->city = htmlspecialchars(strip_tags($this->city));
                    
                    $this->email = htmlspecialchars(strip_tags($this->email));
                    $this->password = htmlspecialchars(strip_tags($this->password));

                    $this->id = htmlspecialchars(strip_tags($this->id));
                    

                    $stmt->bind_param("siiissssssiississi",
                    $this->curp,  $this->location_id, $this->phone, $this->area_id, $this->rfc, $this->name, $this->paternal_surname, $this->maternal_surname,
                    $this->road_name, $this->int_number, $this->ext_number, $this->road_type_id, $this->locality_name, $this->locality, $this->city,
                    $this->email, $this->password, $this->id);

                    break;

                case !empty($this->isUser) && !empty($this->id):
                    $stmt = $this->conn->prepare("CALL update_user(
                        ?, ?, ?, ?, ?, ?, ?, ?,
                        ?,  ?, ?, ?, ?, ?, ?,
                        ?, ?, ?)");

                    $this->name = htmlspecialchars(strip_tags($this->name));
                    $this->paternal_surname = htmlspecialchars(strip_tags($this->paternal_surname));
                    $this->maternal_surname = htmlspecialchars(strip_tags($this->maternal_surname));
                    $this->phone = htmlspecialchars(strip_tags($this->phone));
                    $this->area_id = htmlspecialchars(strip_tags($this->area_id));
                    $this->rfc = htmlspecialchars(strip_tags($this->rfc));
                    $this->curp = htmlspecialchars(strip_tags($this->curp));
                    $this->location_id = htmlspecialchars(strip_tags($this->location_id));
                    
                    $this->road_name = htmlspecialchars(strip_tags($this->road_name));
                    $this->int_number = htmlspecialchars(strip_tags($this->int_number));
                    $this->ext_number = htmlspecialchars(strip_tags($this->ext_number));
                    $this->road_type_id = htmlspecialchars(strip_tags($this->road_type_id));
                    $this->locality_name = htmlspecialchars(strip_tags($this->locality_name));
                    $this->locality = htmlspecialchars(strip_tags($this->locality));
                    $this->city = htmlspecialchars(strip_tags($this->city));
                    
                    $this->email = htmlspecialchars(strip_tags($this->email));
                    $this->password = htmlspecialchars(strip_tags($this->password));

                    $this->id = htmlspecialchars(strip_tags($this->id));
                    

                    $stmt->bind_param("siiissssssiississi",
                    $this->curp,  $this->location_id, $this->phone, $this->area_id, $this->rfc, $this->name, $this->paternal_surname, $this->maternal_surname,
                    $this->road_name, $this->int_number, $this->ext_number, $this->road_type_id, $this->locality_name, $this->locality, $this->city,
                    $this->email, $this->password, $this->id);

                    break;

                case !empty($this->id):
                    $stmt = $this->conn->prepare("CALL update_employee(
                        ?, ?, ?, ?, ?, ?, ?, ?,
                        ?,  ?, ?, ?, ?, ?, ?,
                        ?);");

                    $this->name = htmlspecialchars(strip_tags($this->name));
                    $this->paternal_surname = htmlspecialchars(strip_tags($this->paternal_surname));
                    $this->maternal_surname = htmlspecialchars(strip_tags($this->maternal_surname));
                    $this->phone = htmlspecialchars(strip_tags($this->phone));
                    $this->area_id = htmlspecialchars(strip_tags($this->area_id));
                    $this->rfc = htmlspecialchars(strip_tags($this->rfc));
                    $this->curp = htmlspecialchars(strip_tags($this->curp));
                    $this->location_id = htmlspecialchars(strip_tags($this->location_id));
                    
                    $this->road_name = htmlspecialchars(strip_tags($this->road_name));
                    $this->int_number = htmlspecialchars(strip_tags($this->int_number));
                    $this->ext_number = htmlspecialchars(strip_tags($this->ext_number));
                    $this->road_type_id = htmlspecialchars(strip_tags($this->road_type_id));
                    $this->locality_name = htmlspecialchars(strip_tags($this->locality_name));
                    $this->locality = htmlspecialchars(strip_tags($this->locality));
                    $this->city = htmlspecialchars(strip_tags($this->city));

                    $this->id = htmlspecialchars(strip_tags($this->id));

                    $stmt->bind_param("siiissssssiissii",
                    $this->curp,  $this->location_id, $this->phone, $this->area_id, $this->rfc, $this->name, $this->paternal_surname, $this->maternal_surname,
                    $this->road_name, $this->int_number, $this->ext_number, $this->road_type_id, $this->locality_name, $this->locality, $this->city,
                    $this->id);

                    break;
            }


            // $stmt = $this->conn->prepare("UPDATE ".$this->cityTable." SET nombre= ?, clave= ? WHERE id= ?");
            // $stmt = $this->conn->prepare("UPDATE ".$this->cityTable." SET nombre_ciud= ?, clave= ?, id_edo=? WHERE NOT visible = 0 AND id= ?");

            // $this->name = htmlspecialchars(strip_tags($this->name));
            // $this->code = htmlspecialchars(strip_tags($this->code));
            // $this->state_id = htmlspecialchars(strip_tags($this->state_id));
            // $this->id = htmlspecialchars(strip_tags($this->id));


            // $stmt->bind_param("ssii", $this->name, $this->code, $this->state_id, $this->id);
            
            if($stmt->execute()){
                return true;
            }
            return false;
        }

        function delete(){
            // $stmt = $this->conn->prepare("DELETE FROM ".$this->cityTable." WHERE id= ?");
            $stmt = $this->conn->prepare("UPDATE empleado SET suspendido=1 WHERE id= ?");

            $this->id = htmlspecialchars(strip_tags($this->id));
            $stmt->bind_param("i", $this->id);

            if($stmt->execute()){
                return true;
            }
            return false;
        }
    }