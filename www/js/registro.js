var Registro = function(){
	this.dom = $("#registro");
	this.titulo = "Regístrate";
	this.error = false;



	this.mostrar = function(){
		
		$("#header").show();

		Registro.prototype.mostrar.call(this);
	}

	var validar = function(campo){

		var input = $("#registro input[name="+campo+"]");
		input.removeClass("required");
		if(input.val()==""){
			input.addClass("required");
			registro.error = true;
		}
		return input.val();
	}

	var validarEmail = function(email) {
		var ret = true;
	    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	    if (!expr.test(email)) ret = false;
	    return ret;
	}

	new Boton($("#registro .bt.guardar"),function(){
		registro.error = false;

		var nom = validar("nombres");
		var ape = validar("apellidos");
		var tel = validar("telefono");
		var em = validar("email");
		var cla = validar("clave");
		var recla = validar("reclave");

		if(!registro.error){
			if(validarEmail(em)){

				if(cla.length<8){
					new Alerta("La contraseña debe tener mínimo 8 caracteres");
					$("#registro input[name=clave]").addClass("required");
				}else{
					if(cla!=recla){
						new Alerta("Las contraseñas no coinciden");
						$("#registro input[name=reclave]").addClass("required");
						$("#registro input[name=clave]").addClass("required");
					}
				}

			}else{
				new Alerta("Debe ingresar una dirección de email válida");
				$("#registro input[name=email]").addClass("required");
			}

			
		}

		


		


	});

	
}
Registro.prototype = new Seccion();