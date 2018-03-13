$(function () {
	//Nuevo repositorio
	//DB VARIABLES
	var db = firebase.database()
	var ref_empleado;
	var del_empleado;
	var edt_empleado;
	var ref_administrador;

	var $panes = $('.tab-pane');
	var $tabs = $('.nav-link, .dropdown-item');

	//FORMS
	var $form_create_teacher = $('#form-create-teacher');
	var $form_edit_teacher = $('#form-edit-teacher');
	var $form_create_admin = $('#form-create-admin');
	var $form_edit_user = $('#form-edit-user');
	var $form_edit_id = $('#form-edit-id');
	var $form_edit_mail = $('#form-edit-mail');
	var $form_edit_pass = $('#form-edit-pass');
	var $form_teacher_assist = $('#form-teacher-assistance');

	//CONTAINERS
	var $logo_container = $('.logo-container');

	//COLORS
	var primary = '#0B3C5D';
	var secondary = '#328CC1';
	var danger = '#B82601';

	//FORM VALIDATIONS
	var filled = false;
	var valid = false;
	var pass = "";
	var rpass = "";
	var checked = 0;

	var $input;
	var usuario = {
		usuario: $form_edit_user.find('input.user').val(),
		cedula: $form_edit_id.find('input.id').val(),
		correo: $form_edit_mail.find('input.mail').val()
	}

	refreshLogo();

	$logo_container.on({
		mouseenter: function (event) {
			$logo_container.find('.logo-option').show();
		},
		mouseleave: function (event) {
			$logo_container.find('.logo-option').hide();
		}
	});

	$logo_container.find('.logo-picture').click(function (event) {
		var image = $logo_container.find('img').attr('src');
		swal({
			confirmButtonText: 'Cerrar',
			html:
			'<img class="img-fluid" src="' + image + '">' +
			'</img>'
		});
	});

	$("#logo-chooser").change(function () {

		readURL(this);
	});

	$('#edit-teacher-tab').click(function (event) {
		ref_empleado = db.ref('empleado');
		encontrado = false;
		edt_empleado = null;
		swal({
			title: 'Cédula del docente a editar',
			input: 'number',
			type: 'question',
			showCancelButton: true,
			showLoaderOnConfirm: true,
			confirmButtonColor: secondary,
			confirmButtonText: 'Buscar',
			allowOutsideClick: false,
			inputValidator: function (value) {
				return new Promise(function (resolve, reject) {
					if (value !== "") {
						if (value.length > 9 || value.length < 7) {
							reject('La cédula introducida no es válida.');
						} else {
							ref_empleado.once("value")
								.then(function (empleados) {
									empleados.forEach(function (empleado) {
										if (value == empleado.val().cedula) {
											edt_empleado = empleado;
											encontrado = true;
											return false;
										}
									});
								})
								.then(function () {
									if (encontrado)
										resolve()
									else
										reject('La cédula introducida no existe.');
								});
						}
					} else {
						reject('El campo no puede estar vacío');
					}
				});
			}
		}).then(function (cedula) {
			$panes.removeClass('show active');
			$tabs.removeClass('active');
			$('#edit-teacher').addClass('show active');
			$('#edit-teacher-tab').addClass('active');
			fillEditPane($form_edit_teacher, edt_empleado);
		});
	});

	$('#delete-teacher-tab').click(function (event) {
		ref_empleado = db.ref("empleado");
		encontrado = false;
		swal({
			title: '¿Cual docente desea eliminar?',
			input: 'number',
			inputPlaceholder: 'Cédula',
			type: 'question',
			showCancelButton: true,
			confirmButtonText: 'Buscar',
			confirmButtonColor: secondary,
			allowOutsideClick: true,
			inputValidator: function (value) {
				return new Promise(function (resolve, reject) {
					if (value !== "") {
						if (value.length > 9)
							reject('La cédula introducida no es válida.');
						else
							ref_empleado.once("value")
								.then(function (empleados) {
									empleados.forEach(function (empleado) {
										if (value == empleado.val().cedula) {
											del_empleado = empleado;
											encontrado = true;
											return false;
										}
									});
								})
								.then(function () {
									if (encontrado)
										resolve()
									else
										reject('La cédula introducida no existe.');
								});
					} else {
						reject('El campo no puede estar vacío');
					}
				});
			}
		}).then(function (cedula) {
			swal({
				title: 'Advertencia',
				text: "Una vez elimine al usuario este no podrá volver a ingresar a su cuenta.",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Eliminar'
			}).then(function () {
				del_empleado.ref.remove();
				swal(
					'¡Eliminado!',
					'El adminitrador ha sido eliminado exitosamente.',
					'success'
				)
			})
		});
	});

	$('#delete-admin-tab').click(function (event) {
		var ref_admin = db.ref("admin");
		var del_admin;
		var encontrado = false;
		swal({
			title: '¿Cual administrador desea eliminar?',
			input: 'number',
			inputPlaceholder: 'Cédula',
			type: 'question',
			showCancelButton: true,
			confirmButtonText: 'Buscar',
			confirmButtonColor: secondary,
			allowOutsideClick: true,
			inputValidator: function (value) {
				return new Promise(function (resolve, reject) {
					if (value !== "") {
						if (value.length > 9)
							reject('La cédula introducida no es válida.');
						else
							ref_admin.once("value")
								.then(function (admins) {
									admins.forEach(function (admin) {
										if (value == admin.val().cedula) {
											if (admin.val().tipo_admin != 1) {
												del_admin = admin;
												encontrado = true;
												return false;
											} else
												reject('Un super administrador no puede ser eliminado.');
										}
									});
								})
								.then(function () {
									if (encontrado)
										resolve()
									else {
										reject('La cédula introducida no existe.');
									}
								});
					} else {
						reject('El campo no puede estar vacío.');
					}
				});
			}
		}).then(function (cedula) {
			swal({
				title: 'Advertencia',
				text: "Una vez elimine al usuario este no podrá volver a ingresar a su cuenta.",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Eliminar'
			}).then(function () {
				del_admin.ref.remove();
				swal(
					'¡Eliminado!',
					'El adminitrador ha sido eliminado exitosamente.',
					'success'
				)
			})
		});
	});

	$('#create-teacher, #edit-teacher').find('input[type="checkbox"]').click(function (event) {
		var $checkbox = $(this);
		if ($checkbox.is(':checked')) {
			$checkbox.closest('tr').find('.form-control').prop('disabled', false);
		} else {
			$checkbox.closest('tr').find('.form-control').prop('disabled', true);
		}
	});

	$('#logout').click(function (event) {
		event.preventDefault();
		location.href = "logout.php";
	});

	//SUBMIT FORMS
	$form_teacher_assist.submit(function (event) {
		event.preventDefault();
		/*filled = true;
		$form_teacher_assist.find('.form-control').each(function(index, element) {
			$input = $(element);
			if(!$input.val()){
				filled = false;
				$input.addClass('is-invalid');
			}else{
				$input.removeClass('is-invalid');
			}
		});
		if(filled === false){
		}else{
			swal({
				title: 'Hora registrada',
				type: 'success'
			})
		}*/
	});

	$form_create_teacher.submit(function (event) {
		event.preventDefault();

		ref_empleado = db.ref('empleado');
		filled = true;

		$form_create_teacher.find('.form-control').not('input[type="time"]').each(function (index, element) {
			$input = $(element);
			$input.parent().find('.invalid-feedback').remove();
			$input.removeClass('is-valid');
			$input.removeClass('is-invalid');

			if (!validateForm($input)) {
				filled = false;
			}
		});

		checked = 0;

		$form_create_teacher.find('table tbody tr').each(function (index, element) {
			var $days = $(element);
			var $hours = $(this).find('.form-control');

			if ($days.find('.form-check-input').is(':checked')) {
				if (!$hours.eq(0).val() && !$hours.eq(1).val() && !$hours.eq(2).val() && !$hours.eq(3).val()) {
					filled = false;
				} else if (($hours.eq(0).val() && !$hours.eq(1).val()) || (!$hours.eq(0).val() && $hours.eq(1).val())) {
					filled = false;
				} else if (($hours.eq(2).val() && !$hours.eq(3).val()) || (!$hours.eq(2).val() && $hours.eq(3).val())) {
					filled = false;
				}
				checked += 1;
			}
		});

		if (!filled) {
			emptyFields();
		} else if (checked === 0) {
			emptySchedule();
		} else {
			var empleado = teacherInfo($form_create_teacher);
			var correo = true;
			var cedula = true;
			ref_empleado.once('value', function (snaps) {
				snaps.forEach(function (snap) {
					if (snap.val().cedula == empleado.cedula) {
						cedula = false;
					}
					if (snap.val().correo == empleado.correo) {
						correo = false;
					}
				})
			}).then(function () {
				if (cedula && correo) {
					$form_create_teacher.find('.form-control').addClass('is-valid');
					ref_empleado.push(empleado);
					signSuccess();
				} else if (!cedula) {
					$form_create_teacher.find('.id').removeClass('is-valid').addClass('is-invalid');
					swal({
						type: 'error',
						title: 'Error',
						text: 'La cedula introducida ya está en uso'
					});
				} else if (!correo) {
					$form_create_teacher.find('.mail').removeClass('is-valid').addClass('is-invalid');
					swal({
						type: 'error',
						title: 'Error',
						text: 'El correo introducido ya está en uso'
					});
				}
			});
		}
	});

	$form_edit_teacher.submit(function (event) {
		event.preventDefault();
		ref_empleado = db.ref('empleado');
		filled = true;

		$form_edit_teacher.find('.form-control').not('input[type="time"]').each(function (index, element) {
			$input = $(element);
			$input.parent().find('.invalid-feedback').remove();
			$input.removeClass('is-valid');
			$input.removeClass('is-invalid');

			if (!validateForm($input)) {
				filled = false;
			}
		});

		checked = 0;

		$form_edit_teacher.find('table tbody tr').each(function (index, element) {
			var $days = $(element);
			var $hours = $(this).find('.form-control');

			if ($days.find('.form-check-input').is(':checked')) {
				if (!$hours.eq(0).val() && !$hours.eq(1).val() && !$hours.eq(2).val() && !$hours.eq(3).val()) {
					filled = false;
				} else if (($hours.eq(0).val() && !$hours.eq(1).val()) || (!$hours.eq(0).val() && $hours.eq(1).val())) {
					filled = false;
				} else if (($hours.eq(2).val() && !$hours.eq(3).val()) || (!$hours.eq(2).val() && $hours.eq(3).val())) {
					filled = false;
				}
				checked += 1;
			}
		});

		if (!filled) {
			emptyFields();
		} else if (checked === 0) {
			emptySchedule();
		} else {
			var empleado = teacherInfo($form_edit_teacher);
			var correo = true;
			var cedula = true;
			ref_empleado.once('value', function (snaps) {
				snaps.forEach(function (snap) {
					if (snap.val().cedula != edt_empleado.val().cedula) {
						if (snap.val().cedula == empleado.cedula) {
							cedula = false;
						}
					}
					if (snap.val().correo != edt_empleado.val().correo) {
						if (snap.val().correo == empleado.correo) {
							correo = false;
						}
					}
				})
			}).then(function () {
				if (cedula && correo) {

					$form_edit_teacher.find('.form-control').addClass('is-valid');
					ref_empleado
						.once('value', function (snaps) {
							snaps.forEach(function (snap) {
								if (snap.val().cedula === edt_empleado.val().cedula) {
									snap.ref.update(empleado);
								}
							})
						});
					signSuccess();

				} else if (!cedula) {
					$form_edit_teacher.find('.id').removeClass('is-valid').addClass('is-invalid');
					swal({
						type: 'error',
						title: 'Error',
						text: 'La cedula introducida ya está en uso'
					});
				} else if (!correo) {
					$form_edit_teacher.find('.mail').removeClass('is-valid').addClass('is-invalid');
					swal({
						type: 'error',
						title: 'Error',
						text: 'El correo introducido ya está en uso'
					});
				}
			});
		}
	});

	$form_create_admin.submit(function (event) {
		event.preventDefault();

		var ref = db.ref("admin");

		filled = true;

		$form_create_admin.find('.form-control').each(function (index, element) {
			$input = $(element);
			$input.removeClass('is-invalid');
			$input.removeClass('is-valid');
			$input.parent().find('.invalid-feedback').remove();

			if (!validateForm($input)) {
				filled = false;
			}
		});

		var pass = $form_create_admin.find('.pass').val();
		var rpass = $form_create_admin.find('.r-pass').val();

		if (!filled) {
			emptyFields();
		} else if (pass !== rpass) {
			$form_create_admin.find('input[type="password"]').addClass('is-invalid');
			equalPasswords();
		} else {
			var username = $(this).find('.user').val();
			var password = $(this).find('.pass').val();
			var correo = $(this).find('.mail').val();
			var cedula = $(this).find('.id').val();
			var r_password = $(this).find('.r-pass').val(); //Verificar Contraseña.

			var ced = true;
			var cor = true;
			var usu = true;

			ref.once('value', function (snaps) {
				snaps.forEach(function (snap) {
					if (snap.val().cedula == cedula) {
						ced = false;
					}
					if (snap.val().correo == correo) {
						cor = false;
					}
					if (snap.val().username == username) {
						usu = false;
					}
				});
			}).then(function () {
				if (ced && cor) {

					$form_create_admin.find('.form-control').addClass('is-valid');

					ref.push({
						tipo_admin: '2',
						correo: correo,
						username: username,
						cedula: cedula,
						password: password
					});

					var $form_confirm_email = $('#confirm-email');
					var action = "http://formspree.io/" + correo;

					swal({
						title: 'Datos almacenados',
						text: 'Confirme el correo que le acabamos de enviar',
						allowOutsideClick: false,
						type: 'success'
					}).then(function () {
						$form_create_admin.find('.form-control').val('');
						$form_confirm_email.attr('action', action);
						$form_confirm_email.trigger('submit');
					});

				} else if (!usu) {
					$form_create_admin.find('.user').removeClass('is-valid').addClass('is-invalid');
					swal({
						type: 'error',
						title: 'Error',
						text: 'El nombre de usuario ya está en uso'
					});
				} else if (!ced) {
					$form_create_admin.find('.id').removeClass('is-valid').addClass('is-invalid');
					swal({
						type: 'error',
						title: 'Error',
						text: 'La cedula introducida ya está en uso'
					});
				} else if (!cor) {
					$form_create_admin.find('.mail').removeClass('is-valid').addClass('is-invalid');
					swal({
						type: 'error',
						title: 'Error',
						text: 'El correo introducido ya está en uso'
					});
				}
			});
		}
	});

	$form_edit_user.submit(function (event) {
		event.preventDefault();

		$input = $form_edit_user.find('.form-control');
		$input.removeClass('is-invalid');
		$input.removeClass('is-valid');
		$input.parent().find('.invalid-feedback').remove();

		if (validateForm($input)) {

			var user = $form_edit_user.find('input.user').val();
			var isUser = true;
			var ref_administrador = db.ref('admin');

			ref_administrador
				.once('value', function (snaps) {
					if (usuario.usuario !== user) {
						snaps.forEach(function (snap) {
							if (snap.val().username == user) {
								isUser = false;
							}
						})
					}
				}).then(function () {
					if (isUser) {
						ref_administrador
							.once('value', function (snaps) {
								snaps.forEach(function (snap) {
									if (snap.val().cedula == usuario.cedula) {
										snap.ref.update({ username: user })
									}
								});
							}).then(function () {
								signSuccess();
							})
					} else {
						swal({
							type: 'error',
							title: 'Error',
							text: 'El nombre escogido ya está en uso',
							confirmButtonText: 'Aceptar'
						});
					}

				});
		}
	});

	$form_edit_mail.submit(function (event) {
		event.preventDefault();

		$input = $form_edit_mail.find('.form-control');
		$input.removeClass('is-invalid');
		$input.removeClass('is-valid');
		$input.parent().find('.invalid-feedback').remove();

		if (validateForm($input)) {

			var correo = $form_edit_mail.find('input.mail').val();
			var isCorreo = true;
			var ref_administrador = db.ref('admin');

			ref_administrador
				.once('value', function (snaps) {
					if (usuario.correo != correo) {
						snaps.forEach(function (snap) {
							if (snap.val().correo == correo) {
								isCorreo = false;
							}
						});
					}
				})
				.then(function () {
					if (isCorreo) {
						ref_administrador
							.once('value', function (snaps) {
								snaps.forEach(function (snap) {
									if (snap.val().cedula == usuario.cedula) {
										console.log(correo);
										snap.ref.update({ correo: correo });
									}
								});
							}).then(function () {
								signSuccess();
							});
					} else {
						swal({
							type: 'error',
							title: 'Error',
							text: 'El correo escogido ya está en uso',
							confirmButtonText: 'Aceptar'
						});
					}
				});
		}
	});

	$form_edit_id.submit(function (event) {
		event.preventDefault();

		$input = $form_edit_id.find('.form-control');
		$input.removeClass('is-invalid');
		$input.removeClass('is-valid');
		$input.parent().find('.invalid-feedback').remove();

		if (validateForm($input)) {

			var cedula = $form_edit_id.find('input.id').val();
			var isCedula = true;
			var ref_administrador = db.ref('admin');

			ref_administrador
				.once('value', function (snaps) {
					if (usuario.cedula != cedula) {
						snaps.forEach(function (snap) {
							if (snap.val().cedula == cedula) {
								isCedula = false;
							}
						})
					}
				})
				.then(function () {
					if (isCedula) {
						ref_administrador
							.once('value', function (snaps) {
								snaps.forEach(function (snap) {
									if (snap.val().cedula == usuario.cedula) {
										snap.ref.update({ cedula: cedula })
									}
								});
							}).then(function () {
								signSuccess();
							})
					} else {
						swal({
							type: 'error',
							title: 'Error',
							text: 'La cedula escogida ya está en uso',
							confirmButtonText: 'Aceptar'
						});
					}
				})
		}
	});

	$form_edit_pass.submit(function (event) {
		event.preventDefault();

		filled = true;

		$form_edit_pass.find('.form-control').each(function (index, element) {
			$input = $(element);
			$input.removeClass('is-invalid');
			$input.removeClass('is-valid');
			$input.parent().find('.invalid-feedback').remove();

			if (!validateForm($input)) {
				filled = false;
			}
		});

		pass = $form_edit_pass.find('.pass').val();
		rpass = $form_edit_pass.find('.r-pass').val();

		if (!filled) {
			emptyFields();
		} else if (pass !== rpass) {
			$form_create_admin.find('input[type="password"]').addClass('is-invalid');
			equalPasswords();
		} else {

			var oldPass = $form_edit_pass.find('input.o-pass').val();
			var newPass = $form_edit_pass.find('input.pass').val();
			var isPass = false;
			ref_administrador = db.ref("admin");

			ref_administrador
				.once('value', function (snaps) {
					snaps.forEach(function (snap) {
						if (snap.val().cedula == usuario.cedula) {
							if (snap.val().password == oldPass) {
								snap.ref.update({ password: newPass })
								isPass = true;
							}
						}
					});
				}).then(function () {
					if (isPass) {
						signSuccess();
					} else {
						swal({
							type: 'error',
							title: 'Error',
							text: 'La contraseña actual no es la correcta'
						})
					}
				});
		}
	});

	/*$('#close-account').click(function(event) {
		swal({
			title: '¿Está seguro?',
			text: "Una vez cierre su cuenta, no podra volver a acceder",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#0B3C5D',
			cancelButtonColor: '#B82601',
			confirmButtonText: 'Eliminar'
		}).then(function () {

		});
	});*/

	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			$('#logo').attr('src', 'img/loader.gif');
			reader.onload = function (e) {
				db.ref('imagen')
					.once('value', function (imagen) {
						imagen.ref.update({
							src: e.target.result
						});
					})
					.then(function () {
						var src = "";

						$('#logo').attr('src', e.target.result);
					});
			}

			reader.readAsDataURL(input.files[0]);
		}
	}

	function refreshLogo() {
		var src = "";
		db.ref('imagen')
			.once('value', function (imagen) {
				$('#logo').attr('src', imagen.val().src);
			});
	}
});

