var Home = function(){

	this.dom = $("#home");
	this.titulo = "Home";


	new Boton($("#home a.signup"),function(){
		getContent({page:"registro"},true);
	});



	new Boton($("#home .login .bt.signin"),function(){
		var em = $("#home .login input[name=email]").val();
		var cl = $("#home .login input[name=clave]").val();

		if(em!="" && cl!=""){
			var es =  new Espera("Validando...");
			request("usuario/login",{
				email:em,
				clave:cl
			},function(res){
				es.fin();
				if(res.res=="ok"){
					console.log("login ok");
					console.log(res.info);
					console.log("iniciar sesion");

					usuario = new Usuario();
					usuario.nombres = res.info.nombres;
                    usuario.apellidos = res.info.apellidos;
                    usuario.email = res.info.email;
                    usuario.fbid = res.info.fbid;
                    usuario.pic = res.info.pic;
                    usuario.id = res.info.id;
                    usuario.telefono = res.info.telefono;

                    usuario.iniciarSesion();

                    

				}else if(res.res == "error"){
					new Alerta("El email o clave son incorrectos");

					
				}
			},function(){
				es.fin();
				new Alerta("Ocurrió algún tipo de error.<br>Comprueba tu conexión de red o inténtalo de nuevo más tarde.");
			})
		}
	})

	new Boton($("#home .login .bt.fb"),function(){
		var es = new Espera("Validando...");
		facebook.login(function(conectado){
			console.log("onlogin");
			console.log(conectado);
			if(conectado){
				
				es.txt("Obteniendo información del perfil de Facebook...")
				facebook.myInfo(function(infofb){
                    console.log("infofacebook");
                    console.log(infofb);

                    usuario =  new Usuario();
                    usuario.nombres = infofb.first_name;
                    usuario.apellidos = infofb.last_name;
                    usuario.email = infofb.email;
                    usuario.fbid = infofb.id;
                    usuario.pic = infofb.pic;
                    
                    es.txt("Validando usuario...");

                    request("usuario/validarfb",{
                    	fbid:infofb.id,
                    	email:infofb.email
                    },function(res){
                    	es.fin();
                    	if(res.existe){



                    		console.log("iniciar sesion");
                    		console.log(res.info);
                    		usuario.id = res.info.id;
                    		usuario.telefono = res.info.telefono;
                    		usuario.iniciarSesion();
                    	}else{
                    		$("#home .login").hide();
                    		$("#home .tel").show();
                    		$("#home .tel .usuario").html(infofb.first_name+' '+infofb.last_name);
                    		if(infofb.pic!=null) $("#home .tel .pic").css("background-image","url('"+infofb.pic+"')");
                    		$("#home .noregistro").hide();
                    	}
                    })
                })
			}
		})
		
		
	})

	new Boton($("#home .tel .bt.fbsignin"),function(){
		var tel = $("#home .tel input[name=telefono]").val();

		
		if(tel!=""){

			

			if (/^([0-9])*$/.test(tel) && tel.length==9 && tel.substr(0,1)=="9"){


				var es = new Espera("Validando número de teléfono...");



				request('usuario/registrarfb',{
					nombres:usuario.nombres,
					apellidos:usuario.apellidos,
					email:usuario.email,
					clave:null,
					fbid:usuario.fbid,
					pic:usuario.pic,
					telefono:tel
				},function(res){
					es.fin();

					if(!res.existe){
						usuario.id = res.id;
						usuario.telefono = tel;
						usuario.iniciarSesion("nuevo");

					}else{
						new Alerta("Este número de teléfono ya ha sido registrado anteriormente");
					}
				})
			}else{
				new Alerta("Debe ingresar un número de celular válido");
			}
		}

		
	})


	$("#home .sincuenta").css("top",h-30);

}

Home.prototype = new Seccion();