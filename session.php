<?php
if(!empty($_POST) && isset($_POST)){
  session_start();
  $_SESSION["id"] = $_POST['id'];
  $_SESSION["cedula"] = $_POST['cedula'];
  $_SESSION["correo"] = $_POST['correo'];
  $_SESSION["password"] = $_POST['password'];
  $_SESSION["tipo_admin"] = $_POST['tipo_admin'];
  $_SESSION["username"] = $_POST['username'];
  echo $_SESSION["username"];
}else{
  echo '0';
}
