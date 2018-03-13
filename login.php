<!DOCTYPE html>
<html>
<head>
	<title>Inicia sesión</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.8/sweetalert2.min.css" />
</head>
<body class="bg-primary">
	<div class="jumbotron login">
		<h1 class="display-4">Iniciar sesión</h1>
	</div>
	<div class="row justify-content-md-center">
		<div class="col-md-5">
			<form id="form-login">
				<div class="card card-body login">
					<div class="form-group">
						<label for="username">Usuario</label>
						<input type="text" name="username" id="username" class="form-control user">
					</div>
					<div class="form-group">
						<label for="pass">Contraseña</label>
						<input type="password" name="pass" id="pass" class="form-control pass">
					</div>
					<div class="form-group">
						<a href="#" id="forgot">¿Olvidó su contraseña?</a>
					</div>
					<button type="submit" class="btn btn-primary btn-block btn-lg">Entrar</button>
				</div>
			</form>
			<form id="form-forgot" method="POST" action="http://formspree.io/" hidden>
				<input type="text" name="Titulo" placeholder="Your email"
				value= "De parte del sistema de control de asistencia">
				<textarea name="Mensaje"></textarea>
			</form>
		</div>
	</div>

	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.8/sweetalert2.min.js"></script>
	<script type="text/javascript" src="js/login.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.3.0/firebase.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
	<script>
    // Initialize Firebase
    var config = {
    	apiKey: "AIzaSyAbCz7j1R1TY1kVBguSKgJbifLmdpoHbUw",
    	authDomain: "fmctest-51288.firebaseapp.com",
    	databaseURL: "https://fmctest-51288.firebaseio.com",
    	projectId: "fmctest-51288",
    	storageBucket: "fmctest-51288.appspot.com",
    	messagingSenderId: "881842042237"
    };
    firebase.initializeApp(config);
</script>
</body>
</html>
