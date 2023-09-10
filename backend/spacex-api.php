<?php
// Allow requests from your React app's origin
$allowed_origins = [
    "http://localhost:5173",  // Replace with the actual origin of your React app
    // Add other allowed origins as needed
];

$origin = isset($_SERVER["HTTP_ORIGIN"]) ? $_SERVER["HTTP_ORIGIN"] : "";

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $origin);
}

// Allow specific HTTP methods (e.g., GET, POST, OPTIONS, etc.)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow specific headers (e.g., Content-Type, Authorization, etc.)
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Check if a specific ID is provided in the query string
$id = isset($_GET['id']) ? $_GET['id'] : null;

// Check if pagination parameters are provided in the query string
$limit = isset($_GET['limit']) ? $_GET['limit'] : 10;
$page = isset($_GET['page']) ? $_GET['page'] : 1;

// Define the SpaceX API URL
$spacex_url = 'https://api.spacexdata.com/v4/capsules/query';

// Define the query and options based on pagination parameters
$query = array(
    'options' => array(
        'limit' => (int)$limit,
        'page' => (int)$page,
    )
);

// Check if search parameters are provided in the query string
if (isset($_GET['search'])) {
    $searchQuery = $_GET['search'];
    $query['query'] = json_decode($searchQuery, true); // Decode the JSON search query
}

// If an ID is provided, modify the SpaceX API URL to fetch a single capsule
if ($id !== null) {
    $spacex_url = 'https://api.spacexdata.com/v4/capsules/' . $id;
}

// Convert the query array to JSON
$request_json = json_encode($query);

// Set the appropriate headers for the request
$headers = array(
    "Content-Type: application/json",
    // Add any other required headers here
);

// Make an HTTP GET or POST request to the SpaceX API v4 based on the presence of an ID
$ch = curl_init($spacex_url);
if ($id !== null) {
    // If an ID is provided, use a GET request
    curl_setopt($ch, CURLOPT_HTTPGET, true);
} else {
    // If no ID is provided, use a POST request with the query JSON
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request_json);
}
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);


$response = curl_exec($ch);

// Handle the response and errors
if ($response === false) {
    $error_message = curl_error($ch);
    http_response_code(500); // Internal Server Error
    echo json_encode(array("message" => "Error fetching data from SpaceX: " . $error_message));
    exit();
}

// Check for HTTP status code indicating an error
$http_status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if ($http_status_code !== 200) {
    http_response_code($http_status_code);
    echo json_encode(array("message" => "Error fetching data from SpaceX. HTTP Status Code: " . $http_status_code));
    exit();
}

// Process and return the SpaceX data
echo $response;

// Don't forget to close the cURL session
curl_close($ch);
?>
