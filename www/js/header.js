var Header = function(){

	this.setTitulo = function(str){
		$("#header .titulo").html(str);
	}

	new Boton($("#header .logout"),function(){
		usuario.cerrarSesion();
	})
}