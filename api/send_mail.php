<?php
//CORS設定(React:5173からのアクセスを許可する)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Context-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
