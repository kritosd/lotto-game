<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $path = './ready_kino_files'; 

    $game = $_GET['game'];
    switch ($game) {
        case 'tzoker':
            $path = './ready_kino_files'; 
            break;

        case 'kino':
            $path = './ready_kino_files'; 
            break;
        
        default:
            $path = './ready_kino_files'; 
            break;
    }
    $files = glob($path.'/_ready_kino_card_*');

    $array = array();

    foreach ($files as $file) {
        $card = file_get_contents($file);
        array_push($array, $card);
    }
    
	echo json_encode(array('cards' => $array));
}