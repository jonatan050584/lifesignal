var Menu = function(){
	this.dom = $("#menu");

	this.mostrar = function(){
		$("#header .back").hide();
		$("#header").hide();
		Menu.prototype.mostrar.call(this);
	}

	new Boton($("#menu .btn.cerrar"),function(){
		history.back();
	});

	new Boton($("#menu .salir"),function(){
		new Alerta("¿Desea cerrar sesión?","Salir",function(){
			new Espera("Cerrando sesión...");
			usuario.cerrarSesion();
		})
	});
	new Boton($("#menu .misgrupos"),function(){
		history.back();
	});

	new Boton($("#menu .invitaciones"),function(){
		getContent({page:"invitaciones"},true)
	})
}
Menu.prototype = new Seccion();