function emptyFields() {
	swal({
		title: 'Error',
		text: 'Algunos campos no se han llenado correctamente',
		type: 'error'
	});
}

function emptySchedule() {
	swal({
		title: 'Error',
		text: 'No puede dejar a un profesor sin horario',
		type: 'error'
	});
}

function equalPasswords() {
	swal({
		title: 'Error',
		text: 'Las contraseñas no coinciden',
		type: 'error'
	});
}

function signSuccess() {
	swal({
		title: 'Datos almacenados',
		type: 'success'
	}).then(function () {
		location.reload();
	});
}

function isName(word) {

	var name = true;

	for (var i = 0; i < word.length; i++) {
		var n = word.charCodeAt(i);
		if ((n > 64 && n < 91) || (n > 96 && n < 123) || n == 130 || (n > 159 && n > 164)) {

		} else {
			name = false;
		}
	}

	return name;
}

function isAlphanumeric(word) {

	var username = true;

	for (var i = 0; i < word.length; i++) {
		var n = word.charCodeAt(i);
		if ((n > 64 && n < 91) || (n > 96 && n < 123) || (n > 47 && n < 58)) {

		} else {
			username = false;
		}
	}

	return username;
}

function validateForm($input) {
	var fill = true;
	var nameVal = '<div class="invalid-feedback">El campo solo debe contener caracteres alfabéticos</div>';
	var phoneVal = '<div class="invalid-feedback">Número de telefono no válido</div>';
	var idVal = '<div class="invalid-feedback">Cédula no válida</div>';
	var userVal = '<div class="invalid-feedback">El campo solo debe contener caracteres alfanumericos</div>';
	var passVal = '<div class="invalid-feedback">La contraseña debe contener por lo menos 6 caracteres</div>';

	if (!$input.val()) {
		fill = false;
		$input.addClass('is-invalid');
	} else {
		if ($input.hasClass('name') || $input.hasClass('lastname')) {
			if (!isName($input.val())) {
				$input.addClass('is-invalid');
				$input.parent().append(nameVal);
				fill = false;
			} else {
				$input.addClass('is-valid');
			}
		} else if ($input.hasClass('phone')) {
			if ($input.val().length != 11) {
				$input.addClass('is-invalid');
				$input.parent().append(phoneVal);
				fill = false;
			} else {
				$input.addClass('is-valid');
			}
		} else if ($input.hasClass('id')) {
			if ($input.val().length > 9 || $input.val().length < 7) {
				$input.addClass('is-invalid');
				$input.parent().append(idVal);
				fill = false;
			} else {
				$input.addClass('is-valid');
			}
		} else if ($input.hasClass('user')) {
			if (!isAlphanumeric($input.val())) {
				$input.addClass('is-invalid');
				$input.parent().append(userVal);
				fill = false;
			} else {
				$input.addClass('is-valid');
			}
		} else if ($input.hasClass('pass') || $input.hasClass('r-pass') || $input.hasClass('o-pass')) {
			if (!isAlphanumeric($input.val())) {
				$input.addClass('is-invalid');
				$input.parent().append(userVal);
				fill = false;
			} else if ($input.val().length < 6) {
				$input.addClass('is-invalid');
				$input.parent().append(passVal);
				fill = false;
			}
		} else {
			$input.addClass('is-valid');
		}
	}

	return fill;
}

