var Home = function(){

	if(production==true){
		facebookConnectPlugin.getLoginStatus(function(obj){
			console.log(obj);
			if(obj.status == "connected"){
				facebookConnectPlugin.api("/me?fields=email,first_name,last_name", null, function(res){
					console.log(res);
					/*usuario = new Usuario();
					usuario.fid = res.id;
					usuario.first_name = res.first_name;
					usuario.last_name = res.last_name;
					usuario.email = res.email;*/



				}, function(e){
					console.log(e);
				});
			}
		}, function(err){
			console.log(err);
		});
	}

	new Boton($("#home .bt.comenzar"),function(obj){
		$("#home .logo").addClass("short");
		$("#home .inicio").hide();
		$("#home .login").css('display',"block");
        $("#home .login").transition({opacity:0},0);
        $("#home .login").transition({opacity:1});
	});

	new Boton($("#home .bt.fb"),function(){
		facebookConnectPlugin.login(["public_profile", "email"],function(obj){
			if(obj.status == "connected"){
				facebookConnectPlugin.api("/me?fields=email,first_name,last_name,gender", null, function(res){
					console.log(res);
				}, function(e){
					console.log(e);
				});
			}
		}, function(err){
			console.log(err);
		})
	})

}