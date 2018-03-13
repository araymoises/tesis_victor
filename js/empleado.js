
$(function() {
	var ref = firebase.database().ref("empleado");
	var $teachers;

	$('#teacher-tab').on('click', function(){
		$('table#teachers').find('tbody').html('');
		ref.endAt("pterodactyl").once("value")
		.then(function(empleados) {
			if(empleados){

				empleados.forEach(function(empleado){
					$('table#teachers').find('tbody').append('<tr><td>' + empleado.val().nombre + ' ' + empleado.val().apellido + '</td><td>' + empleado.val().cedula + '</td><td>' + empleado.val().correo + '</td><td>' + empleado.val().telefono + '</td></tr>')
				});
			}else{
				$('table#teachers').find('tbody').append('<tr><td>No hay empleados creados.<td></tr>')
			}
			$teachers = $('#teachers').DataTable({
				dom: 'Bflrtip',
				select: true,
				buttons: [
				{
					extend: 'selected',
					text: 'Ver horario',
					action: function(e, dt, node, config) {
						var cedula = dt.row({selected: true}).data()[1];
						var horario;

						ref.once('value')
						.then(function(snaps) {
							snaps.forEach(function(snap) {
								if(snap.val().cedula == cedula) {
									horario = snap.val().horario;
								}
							});
						})
						.then(function() {
							var table = template
							.replace(':lunes-am-desde:', horario.lunes.bloque_diurno.desde)
							.replace(':lunes-am-hasta:', horario.lunes.bloque_diurno.hasta)
							.replace(':lunes-pm-desde:', horario.lunes.bloque_nocturno.desde)
							.replace(':lunes-pm-hasta:', horario.lunes.bloque_nocturno.hasta)
							.replace(':martes-am-desde:', horario.martes.bloque_diurno.desde)
							.replace(':martes-am-hasta:', horario.martes.bloque_diurno.hasta)
							.replace(':martes-pm-desde:', horario.martes.bloque_nocturno.desde)
							.replace(':martes-pm-hasta:', horario.martes.bloque_nocturno.hasta)
							.replace(':miercoles-am-desde:', horario.miercoles.bloque_diurno.desde)
							.replace(':miercoles-am-hasta:', horario.miercoles.bloque_diurno.hasta)
							.replace(':miercoles-pm-desde:', horario.miercoles.bloque_nocturno.desde)
							.replace(':miercoles-pm-hasta:', horario.miercoles.bloque_nocturno.hasta) 
							.replace(':jueves-am-desde:', horario.jueves.bloque_diurno.desde)
							.replace(':jueves-am-hasta:', horario.jueves.bloque_diurno.hasta)
							.replace(':jueves-pm-desde:', horario.jueves.bloque_nocturno.desde)
							.replace(':jueves-pm-hasta:', horario.jueves.bloque_nocturno.hasta)
							.replace(':viernes-am-desde:', horario.viernes.bloque_diurno.desde)
							.replace(':viernes-am-hasta:', horario.viernes.bloque_diurno.hasta)
							.replace(':viernes-pm-desde:', horario.viernes.bloque_nocturno.desde)
							.replace(':viernes-pm-hasta:', horario.viernes.bloque_nocturno.hasta);

							swal({
								title: 'Horario',
								html: table,
								confirmButtonText: 'Aceptar',
								width: 700
							})
						});
					}
				}
				]
			});
		});
	});
});

var template = 
'<table class="table table-bordered table-responsive">'+
'<thead class="thead-inverse table-bord">'+
'<tr>'+
'<th colspan="2"></th>'+
'<th colspan="4">Horario matutino</th>'+
'<th colspan="4">Horario diurno</th>'+
'</tr>'+
'<tr>'+
'<th colspan="2">Días</th>'+
'<th colspan="2">Desde</th>'+
'<th colspan="2">Hasta</th>'+
'<th colspan="2">Desde</th>'+
'<th colspan="2">Hasta</th>'+
'</tr>'+
'</thead>'+
'<tbody class="not-bordered">'+
'<tr>'+
'<td colspan="2">'+
'Lunes'+
'</td>'+
'<td colspan="2">'+
':lunes-am-desde:'+
'</td>'+
'<td colspan="2">'+
':lunes-am-hasta:'+
'</td>'+
'<td colspan="2">'+
':lunes-pm-desde:'+
'</td>'+
'<td colspan="2">'+
':lunes-pm-hasta:'+
'</td>'+
'</tr>'+
'<tr>'+
'<td colspan="2">'+
'Martes'+
'</td>'+
'<td colspan="2">'+
':martes-am-desde:'+
'</td>'+
'<td colspan="2">'+
':martes-am-hasta:'+
'</td>'+
'<td colspan="2">'+
':martes-pm-desde:'+
'</td>'+
'<td colspan="2">'+
':martes-pm-hasta:'+
'</td>'+
'</tr>'+
'<tr>'+
'<td colspan="2">'+
'Miercoles'+
'</td>'+
'<td colspan="2">'+
':miercoles-am-desde:'+
'</td>'+
'<td colspan="2">'+
':miercoles-am-hasta:'+
'</td>'+
'<td colspan="2">'+
':miercoles-pm-desde:'+
'</td>'+
'<td colspan="2">'+
':miercoles-pm-hasta:'+
'</td>'+
'</tr>'+
'<tr>'+
'<td colspan="2">'+
'Jueves'+
'</td>'+
'<td colspan="2">'+
':jueves-am-desde:'+
'</td>'+
'<td colspan="2">'+
':jueves-am-hasta:'+
'</td>'+
'<td colspan="2">'+
':jueves-pm-desde:'+
'</td>'+
'<td colspan="2">'+
':jueves-pm-hasta:'+
'</td>'+
'</tr>'+
'<tr>'+
'<td colspan="2">'+
'Viernes'+
'</td>'+
'<td colspan="2">'+
':viernes-am-desde:'+
'</td>'+
'<td colspan="2">'+
':viernes-am-hasta:'+
'</td>'+
'<td colspan="2">'+
':viernes-pm-desde:'+
'</td>'+
'<td colspan="2">'+
':viernes-pm-hasta:'+
'</td>'+
'</tr>'+
'</tbody>'+
'</table>';