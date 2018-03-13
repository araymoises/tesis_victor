$(function() {
	var ref = firebase.database().ref("registro");
  $('#audit-tab').on('click', function(){
    $('table#audits').find('tbody').html('');
    ref.once("value")
			.then(function(registros) {
        if(registros){
          registros.forEach(function(registro){
            if(registro.val().observacion == 'Llegó temprano.' || registro.val().observacion == 'Salió tarde.')
              $('table#audits').find('tbody').append('<tr><td>' + registro.val().nombre + '</td><td>' + registro.val().cedula + '</td><td>' + registro.val().fecha + '</td><td>' + registro.val().accion + '</td><td><span style="margin-right:10px;background-color:#00e600;">&nbsp;&nbsp;&nbsp;&nbsp;</span>' + registro.val().observacion + '</td></tr>')
            else if (registro.val().observacion == 'Llegó puntual.' || registro.val().observacion == 'Salió puntual.') {
              $('table#audits').find('tbody').append('<tr><td>' + registro.val().nombre + '</td><td>' + registro.val().cedula + '</td><td>' + registro.val().fecha + '</td><td>' + registro.val().accion + '</td><td><span style="margin-right:10px;background-color:#1a75ff;">&nbsp;&nbsp;&nbsp;&nbsp;</span>' + registro.val().observacion + '</td></tr>')
            }
            else if (registro.val().observacion == 'Llegó tarde.' || registro.val().observacion == 'Salió temprano.') {
              $('table#audits').find('tbody').append('<tr><td>' + registro.val().nombre + '</td><td>' + registro.val().cedula + '</td><td>' + registro.val().fecha + '</td><td>' + registro.val().accion + '</td><td><span style="margin-right:10px;background-color:#ff0000;">&nbsp;&nbsp;&nbsp;&nbsp;</span>' + registro.val().observacion + '</td></tr>')
            }
            else if (registro.val().observacion == 'Llegó fuera de horario.' || registro.val().observacion == 'Salió fuera de horario.') {
              $('table#audits').find('tbody').append('<tr><td>' + registro.val().nombre + '</td><td>' + registro.val().cedula + '</td><td>' + registro.val().fecha + '</td><td>' + registro.val().accion + '</td><td><span style="margin-right:10px;background-color:#ffb100;">&nbsp;&nbsp;&nbsp;&nbsp;</span>' + registro.val().observacion + '</td></tr>')
            }
          });
        }else{
          $('table#audits').find('tbody').append('<tr><td>No hay registro guardados.<td></tr>')
        }
				$('#audits').DataTable();
			});
  });
});
