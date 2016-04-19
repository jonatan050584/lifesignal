var Contactos = function(){
	this.dom = $("#contactos");
	this.titulo = "Agregar Contacto";
	this.flag=false;
	var validos = new Array();

	this.listar = function(){
		$("#contactos .lista").html("Listando contactos...");
		if(!this.flag){
			//this.flag=true;

			var options      = new ContactFindOptions();
			options.filter   = "";
			options.multiple = true;
			//options.desiredFields = [navigator.contacts.fieldType.id];
			//var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
			navigator.contacts.find(['displayName', 'name','phoneNumbers'], function(res){
				
				
				//alert('Found ' + res.length + ' contacts.');

				alert(JSON.stringify(res));

				$.each(res,function(key,val){
					if(val.phoneNumbers!=null && (val.displayName!=null || val.name.formatted!="")){

						var tel = val.phoneNumbers[0].value;

						tel = tel.replace("+51","");
						var arrtel = tel.split(" ");
						tel = arrtel.join("");

						val.phoneNumbers[0].value = tel;

						validos.push(tel);
					}
				});
				console.log("validos");
				console.log(validos);

				request("usuario/validarexisten",{
					lista : validos.join(",")
				},function(existen){
					console.log("existen");
					console.log(existen);

					$("#contactos .lista").empty();
					console.log(res);
					
					$.each(res,function(key,val){
						if(val.phoneNumbers!=null && (val.displayName!=null || val.name.formatted!="")){
							var t = val.phoneNumbers[0].value;
							$.each(existen,function(k,v){
								if(v.telefono==t){
									var it = new ItemContacto(val,v.id);
									$("#contactos .lista").append(it.html);
								}
							})
						}

					})

				})


			}, function(e){
				console.log(error);
				//alert('Error');
			}, options);
		}
	}



}
Contactos.prototype = new Seccion();


var ItemContacto = function(d,id){
	this.html = $(lib.ItemContacto);
	var nom = d.displayName;
	if(nom==null) nom = d.name.formatted;

	this.html.find('.nom').html(d.displayName);
	this.html.find('.tel').html(d.phoneNumbers[0].value);

	new Boton(this.html,function(){

		request("grupo/agregarmiembro",{
			grupo:internagrupo.id,
			contacto:id
		},function(res){
			getContent({page:"internagrupo",grupo:internagrupo.id},true);
		})

		
	})
}