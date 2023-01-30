<?php  
header('Access-Control-Allow-Origin: *');

include 'connection.php';

$stmt = $pdo->prepare("SELECT * FROM users WHERE email=:email LIMIT 1");
$stmt->execute(['email' => $_POST["email"]]); 
$user = $stmt->fetch();

if($_POST["mode"] == "login"){
    if($user['email'] == $_POST["email"]){
        if(md5($_POST["pass"]) == $user['password']){
            $sql = "INSERT INTO devices (ip, screen, user_agent, users_id) VALUES (?,?,?,?)";
            $stmt= $pdo->prepare($sql);
            $stmt->execute([$_POST["device"]["ip"], $_POST["device"]["screen"], $_POST["device"]["user_agent"], $user['id']]);
            echo json_encode($user, JSON_UNESCAPED_UNICODE);
        }else{
            echo 'error_login';
        }
    }else{
        echo 'error_login';
    }
}else if($_POST["mode"] == "register" && $user['email'] == $_POST["email"]){
    echo 'error_account';
}else if($_POST["mode"] == "register"){
    $sql = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
    $stmt= $pdo->prepare($sql);
    $stmt->execute([$_POST["name"], $_POST["email"], md5($_POST["pass"])]);
    echo 'registered';
}
