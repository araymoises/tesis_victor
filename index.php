<?php
	session_start();
	if(!isset($_SESSION['username']) && empty($_SESSION['username'])) {
		header("Location: login.php");
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Principal</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" type="text/css" href="css/animate.css">
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.8/sweetalert2.min.css" />
	<script src="https://use.fontawesome.com/6ae49bf434.js"></script>
</head>
<body>
	<div class="jumbotron jumbotron-fluid" style="height:150px; margin-top:-30px;">
		<div class="container-fluid">
			<div class="row align-items-center">
				<div class="col-9 col-md-10 col-sm-10">
					<h4 class="display-4">Gestión de Asistencias</h4>
				</div>
				<div class="col-2 col-md-1 col-sm-1 logo-container">
					<div class="logo-picture">
						<img id="logo" src="img/loader.gif" class="img-fluid" >
					</div>
					<div class="logo-option">
						<label for="logo-chooser">
							<i class="fa fa-camera" aria-hidden="true"></i>
						</label>
						<input type="file" id="logo-chooser">
					</div>
				</div>
			</div>
		</div>
	</div>
	<ul class="nav nav-pills" od="myTab" role="tablist">
		<li class="nav-item">
			<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-expanded="true">Asistencia</a>
		</li>
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Docentes</a>
			<div class="dropdown-menu">
				<a class="dropdown-item" id="teacher-tab" data-toggle="tab" href="#teacher" role="tab" aria-controls="teacher">Buscar</a>
				<a class="dropdown-item" id="create-teacher-tab" data-toggle="tab" href="#create-teacher" role="tab" aria-controls="create-teacher">Agregar</a>
				<a class="dropdown-item" id="edit-teacher-tab" href="#">Editar</a>
				<a class="dropdown-item" id="delete-teacher-tab" href="#">Eliminar</a>
			</div>
		</li>
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Administradores</a>
			<div class="dropdown-menu">
				<a class="dropdown-item" id="admin-tab" data-toggle="tab" href="#admin" role="tab" aria-controls="admin">Buscar</a>
				<?php if($_SESSION['tipo_admin'] == 1){ ?>
				<a class="dropdown-item" id="create-admin-tab" data-toggle="tab" href="#create-admin" role="tab" aria-controls="create-admin">Agregar</a>
				<a class="dropdown-item" id="delete-admin-tab" href="#">Eliminar</a>
				<?php } ?>
			</div>
		</li>
		<li class="nav-item">
			<a class="nav-link" id="audit-tab" data-toggle="tab" href="#audit" role="tab" aria-controls="audit">Auditoría</a>
		</li>
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Cuenta</a>
			<div class="dropdown-menu">
				<a class="dropdown-item" id="config-admin-tab" data-toggle="tab" href="#config-admin" role="tab" aria-controls="config-admin">Configuración</a>
				<a id="logout" class="dropdown-item logout" href="#">Cerrar sesión</a>
			</div>
		</li>
	</ul>

	<!--TAB PANES-->
	<div class="tab-content" id="myTabContent">
		<!--SEARCH PANES-->
		<!--SEARCH TEACHERS-->
		<div class="tab-pane fade bg-light" id="teacher" role="tabpanel" aria-labelledby="teacher-tab">
			<section class="container">
				<h1 class="display-5">Ve la información de tus empleados.</h1>
				<br><br>
				<table id="teachers" class="display">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Cédula</th>
							<th>Correo</th>
							<th>Teléfono</th>
							<th>Horario</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</section>
		</div>
		<!--SEARCH ADMINS-->
		<div class="tab-pane fade bg-light" id="admin" role="tabpanel" aria-labelledby="admin-tab">
			<section class="container">
				<h1 class="display-5">¿Quienes manejan este sistema?</h1>
				<br><br>
				<table id="admins" class="display">
					<thead>
						<tr>
							<th>Tipo de Admin</th>
							<th>Cédula</th>
							<th>Usuario</th>
							<th>Correo</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</section>
		</div>
		<!--ASSITS SEARCH-->
		<div class="tab-pane fade bg-light" id="audit" role="tabpanel" aria-labelledby="audit-tab">
			<section class="container">
				<h1 class="display-5">Verifíca las asistencias de tus empleados</h1>
				<br><br>
				<table id="audits" class="display">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Cédula</th>
							<th>Fecha</th>
							<th>Acción</th>
							<th>Observación</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</section>
		</div>
		<!--CREATE PANES-->
		<!--TEACHER CREATE-->
		<div class="tab-pane fade bg-light" id="create-teacher" role="tabpanel" aria-labelledby="create-teacher-tab">
			<section class="container-fluid">
				<h1 class="display-5">Agrega un nuevo docente</h1>
				<br>
				<form id="form-create-teacher">
					<div class="form-row">
						<div class="form-group col-md-6">
							<label>Nombre</label>
							<input type="name" class="form-control name" placeholder="Nombre">
						</div>
						<div class="form-group col-md-6">
							<label>Apellido</label>
							<input type="name" class="form-control lastname" placeholder="Apellido">
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label>Cédula</label>
							<input type="number" class="form-control id" placeholder="Cédula de identidad">
						</div>
						<div class="form-group col-md-6">
							<label>Telefono</label>
							<input type="number" class="form-control phone" placeholder="Telefono">
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-12">
							<label>Correo</label>
							<input type="email" class="form-control mail" placeholder="Correo">
						</div>
					</div>
					<h1 class="display-5">Establecer horario</h1>
					<br>
					<div class="card card-body horario-docente">
						<table class="table table-bordered table-responsive">
							<thead class="thead-inverse table-bord">
								<tr>
									<th colspan="2"></th>
									<th colspan="4">Horario matutino</th>
									<th colspan="4">Horario diurno</th>
								</tr>
								<tr>
									<th colspan="2">Días</th>
									<th colspan="2">Desde</th>
									<th colspan="2">Hasta</th>
									<th colspan="2">Desde</th>
									<th colspan="2">Hasta</th>
								</tr>
							</thead>
							<tbody class="not-bordered">
								<tr class="monday">
									<td colspan="2">
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" class="form-check-input">
												Lunes
											</label>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-pm" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-pm" disabled>
										</div>
									</td>
								</tr>
								<tr class="tuesday">
									<td colspan="2">
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" class="form-check-input">
												Martes
											</label>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-pm" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-pm" disabled>
										</div>
									</td>
								</tr>
								<tr class="wednesday">
									<td colspan="2">
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" class="form-check-input">
												Miercoles
											</label>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-pm" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-pm" disabled>
										</div>
									</td>
								</tr>
								<tr class="thursday">
									<td colspan="2">
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" class="form-check-input">
												Jueves
											</label>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-pm" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-pm" disabled>
										</div>
									</td>
								</tr>
								<tr class="friday">
									<td colspan="2">
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" class="form-check-input">
												Viernes
											</label>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-pm" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-pm" disabled>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="right">
						<button class="btn btn-primary btn-lg">Agregar Docente</button>
					</div>
				</form>
			</section>
		</div>
		<!--ADMIN CREATE-->
		<div class="tab-pane fade bg-light" id="create-admin" role="tabpanel" aria-labelledby="create-admin-tab">
			<section class="container">
				<h1 class="display-5">Agrega un nuevo usuario administrador</h1>
				<br>
				<form class="cmxform" id="form-create-admin" method="get" action="">
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label>Nombre</label>
								<input type="name" class="form-control name" placeholder="Nombre">
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label>Apellido</label>
								<input type="name" class="form-control lastname" placeholder="Apellido">
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label>Cédula</label>
								<input type="number" class="form-control id" placeholder="Nombre de usuario">
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label>Nombre de usuario</label>
								<input type="name" class="form-control user" placeholder="Nombre de usuario">
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="form-group">
								<label>Correo electrónico</label>
								<input type="email" class="form-control mail" placeholder="Correo electrónico">
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label>Contraseña</label>
								<input type="password" class="form-control pass" placeholder="Contraseña">
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label>Repita la contraseña</label>
								<input type="password" class="form-control r-pass" placeholder="Repita la contraseña">
							</div>
						</div>
					</div>
					<div class="right">
						<button type="submit" class="btn btn-primary">Aceptar</button>
					</div>
				</form>
				<form id="confirm-email" method="POST" action="http://formspree.io/" hidden>
					<input type="text" name="mensaje" placeholder="Your email"
					value= "Le damos la bienvenida a el sistema de control de asistencia.">
				</form>
			</section>
		</div>
		<!--EDIT PANES-->
		<!--TEACHER EDIT-->
		<div class="tab-pane fade bg-light" id="edit-teacher" role="tabpanel" aria-labelledby="edit-teacher-tab">
			<section class="container-fluid">
				<h1 class="display-5">Editar docente</h1>
				<br>
				<form id="form-edit-teacher">
					<div class="form-row">
						<div class="form-group col-md-6">
							<label>Nombre</label>
							<input type="name" class="form-control name" placeholder="Nombre">
						</div>
						<div class="form-group col-md-6">
							<label>Apellido</label>
							<input type="name" class="form-control lastname" placeholder="Apellido">
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="pass">Cédula</label>
							<input type="number" class="form-control id" placeholder="Cédula de identidad">
						</div>
						<div class="form-group col-md-6">
							<label for="pass">Telefono</label>
							<input type="number" class="form-control phone" placeholder="Telefono">
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-12">
							<div class="form-group">
								<label>Correo</label>
								<input type="email" class="form-control mail" placeholder="Correo electrónico">
							</div>
						</div>
					</div>
					<h1 class="display-5">Establecer horario</h1>
					<br>
					<div class="card card-body horario-docente">
						<table class="table table-bordered table-responsive">
							<thead class="thead-inverse table-bord">
								<tr>
									<th colspan="2"></th>
									<th colspan="4">Horario matutino</th>
									<th colspan="4">Horario diurno</th>
								</tr>
								<tr>
									<th colspan="2">Días</th>
									<th colspan="2">Desde</th>
									<th colspan="2">Hasta</th>
									<th colspan="2">Desde</th>
									<th colspan="2">Hasta</th>
								</tr>
							</thead>
							<tbody class="not-bordered">
								<tr class="monday">
									<td colspan="2">
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" class="form-check-input">
												Lunes
											</label>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-pm" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-pm" disabled>
										</div>
									</td>
								</tr>
								<tr class="tuesday">
									<td colspan="2">
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" class="form-check-input">
												Martes
											</label>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-pm" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-pm" disabled>
										</div>
									</td>
								</tr>
								<tr class="wednesday">
									<td colspan="2">
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" class="form-check-input">
												Miercoles
											</label>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-pm" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-pm" disabled>
										</div>
									</td>
								</tr>
								<tr class="thursday">
									<td colspan="2">
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" class="form-check-input">
												Jueves
											</label>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-pm" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-pm" disabled>
										</div>
									</td>
								</tr>
								<tr class="friday">
									<td colspan="2">
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" class="form-check-input">
												Viernes
											</label>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-am" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control since-pm" disabled>
										</div>
									</td>
									<td colspan="2">
										<div class="form-group">
											<input type="time" class="form-control until-pm" disabled>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="right">
						<button class="btn btn-primary btn-lg">Actualizar Docente</button>
					</div>
				</form>
			</section>
		</div>
		<div class="tab-pane fade bg-light show active" id="home" role="tabpanel" aria-labelledby="home-tab">
			<section class="container">
				<h1 class="display-5">Asistencia</h1>
				<br>
				<div class="row justify-content-md-center">
					<div class="col-md-6">
						<div class="color-container green" class="row">
							<div id="green" class="color-access" ></div>
							<span>¡Ha llegado temprano!</span>
						</div>
						<div class="color-container blue" class="row">
							<div id="blue" class="color-access" ></div>
							<span>Ha llegado puntual.</span>
						</div>
						<div class="color-container yellow" class="row">
							<div id="yellow" class="color-access" ></div>
							<span>Ha llegado tarde.</span>
						</div>
						<div class="color-container orange" class="row">
							<div id="orange" class="color-access" ></div>
							<span>Ha llegado fuera de su horario.</span>
						</div>
						<div class="color-container red" class="row">
							<div id="red" class="color-access" ></div>
							<span>Usuario no encontrado.</span>
						</div>
					</div>
					<div id="carnet" class="col-md-4">
						<form id="form-teacher-assistance">
							<div class="form-group">
								<img id="logo" src="img/carnet.png" class="img-fluid">
							</div>
							<div class="carnet-info">
								<span class="name">Nombre: <b></b></span><br>
								<span class="id">Cédula: <b></b></span><br>
								<span class="phone">Telefono: <b></b></span>
								<div class="form-group">
									<input type="number" class="form-control cedula" autocomplete="on" autofocus>
								</div>
							</div>

						</form>
					</div>
				</div>
			</section>
		</div>
		<!--ADMIN CONFIG-->
		<div class="tab-pane fade bg-light" id="config-admin" role="tabpanel" aria-labelledby="config-admin-tab">
			<section class="container">
				<input id="id-admin" type="text" name="" value="<?php echo $_SESSION['id'] ?>" hidden>
				<h1 class="display-5"><?php echo $_SESSION['username'] ?></h1><br>
				<div class="card card-body">
					<form id="form-edit-user">
						<p class="lead">Nombre de usuario</p>
						<div class="row">
							<div class="col-md-8">
								<div class="form-group">
									<input type="text" class="form-control user" value="<?php echo $_SESSION['username'] ?>">
								</div>
							</div>
							<div class="col-md-4">
								<button type="submit" class="btn btn-primary">Cambiar nombre de usuario</button>
							</div>
						</div>
					</form>
					<br>
					<form id="form-edit-id">
						<p class="lead">Cédula de indentidad</p>
						<div class="row">
							<div class="col-md-8">
								<div class="form-group">
									<input type="number" class="form-control id" value="<?php echo $_SESSION['cedula'] ?>">
								</div>
							</div>
							<div class="col-md-4">
								<button type="submit" class="btn btn-primary">Cambiar cédula</button>
							</div>
						</div>
					</form>
					<br>
					<form id="form-edit-mail">
						<p class="lead">Correo</p>
						<div class="row">
							<div class="col-md-8">
								<div class="form-group">
									<input type="email" class="form-control mail" value="<?php echo $_SESSION['correo'] ?>">
								</div>
							</div>
							<div class="col-md-4">
								<button type="submit" class="btn btn-primary">Cambiar correo</button>
							</div>
						</div>
					</form>
					<br>
					<form id="form-edit-pass">
						<p class="lead">Contraseña</p>
						<div class="form-group">
							<input type="password" class="form-control o-pass" placeholder="Contraseña actual">
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<input type="password" class="form-control pass" placeholder="Nueva contraseña">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<input type="password" class="form-control r-pass" placeholder="Repita la nueva contraseña">
								</div>
							</div>
						</div>
						<div class="form-group">
							<button type="submit" class="btn btn-primary">Cambiar contraseña</button>
						</div>
					</form>
					<br>
					<?php if($_SESSION['tipo_admin'] == 1){ ?>
					<p class="lead">Opciones de cuenta</p>
					<div class="form-group">
						<button id="close-account" class="btn btn-danger" value="<?php echo $_SESSION['cedula'] ?>">Eliminar mi cuenta</button>
					</div>
					<?php } ?>
				</div>
			</section>
		</div>
	</div>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.8/sweetalert2.min.js"></script>
	<script type="text/javascript" src="js/index.js"></script>
	<script type="text/javascript" src="js/admin.js"></script>
	<script type="text/javascript" src="js/empleado.js"></script>
	<script type="text/javascript" src="js/asistencia.js"></script>
	<script type="text/javascript" src="js/auditoria.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.3.0/firebase.js"></script>
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
