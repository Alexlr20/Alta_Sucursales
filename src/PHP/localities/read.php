<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF=8");

include_once '../config/Database.php';
include_once '../class/Localities.php';

$database = new Database();
$db = $database->getConnection();

$locality = new Locality($db);

$locality->id = (isset($_GET['id']) && $_GET['id']) ? $_GET['id'] : NULL;

$locality->byCityId = (isset($_GET['byCityId']) && $_GET['byCityId']) ? $_GET['byCityId'] : NULL;

$result = $locality->read();

$baseFilter = mysqli_num_rows($result) >= 0;

switch ($locality) {
    case $baseFilter && $locality->id && $locality->byCityId:
        $localityRecords = array();
        $localityRecords["colonia"] = array();
        while ($item = $result->fetch_assoc()) {
            extract($item);
            $itemDetails = array(
                "id" => $id,
                "nombre" => $nombre,
                "codigo_postal" => $codigo_postal,
                "id_edo" => $id_edo,
                "id_ciud" => $id_ciud
            );
            array_push($localityRecords["colonia"], $itemDetails);
        }

        http_response_code(200);
        echo json_encode($localityRecords);
        break;
    case $baseFilter && $locality->id:
        $localityRecords = array();
        $localityRecords["colonia"] = array();
        while ($item = $result->fetch_assoc()) {
            extract($item);
            $itemDetails = array(
                "id" => $id,
                "nombre" => $nombre,
                "codigo_postal" => $codigo_postal,
                "id_edo" => $id_edo,
                "id_ciud" => $id_ciud
            );
            array_push($localityRecords["colonia"], $itemDetails);
        }

        http_response_code(200);
        echo json_encode($localityRecords);
        break;
    case $baseFilter:
        $localityRecords = array();
        $localityRecords["colonia"] = array();
        while ($item = $result->fetch_assoc()) {
            extract($item);
            $itemDetails = array(
                "id" => $id,
                "nombre" => $nombre,
                "codigo_postal" => $codigo_postal,
                "nombre_edo" => $nombre_edo,
                "nombre_ciud" => $nombre_ciud
            );
            array_push($localityRecords["colonia"], $itemDetails);
        }

        http_response_code(200);
        echo json_encode($localityRecords);
        break;
    default:
        http_response_code(404);
        echo json_encode(
            array("message" => "No item found.")
        );
}

// if ($baseFilter && $locality->id) {
//     $localityRecords = array();
//     $localityRecords["colonia"] = array();
//     while ($item = $result->fetch_assoc()) {
//         extract($item);
//         $itemDetails = array(
//             "id" => $id,
//             "nombre" => $nombre,
//             "codigo_postal" => $codigo_postal,
//             "id_edo" => $id_edo,
//             "id_ciud" => $id_ciud
//         );
//         array_push($localityRecords["colonia"], $itemDetails);
//     }

//     http_response_code(200);
//     echo json_encode($localityRecords);
// } else if (mysqli_num_rows($result) >= 0) {
//     $localityRecords = array();
//     $localityRecords["colonia"] = array();
//     while ($item = $result->fetch_assoc()) {
//         extract($item);
//         $itemDetails = array(
//             "id" => $id,
//             "nombre" => $nombre,
//             "codigo_postal" => $codigo_postal,
//             "nombre_edo" => $nombre_edo,
//             "nombre_ciud" => $nombre_ciud
//         );
//         array_push($localityRecords["colonia"], $itemDetails);
//     }

//     http_response_code(200);
//     echo json_encode($localityRecords);
// } else {
//     http_response_code(404);
//     echo json_encode(
//         array("message" => "No item found.")
//     );
// }
