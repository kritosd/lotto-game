<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'POST') {
	$body = file_get_contents('php://input');
	$data = json_decode($body);

	// Access data with $data->numbers or $data->game
	
	// In order to send the repsonse json encoding is needed.
	// To send only the number ex: echo json_encode($data->numbers);
	echo json_encode($data);
}