function fillEditPane($form, empleado) {

	//INFORMACION PERSONAL
	$form.find('.form-control').removeClass('is-valid').removeClass('is-invalid');
	$form.find('.name').attr('value', empleado.val().nombre);
	$form.find('.lastname').attr('value', empleado.val().apellido);
	$form.find('.id').attr('value', empleado.val().cedula);
	$form.find('.phone').attr('value', empleado.val().telefono);
	$form.find('.mail').attr('value', empleado.val().correo);
	$form.find('input[type="checkbox"]').prop('checked', false);
	$form.find('input[type="time"]').attr('value', '');
	$form.find('input[type="time"]').prop('disabled', true);
	//HORARIO
	var horario = empleado.val().horario;
	var $dia;
	if (horario.lunes.bloque_diurno.desde !== "" || horario.lunes.bloque_nocturno.desde !== "") {
		$dia = $form.find('tr.monday');
		$dia.find('input[type="checkbox"]').prop('checked', true);
		$dia.find('.form-control').prop('disabled', false);
		$dia.find('.since-am').attr('value', horario.lunes.bloque_diurno.desde);
		$dia.find('.until-am').attr('value', horario.lunes.bloque_diurno.hasta);
		$dia.find('.since-pm').attr('value', horario.lunes.bloque_nocturno.desde);
		$dia.find('.until-pm').attr('value', horario.lunes.bloque_nocturno.hasta);
	}

	if (horario.martes.bloque_diurno.desde !== "" || horario.martes.bloque_nocturno.desde !== "") {
		$dia = $form.find('tr.tuesday');
		$dia.find('input[type="checkbox"]').prop('checked', true);
		$dia.find('.form-control').prop('disabled', false);
		$dia.find('.since-am').attr('value', horario.martes.bloque_diurno.desde);
		$dia.find('.until-am').attr('value', horario.martes.bloque_diurno.hasta);
		$dia.find('.since-pm').attr('value', horario.martes.bloque_nocturno.desde);
		$dia.find('.until-pm').attr('value', horario.martes.bloque_nocturno.hasta);
	}

	if (horario.miercoles.bloque_diurno.desde !== "" || horario.miercoles.bloque_nocturno.desde !== "") {
		$dia = $form.find('tr.wednesday');
		$dia.find('input[type="checkbox"]').prop('checked', true);
		$dia.find('.form-control').prop('disabled', false);
		$dia.find('.since-am').attr('value', horario.miercoles.bloque_diurno.desde);
		$dia.find('.until-am').attr('value', horario.miercoles.bloque_diurno.hasta);
		$dia.find('.since-pm').attr('value', horario.miercoles.bloque_nocturno.desde);
		$dia.find('.until-pm').attr('value', horario.miercoles.bloque_nocturno.hasta);
	}

	if (horario.jueves.bloque_diurno.desde !== "" || horario.jueves.bloque_nocturno.desde !== "") {
		$dia = $form.find('tr.thursday');
		$dia.find('input[type="checkbox"]').prop('checked', true);
		$dia.find('.form-control').prop('disabled', false);
		$dia.find('.since-am').attr('value', horario.jueves.bloque_diurno.desde);
		$dia.find('.until-am').attr('value', horario.jueves.bloque_diurno.hasta);
		$dia.find('.since-pm').attr('value', horario.jueves.bloque_nocturno.desde);
		$dia.find('.until-pm').attr('value', horario.jueves.bloque_nocturno.hasta);
	}

	if (horario.viernes.bloque_diurno.desde !== "" || horario.viernes.bloque_nocturno.desde !== "") {
		$dia = $form.find('tr.friday');
		$dia.find('input[type="checkbox"]').prop('checked', true);
		$dia.find('.form-control').prop('disabled', false);
		$dia.find('.since-am').attr('value', horario.viernes.bloque_diurno.desde);
		$dia.find('.until-am').attr('value', horario.viernes.bloque_diurno.hasta);
		$dia.find('.since-pm').attr('value', horario.viernes.bloque_nocturno.desde);
		$dia.find('.until-pm').attr('value', horario.viernes.bloque_nocturno.hasta);
	}
}

