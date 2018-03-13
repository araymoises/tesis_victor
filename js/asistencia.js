$(function() {
	var db = firebase.database();
	var ref_empleado = db.ref("empleado");
	var ref_registro = db.ref("registro");
  var cedula = $('#carnet').find('.cedula');
	var day = new Array(7);
		day[0] = "domingo";
		day[1] = "lunes";
		day[2] = "martes";
		day[3] = "miercoles";
		day[4] = "jueves";
		day[5] = "viernes";
		day[6] = "sabado";


	$('#carnet').find('.cedula').keyup(function(e) {
    var encontrado = false;
		var empleado_encontrado;
    key = e.which;
    if(key == 13) e.preventDefault();
    if(key == 32 || key == 13 || key == 188 || key == 186){
      if( (cedula.val().length >= 7 && cedula.val().length <= 8)){
        ref_empleado.once("value")
          .then(function(empleados){
            empleados.forEach(function(empleado){
              if(cedula.val() == empleado.val().cedula){
								empleado_encontrado = empleado;
                encontrado = true;
                return false;
              }
            });
          })
          .then(function(){
						$('.color-container').css('opacity', '0.2');
						$('.color-container').find('span').text('');
            if(encontrado){

							var fecha = new Date();
							var actualDay = fecha.getDay();
							var actualHour = fecha.getHours();
							if (actualDay > 0 && actualDay < 6) {
								$('.carnet-info').find('span.name').find('b').text(empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido);
								$('.carnet-info').find('span.id').find('b').text(empleado_encontrado.toJSON().cedula);
								$('.carnet-info').find('span.phone').find('b').text(empleado_encontrado.toJSON().telefono);
								swal({
								  text: "¿El empleado está entrando o saliendo?",
								  type: 'warning',
								  showCancelButton: true,
								  confirmButtonText: 'Entrada',
								  cancelButtonText: '&nbsp;Salida&nbsp;',
								  confirmButtonClass: 'btn btn-success',
								  cancelButtonClass: 'btn btn-danger',
								  buttonsStyling: false
								}).then(function () {
									if(actualHour < 12){
										console.log(fecha.getHours()+':'+fecha.getMinutes());
										console.log(empleado_encontrado.toJSON().horario[day[actualDay]].bloque_diurno.desde);
										var difference = Date.parse('March 21, 2012 ' + fecha.getHours()+':'+fecha.getMinutes()) - Date.parse('March 21, 2012 ' + empleado_encontrado.toJSON().horario[day[actualDay]].bloque_diurno.desde)
										difference = ((difference/1000)/60);
										if(difference >= -60 && difference < -30){
											$('.color-container.green').find('span').text('¡Ha llegado temprano!');
											$('.color-container.green').css('opacity', '1');
											ref_registro.push({
												nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
												cedula     : empleado_encontrado.toJSON().cedula,
												fecha      : fecha.getHours() + ':' + fecha.getMinutes() + 'AM',
												accion     : 'Entrada',
												observacion: "Llegó temprano."
											});
										}else if (difference >= -60 && difference <= 15) {
											$('.color-container.blue').find('span').text('Ha llegado puntual.');
											$('.color-container.blue').css('opacity', '1');
											ref_registro.push({
												nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
												cedula     : empleado_encontrado.toJSON().cedula,
												fecha      : fecha.getHours() + ':' + fecha.getMinutes() + 'AM',
												accion     : 'Entrada',
												observacion: "Llegó puntual."
											});
										}else if (difference > 15) {
											$('.color-container.yellow').find('span').text('Ha llegado tarde.');
											$('.color-container.yellow').css('opacity', '1');
											ref_registro.push({
												nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
												cedula     : empleado_encontrado.toJSON().cedula,
												fecha      : fecha.getHours() + ':' + fecha.getMinutes() + 'AM',
												accion     : 'Entrada',
												observacion: "Llegó tarde."
											});
										}else{
											$('.color-container.orange').find('span').text('Ha llegado fuera de su horario.');
											$('.color-container.orange').css('opacity', '1');
											ref_registro.push({
												nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
												cedula     : empleado_encontrado.toJSON().cedula,
												fecha      : fecha.getHours() + ':' + fecha.getMinutes() + 'AM',
												accion     : 'Entrada',
												observacion: "Llegó fuera de horario."
											});
										}
										console.log(difference);
										console.log(empleado_encontrado.toJSON().horario[day[actualDay]].bloque_diurno);
										console.log(jQuery.isEmptyObject(empleado_encontrado.toJSON().horario[day[actualDay]].bloque_diurno.desde));
									}else{
										console.log((fecha.getHours() - 12)+':'+fecha.getMinutes());
										console.log(empleado_encontrado.toJSON().horario[day[actualDay]].bloque_nocturno.desde);
										var difference = Date.parse('March 21, 2012 ' + (fecha.getHours() - 12)+':'+fecha.getMinutes()) - Date.parse('March 21, 2012 ' + empleado_encontrado.toJSON().horario[day[actualDay]].bloque_nocturno.desde)
										difference = ((difference/1000)/60);
										if(difference >= -60 && difference < -30){
											$('.color-container.green').find('span').text('¡Ha llegado puntual!');
											$('.color-container.green').css('opacity', '1');
											ref_registro.push({
												nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
												cedula     : empleado_encontrado.toJSON().cedula,
												fecha      : (fecha.getHours() - 12) + ':' + fecha.getMinutes() + 'PM',
												accion     : 'Entrada',
												observacion: "Llegó temprano."
											});
										}else if (difference >= -60 && difference <= 15) {
											$('.color-container.blue').find('span').text('Ha llegado puntual.');
											$('.color-container.blue').css('opacity', '1');
											ref_registro.push({
												nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
												cedula     : empleado_encontrado.toJSON().cedula,
												fecha      : (fecha.getHours() - 12) + ':' + fecha.getMinutes() + 'PM',
												accion     : 'Entrada',
												observacion: "Llegó puntual."
											});
										}else if (difference > 15 && difference <= 60) {
											$('.color-container.yellow').find('span').text('Ha llegado tarde.');
											$('.color-container.yellow').css('opacity', '1');
											ref_registro.push({
												nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
												cedula     : empleado_encontrado.toJSON().cedula,
												fecha      : (fecha.getHours() - 12) + ':' + fecha.getMinutes() + 'PM',
												accion     : 'Entrada',
												observacion: "Llegó tarde."
											});
										}else{
											$('.color-container.orange').find('span').text('Ha llegado fuera de su horario.');
											$('.color-container.orange').css('opacity', '1');
											ref_registro.push({
												nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
												cedula     : empleado_encontrado.toJSON().cedula,
												fecha      : (fecha.getHours() - 12) + ':' + fecha.getMinutes() + 'PM',
												accion     : 'Entrada',
												observacion: "Llegó fuera de horario."
											});
										}
										console.log(difference);
										console.log(empleado_encontrado.toJSON().horario[day[actualDay]].bloque_nocturno);
										console.log(jQuery.isEmptyObject(empleado_encontrado.toJSON().horario[day[actualDay]].bloque_nocturno.desde));
									}
								}, function (dismiss) {
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////
								  if (dismiss === 'cancel') {
										$('.color-container').css('opacity', '0.2');
										if(actualHour < 12){
											console.log(fecha.getHours()+':'+fecha.getMinutes());
											console.log(empleado_encontrado.toJSON().horario[day[actualDay]].bloque_diurno.hasta);
											var difference = Date.parse('March 21, 2012 ' + fecha.getHours()+':'+fecha.getMinutes()) - Date.parse('March 21, 2012 ' + empleado_encontrado.toJSON().horario[day[actualDay]].bloque_diurno.hasta)
											difference = ((difference/1000)/60);
											if(difference >= 5 && difference <= 60){
												$('.color-container.green').find('span').text('¡Ha salido tarde!');
												$('.color-container.green').css('opacity', '1');
												ref_registro.push({
													nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
													cedula     : empleado_encontrado.toJSON().cedula,
													fecha      : fecha.getHours() + ':' + fecha.getMinutes() + 'AM',
													accion     : 'Salida',
													observacion: "Salió tarde."
												});
											}else if (difference >= -15 && difference <= 4) {
												$('.color-container.blue').find('span').text('Ha salido puntual.');
												$('.color-container.blue').css('opacity', '1');
												ref_registro.push({
													nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
													cedula     : empleado_encontrado.toJSON().cedula,
													fecha      : fecha.getHours() + ':' + fecha.getMinutes() + 'AM',
													accion     : 'Salida',
													observacion: "Salió puntual."
												});
											}else if (difference < -15) {
												$('.color-container.yellow').find('span').text('Ha salido temprano.');
												$('.color-container.yellow').css('opacity', '1');
												ref_registro.push({
													nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
													cedula     : empleado_encontrado.toJSON().cedula,
													fecha      : fecha.getHours() + ':' + fecha.getMinutes() + 'AM',
													accion     : 'Salida',
													observacion: "Salió temprano."
												});
											}else{
												$('.color-container.orange').find('span').text('Ha salido fuera de su horario.');
												$('.color-container.orange').css('opacity', '1');
												ref_registro.push({
													nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
													cedula     : empleado_encontrado.toJSON().cedula,
													fecha      : fecha.getHours() + ':' + fecha.getMinutes() + 'AM',
													accion     : 'Salida',
													observacion: "Llegó fuera de horario."
												});
											}
											console.log(difference);
											console.log(empleado_encontrado.toJSON().horario[day[actualDay]].bloque_diurno);
											console.log(jQuery.isEmptyObject(empleado_encontrado.toJSON().horario[day[actualDay]].bloque_diurno.hasta));
										}else{
											console.log((fecha.getHours() - 12)+':'+fecha.getMinutes());
											console.log(empleado_encontrado.toJSON().horario[day[actualDay]].bloque_nocturno.hasta);
											var difference = Date.parse('March 21, 2012 ' + (fecha.getHours() - 12)+':'+fecha.getMinutes()) - Date.parse('March 21, 2012 ' + empleado_encontrado.toJSON().horario[day[actualDay]].bloque_nocturno.hasta)
											difference = ((difference/1000)/60);
											if(difference >= 5 && difference <= 60){
												$('.color-container.green').find('span').text('¡Ha salido tarde!');
												$('.color-container.green').css('opacity', '1');
												ref_registro.push({
													nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
													cedula     : empleado_encontrado.toJSON().cedula,
													fecha      : (fecha.getHours() - 12) + ':' + fecha.getMinutes() + 'PM',
													accion     : 'Salida',
													observacion: "Llegó temprano."
												});
											}else if (difference >= -15 && difference <= 4) {
												$('.color-container.blue').find('span').text('Ha salido puntual.');
												$('.color-container.blue').css('opacity', '1');
												ref_registro.push({
													nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
													cedula     : empleado_encontrado.toJSON().cedula,
													fecha      : (fecha.getHours() - 12) + ':' + fecha.getMinutes() + 'PM',
													accion     : 'Salida',
													observacion: "Llegó puntual."
												});
											}else if (difference < -15) {
												$('.color-container.yellow').find('span').text('Ha salido temprano.');
												$('.color-container.yellow').css('opacity', '1');
												ref_registro.push({
													nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
													cedula     : empleado_encontrado.toJSON().cedula,
													fecha      : (fecha.getHours() - 12) + ':' + fecha.getMinutes() + 'PM',
													accion     : 'Salida',
													observacion: "Salió temprano."
												});
											}else{
												$('.color-container.orange').find('span').text('Ha salido fuera de su horario.');
												$('.color-container.orange').css('opacity', '1');
												ref_registro.push({
													nombre     : empleado_encontrado.toJSON().nombre + ' ' + empleado_encontrado.toJSON().apellido,
													cedula     : empleado_encontrado.toJSON().cedula,
													fecha      : (fecha.getHours() - 12) + ':' + fecha.getMinutes() + 'PM',
													accion     : 'Salida',
													observacion: "Salió fuera de horario."
												});
											}
											console.log(difference);
											console.log(empleado_encontrado.toJSON().horario[day[actualDay]].bloque_nocturno);
											console.log(jQuery.isEmptyObject(empleado_encontrado.toJSON().horario[day[actualDay]].bloque_nocturno.hasta));
										}
								  }
								});
								console.log(day[actualDay]);

								//day[actualDay]
								//$('.color-container.blue').removeClass('blue');
								//$('.color-container.blue').addClass('animated bounce');
							}else {
								swal(
								  'Acceso denegado',
								  'No se permite el acceso los fines de semana.',
								  'error'
								)
							}
						}else{
							$('.color-container.red').find('span').text('Empleado no encontrado.');
							$('.color-container.red').css('opacity', '1');
            }
          })
          .then(function(){
            cedula.val('');
          });
      }else{
				$('#carnet').find('.cedula').val('');
			}
    }
	});
})
