var Header = function(){



	this.cargarInvitaciones = function(){
		request("grupo/listarinvitaciones",{
			id:usuario.id
		},function(lista){
			invitaciones.lista = lista;
			if(lista.length>0){
				$("#header .btn.menu .inv").html(lista.length);
				$("#menu .invitaciones .cant").html(lista.length);
				$("#header .btn.menu .inv").show();
				$("#menu .invitaciones .cant").show();
			}else{
				$("#header .btn.menu .inv").hide();
				$("#menu .invitaciones .cant").hide();
			}
		})
	}

	new Boton($("#header .logout"),function(){
		usuario.cerrarSesion();
	});

	new Boton($("#header .invitations"),function(){
		getContent({page:"invitaciones"},true);
	});
	new Boton($("#header .back"),function(){
		//alert(1);
		history.back();
	});

	new Boton($("#header .btn.add"),function(){

		

		grupos.crear();

		

	});

	new Boton($("#header .btn.addcontact"),function(){
		getContent({page:"contactos"},true);
	});


	new Boton($("#header .btn.menu"),function(){
		getContent({page:"menu"},true);
	})
}