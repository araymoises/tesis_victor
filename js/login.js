$(function() {

	//FOR VALIDATIONS
	var filled = false;
	var found = false;
	var ref_administrador = null;
	var correo ="";
	var clave="";

	//COLORS
	var primary = '#0B3C5D';
	var secondary = '#328CC1';
	var danger = '#B82601';

	var ref = firebase.database().ref("admin");
	var $form_login = $('#form-login');
	var $forgot_pass = $('#forgot');
	var $form_forgot = $('#form-forgot');

	var encontrado = false;
	var admin_encontrado;

	$form_login.submit(function(event) {
		event.preventDefault();

		filled = true;
		$form_login.find('.form-control').each(function(index, element) {
			$input = $(element);
			$input.removeClass('is-invalid');
			$input.removeClass('is-valid');
			$input.parent().find('.invalid-feedback').remove();

			if(!validateForm($input)) {
				filled = false;
			}
		});
		if(filled){
			ref.endAt("pterodactyl").once("value")
			.then(function(admins) {
				admins.forEach(function(admin){
					if(($('#username').val() == admin.val().username) && ($('#pass').val() == admin.val().password)){
						admin_encontrado = admin;
						encontrado = true;
						return false;
					}
				});
				if(encontrado){
					$('#username').val('');
					$('#pass').val('');
					$.ajax({
						url: "../session.php",
						type: "POST",
						//contentType: "application/json",
						data: {
							id: admin_encontrado.Gt.path.ct[1],
							cedula: admin_encontrado.val().cedula,
							correo: admin_encontrado.val().correo,
							password: admin_encontrado.val().password,
							tipo_admin: admin_encontrado.val().tipo_admin,
							username: admin_encontrado.val().username
						}
						//dataType: "JSON"
					})
					.done(function(data) {
						console.log('Done:' + data);
							console.log(data);
						window.location.href = "index.php";
					})
					.fail(function(s) {
						console.log('Error:');
						console.log(s);
					});
					return true;
				}
				else{
					swal(
						'Error',
						'El nombre de usuario o contraseña es incorrecto',
						'error'
						);
					$('#username').val('')
					$('#pass').val('')
				}
			});
		}
	});

	$forgot_pass.click(function(event) {
		event.preventDefault();

		swal({
			title: 'Olvido su contraseña',
			text: 'Ingrese su cedula y le enviaremos un correo con su contraseña',
			type: 'question',
			input: 'number',
			showCancelButton: true,
			confirmButtonText: 'Aceptar',
			confirmButtonColor: secondary,
			inputValidator: function(value) {
				return new Promise(function(resolve, reject) {
					if(value !== "") {
						if (value.length > 9 || value.length < 7){
							reject('La cédula introducida no es válida');
						}else{
							resolve();
						}
					}else{
						reject('El campo no puede estar vacío');
					}
				});
			}
		}).then(function(cedula) {
			found = false;
			ref.once('value')
			.then(function(administradores) {
				administradores.forEach(function(administrador) {
					if(administrador.val().cedula == cedula) {
						found = true;
						correo = administrador.val().correo;
						clave = administrador.val().password;
						return false;
					}
				})
			})
			.then(function() {
				if(found) {
					var action = "http://formspree.io/" + correo;
					var value = "Su contraseña es: " + clave;
					$form_forgot.attr('action', action);
					$form_forgot.find('textarea').text(value);
					$form_forgot.trigger('submit');
					correo = "";
					clave = "";
					forgotSuccess();
				}else {
					notFound();
				}
			});
		});
	});
})

function isName(word) {

	var name = true;

	for(var i = 0; i < word.length; i++){
		var n = word.charCodeAt(i);
		if((n > 64 && n < 91) || (n > 96 && n < 123) || n ==130 || (n > 159 && n > 164) ) {

		}else{
			name = false;
		}
	}

	return name;
}

function isAlphanumeric(word) {

	var username = true;

	for(var i = 0; i < word.length; i++){
		var n = word.charCodeAt(i);
		if((n > 64 && n < 91) || (n > 96 && n < 123) || (n > 47 && n < 58)) {

		}else{
			username = false;
		}
	}

	return username;
}

function validateForm($input) {
	var fill = true;
	var userVal = '<div class="invalid-feedback">El campo solo debe contener caracteres alfanumericos</div>';
	var passVal = '<div class="invalid-feedback">La contraseña debe contener por lo menos 6 caracteres</div>';

	if(!$input.val()){
		fill = false;
		$input.addClass('is-invalid');
	}else{
		if($input.hasClass('user')){
			if(!isAlphanumeric($input.val())){
				$input.addClass('is-invalid');
				$input.parent().append(userVal);
				fill = false;
			}
		}else if($input.hasClass('pass')){
			if(!isAlphanumeric($input.val())){
				$input.addClass('is-invalid');
				$input.parent().append(userVal);
				fill = false;
			}else if($input.val().length < 6) {
				$input.addClass('is-invalid');
				$input.parent().append(passVal);
				fill = false;
			}
		}
	}

	return fill;
}

function forgotSuccess(){
	swal({
		title: 'Listo',
		text: 'Ya puede proceder a revisar su correo',
		type: 'success'
	})
}

function notFound(){
	swal({
		title: 'No se encuentra',
		text: 'La cédula introducida no corresponde a ningún usuario',
		type: 'error'
	})
}
