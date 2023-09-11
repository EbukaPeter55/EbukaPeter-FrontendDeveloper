<?php
$allowed_origins = [
    "http://localhost:5173",  
];
$origin = isset($_SERVER["HTTP_ORIGIN"]) ? $_SERVER["HTTP_ORIGIN"] : "";

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $origin);
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$id = isset($_GET['id']) ? $_GET['id'] : null;
$limit = isset($_GET['limit']) ? $_GET['limit'] : 10;
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$spacex_url = 'https://api.spacexdata.com/v4/capsules/query';

$query = array(
    'options' => array(
        'limit' => (int)$limit,
        'page' => (int)$page,
    )
);

if (isset($_GET['search'])) {
    $searchQuery = $_GET['search'];
    $query['query'] = json_decode($searchQuery, true); 
}

if ($id !== null) {
    $spacex_url = 'https://api.spacexdata.com/v4/capsules/' . $id;
}

$request_json = json_encode($query);
$headers = array(
    "Content-Type: application/json",
);
$ch = curl_init($spacex_url);

if ($id !== null) {
    curl_setopt($ch, CURLOPT_HTTPGET, true);
} else {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request_json);
}
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($ch);

if ($response === false) {
    $error_message = curl_error($ch);
    http_response_code(500); // Internal Server Error
    echo json_encode(array("message" => "Error fetching data from SpaceX: " . $error_message));
    exit();
}

$http_status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($http_status_code !== 200) {
    http_response_code($http_status_code);
    echo json_encode(array("message" => "Error fetching data from SpaceX. HTTP Status Code: " . $http_status_code));
    exit();
}

echo $response;

curl_close($ch);
?>
