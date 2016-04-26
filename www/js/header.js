var Header = function(){



	this.cargarInvitaciones = function(){
		request("grupo/listarinvitaciones",{
			id:usuario.id
		},function(lista){
			invitaciones.lista = lista;
			if(lista.length>0){
				$("#header .invitations .num").html(lista.length);
				$("#header .invitations .num").show();
			}else{
				$("#header .invitations .num").hide();
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
	})
}