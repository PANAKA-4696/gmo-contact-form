<?php
//CORS設定(React:5173からのアクセスを許可する)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Context-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

//プリフライトリクエスト(事前確認)の処理
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    exit(0);
}

//Reactから送られてきたJSONデータを受け取る
$json = file_get_contents("php://input");
$data = json_decode($json, true);

//データが空の場合はエラーを返す
if (empty($data)) {
    http_response_code(400); //Bad Request
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}