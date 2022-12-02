<?php
    class Database{
        private $host = 'localhost';
        private $user = 'root';
        private $password = '';
        private $database = 'ddsoftware';

        public function getConnection(){
            $conn = new mysqli($this->host, $this->user, $this->password, $this->database);
            if($conn->connect_error){
                die('Error, error al conectar a MySQL: '. $conn->connect_error);
            }else{
                return $conn;
            }
        }
    }
?>