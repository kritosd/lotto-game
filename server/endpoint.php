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

if ($method == 'GET') {
	$bettype = intval($_GET['bettype']);
	$selections = $_GET['selections'] ? array_map('intval', explode(',', $_GET['selections'] )) : [];
	
	$betslip = array('betslip' =>
		array([
			'gameType' => "KINO",
			'wager' => array(
				'boards' => array([
						"betType" => $bettype,
						"boardId" => 1,
						"panels" => array([
							"selection" => $selections,
							"quickPick" => true
						]),
						"multipliers" => 1,
						"systems" => null,
					],
					"participatingDraws" => array(
						"multipleDraws" => 1
					)
				)
			)
		])
	);

	echo json_encode($betslip);
}