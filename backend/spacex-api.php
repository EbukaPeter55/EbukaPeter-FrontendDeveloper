<?php
// This PHP script handles fetching data for all or a single SpaceX capsule with pagination.

// Allow CORS requests from your React app and Postman
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: https://www.getpostman.com");

// Define the SpaceX API endpoint for capsules
$spacex_url = 'https://api.spacexdata.com/v3/capsules';

// Check if a specific capsule_serial is provided in the query string
$capsule_serial = isset($_GET['capsule_serial']) ? $_GET['capsule_serial'] : null;

// Check if pagination parameters are provided in the query string
$limit = isset($_GET['limit']) ? $_GET['limit'] : 10;
$page = isset($_GET['page']) ? $_GET['page'] : 1;

// Construct the SpaceX API URL based on whether capsule_serial is provided
if ($capsule_serial !== null) {
    // Fetch data for a single capsule
    $spacex_url .= "/$capsule_serial";
} else {
    // Fetch data for all capsules with pagination
    $spacex_url .= "?limit=$limit&page=$page";
}

// Make an HTTP request to the SpaceX API using cURL or any other HTTP client library.
$ch = curl_init($spacex_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

if (!$response) {
    http_response_code(500); // Internal Server Error
    echo json_encode(array("message" => "Error fetching data from SpaceX."));
    exit();
}

// Process and return the SpaceX data.
$data = json_decode($response, true);

// You can manipulate the data as needed and return it to your React app or Postman.
echo json_encode($data);

// Don't forget to close the cURL session.
curl_close($ch);
?>
