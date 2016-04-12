var Home = function(){

	facebookConnectPlugin.getLoginStatus(function(obj){
		console.log(obj);
		if(obj.status == "connected"){
			facebookConnectPlugin.api("/me?fields=email,first_name,last_name,gender", null, function(res){
				console.log(res);
			}, function(e){
				console.log(e);
			});
		}
	}, function(err){
		console.log(err);
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