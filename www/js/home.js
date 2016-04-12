var Home = function(){

	facebookConnectPlugin.getLoginStatus(function(obj){
		console.log(obj);
	}, function(err){
		console.log(err);
	});

	new Boton($("#home .bt.fb"),function(){
		facebookConnectPlugin.login(["public_profile", "email"],function(obj){
			console.log(obj);
		}, function(err){
			console.log(err);
		})
	})

}