var Home = function(){

	this.dom = $("#home");
	this.titulo = "Home";


	new Boton($("#home .bt.comenzar"),function(obj){
		$("#home .logo").addClass("short");
		$("#home .inicio").hide();
		$("#home .login").css('display',"block");
        $("#home .login").transition({opacity:0},0);
        $("#home .login").transition({opacity:1});
        $("#home .bt.comenzar").hide();
        $("#home .noregistro").show();


        
	});

	new Boton($("#home .login .bt.signin"),function(){
		var em = $("#home .login input[name=email]").val();
		var cl = $("#home .login input[name=clave]").val();

		if(em!="" && cl!=""){
			
			request("usuario/login",{
				email:em,
				clave:cl
			},function(res){
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

                    usuario.iniciarSesion();

				}else if(res.res == "error"){
					
					alert("THE EMAIL OR PASSWORD IS INCORRECT");
				}
			})
		}
	})

	new Boton($("#home .login .bt.fb"),function(){
		
		facebook.login(function(conectado){
			console.log("onlogin");
			console.log(conectado);
			if(conectado){
				facebook.myInfo(function(infofb){
                    console.log("infofacebook");
                    console.log(infofb);

                    usuario =  new Usuario();
                    usuario.nombres = infofb.first_name;
                    usuario.apellidos = infofb.last_name;
                    usuario.email = infofb.email;
                    usuario.fbid = infofb.id;
                    usuario.pic = infofb.pic;
                    
                    request("usuario/validarfb",{
                    	fbid:infofb.id,
                    	email:infofb.email
                    },function(res){
                    	if(res.existe){
                    		console.log("iniciar sesion");
                    		console.log(res.info);
                    		usuario.id = res.info.id;
                    		usuario.iniciarSesion();
                    	}else{
                    		$("#home .login").hide();
                    		$("#home .tel").show();
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

		request('usuario/registrar',{
			nombres:usuario.nombres,
			apellidos:usuario.apellidos,
			email:usuario.email,
			clave:null,
			fbid:usuario.fbid,
			pic:usuario.pic,
			telefono:tel
		},function(res){
			if(!res.existe){
				usuario.id = res.id;
				usuario.iniciarSesion();
			}else{
				alert("This phone number is already registered");
			}
		})
	})




}

Home.prototype = new Seccion();