function teacherInfo($form) {

	var nombre = $form.find('.name').val();
	var apellido = $form.find('.lastname').val();
	var cedula = $form.find('.id').val();
	var correo = $form.find('.mail').val();
	var telefono = $form.find('.phone').val();

	if ($form.find('tr.monday input[type="checkbox"]').is(':checked')) {
		var lunes_since_am = $form.find('.monday').find('.since-am').val();
		var lunes_until_am = $form.find('.monday').find('.until-am').val();
		var lunes_since_pm = $form.find('.monday').find('.since-pm').val();
		var lunes_until_pm = $form.find('.monday').find('.until-pm').val();
	} else {
		var lunes_since_am = "";
		var lunes_until_am = "";
		var lunes_since_pm = "";
		var lunes_until_pm = "";
	}

	if ($form.find('tr.tuesday input[type="checkbox"]').is(':checked')) {
		var martes_since_am = $form.find('.tuesday').find('.since-am').val();
		var martes_until_am = $form.find('.tuesday').find('.until-am').val();
		var martes_since_pm = $form.find('.tuesday').find('.since-pm').val();
		var martes_until_pm = $form.find('.tuesday').find('.until-pm').val();
	} else {
		var martes_since_am = "";
		var martes_until_am = "";
		var martes_since_pm = "";
		var martes_until_pm = "";
	}

	if ($form.find('tr.wednesday input[type="checkbox"]').is(':checked')) {
		var miercoles_since_am = $form.find('.wednesday').find('.since-am').val();
		var miercoles_until_am = $form.find('.wednesday').find('.until-am').val();
		var miercoles_since_pm = $form.find('.wednesday').find('.since-pm').val();
		var miercoles_until_pm = $form.find('.wednesday').find('.until-pm').val();
	} else {
		var miercoles_since_am = "";
		var miercoles_until_am = "";
		var miercoles_since_pm = "";
		var miercoles_until_pm = "";
	}

	if ($form.find('tr.thursday input[type="checkbox"]').is(':checked')) {
		var jueves_since_am = $form.find('.thursday').find('.since-am').val();
		var jueves_until_am = $form.find('.thursday').find('.until-am').val();
		var jueves_since_pm = $form.find('.thursday').find('.since-pm').val();
		var jueves_until_pm = $form.find('.thursday').find('.until-pm').val();
	} else {
		var jueves_since_am = "";
		var jueves_until_am = "";
		var jueves_since_pm = "";
		var jueves_until_pm = "";
	}

	if ($form.find('tr.friday input[type="checkbox"]').is(':checked')) {
		var viernes_since_am = $form.find('.friday').find('.since-am').val();
		var viernes_until_am = $form.find('.friday').find('.until-am').val();
		var viernes_since_pm = $form.find('.friday').find('.since-pm').val();
		var viernes_until_pm = $form.find('.friday').find('.until-pm').val();
	} else {
		var viernes_since_am = "";
		var viernes_until_am = "";
		var viernes_since_pm = "";
		var viernes_until_pm = "";
	}

	var horario = {
		lunes: {
			bloque_diurno: {
				desde: lunes_since_am,
				hasta: lunes_until_am
			},
			bloque_nocturno: {
				desde: lunes_since_pm,
				hasta: lunes_until_pm
			}
		},
		martes: {
			bloque_diurno: {
				desde: martes_since_am,
				hasta: martes_until_am
			},
			bloque_nocturno: {
				desde: martes_since_pm,
				hasta: martes_until_pm
			}
		},
		miercoles: {
			bloque_diurno: {
				desde: miercoles_since_am,
				hasta: miercoles_until_am
			},
			bloque_nocturno: {
				desde: miercoles_since_pm,
				hasta: miercoles_until_pm
			}
		},
		jueves: {
			bloque_diurno: {
				desde: jueves_since_am,
				hasta: jueves_until_am
			},
			bloque_nocturno: {
				desde: jueves_since_pm,
				hasta: jueves_until_pm
			}
		},
		viernes: {
			bloque_diurno: {
				desde: viernes_since_am,
				hasta: viernes_until_am
			},
			bloque_nocturno: {
				desde: viernes_since_pm,
				hasta: viernes_until_pm
			}
		}
	}

	var empleado = {
		nombre: nombre,
		apellido: apellido,
		cedula: cedula,
		correo: correo,
		telefono: telefono,
		horario: horario
	};

	return empleado;
}
