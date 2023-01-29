<?php  
header('Access-Control-Allow-Origin: *');

function getUserIpAddr(){
    if(!empty($_SERVER['HTTP_CLIENT_IP'])){
        //ip from share internet
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    }elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
        //ip pass from proxy
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }else{
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

echo getUserIpAddr();




// session_start();
// include 'connection.php';

// $email_usuario = $_SESSION['usuario_logado'];
//     $sql =  "SELECT nomeUsuario, tipoUsuario FROM usuario WHERE emailUsuario = $email_usuario;";
//     $result = mysqli_query($conn, $sql);
//     $dados = mysqli_fetch_assoc($result);
//     $nome_usuario = $dados['nomeUsuario']; // traz o nome do usuário do banco de dados.
//     $tipo_usuario = $dados['tipoUsuario']; // traz o tipo de usuário do banco de dados.