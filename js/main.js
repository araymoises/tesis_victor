$(function(){
  var ref_admin = firebase.database().ref("admin");

  $('.horario-docente').find('input[type=time]').focusout(function(){
    var tiempo = $(this).val();
    if(tiempo){
      var hora = tiempo.split(':')[0];
      var minuto = tiempo.split(':')[1];
      if(parseInt(hora) > 12){
        hora = (parseInt(hora)-12);
        if(hora.toString().length == 1)
          hora = '0' + hora.toString();
      }
      tiempo = hora + ':' + minuto;
      $(this).val(tiempo);
    }
  });

  $('#close-account').click(function(event) {
		swal({
			title: '¿Está seguro?',
			text: "Una vez cierre su cuenta, no podra volver a acceder",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#0B3C5D',
			cancelButtonColor: '#B82601',
			confirmButtonText: 'Eliminar'
		}).then(function () {
      var id_admin = $('#config-admin').find('#id-admin').val();
      console.log(id_admin);
      ref_admin.child(id_admin).remove().then(function() {
        window.location.href = "logout.php";
      });
		});
	});
});
