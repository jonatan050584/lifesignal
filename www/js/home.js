var Home = function(){


	new Boton($("#home .bt.fb"),function(){
		facebookConnectPlugin.login('email',function(obj){
			console.log(obj);
		}, function(err){
			console.log(err);
		})
	})

}
var home = new Home();