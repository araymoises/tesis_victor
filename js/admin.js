$(function() {
	var ref = firebase.database().ref("admin");
	$('#admin-tab').on('click', function(){
		$('table#admins').find('tbody').html('');
    ref.endAt("pterodactyl").once("value")
			.then(function(admins) {
        if(admins){
          admins.forEach(function(admin){
            $('table#admins').find('tbody').append('<tr><td>' + (admin.val().tipo_admin == 1 ? 'Súper Admin' : 'Admin') + '</td><td>' + admin.val().cedula + '</td><td>' + admin.val().username + '</td><td>' + admin.val().correo + '</td></tr>')
          });
        }else{
          $('table#admins').find('tbody').append('<tr><td>No hay administradores creados.<td></tr>')
        }
				$('#admins').DataTable();
			});
	});
});
