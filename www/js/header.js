var Header = function(){


	this.mostrar = function(botones,titulo){
		$("#header").show();
		$("#header .btn").hide();
		if(botones!=undefined){
			var btns = botones.split(",");
			$.each(btns,function(k,v){
				$("#header .btn."+v).show();
			})
		}
		if(titulo!=undefined){
			$("#header .titulo").html(titulo);
			$("#header").addClass("nologo");
		}else{
			$("#header .titulo").html("");
			$("#header").removeClass("nologo");
		}
		

	}

	this.setButton = function(nom,callback){
		$("#header .btn."+nom).unbind();
		new Boton($("#header .btn."+nom),callback);
	}



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