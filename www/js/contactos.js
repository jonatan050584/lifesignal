var Contactos = function(){
	this.dom = $("#contactos");
	this.titulo = "Agregar Contacto";
	this.flag=false;
	this.validos = new Array();

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
				//console.log(res);
				//alert('Found ' + res.length + ' contacts.');



				$.each(res,function(key,val){
					if(val.phoneNumbers!=null && val.displayName!=null){

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
					lista:validos.join(",");
				},function(existen){
					console.log("existen");
					console.log(existen);

					$("#contactos .lista").empty();

					$.each(res,function(key,val){
						var t = val.phoneNumbers[0].value;
						$.each(existen,function(k,v){
							if(v.telefono==t){
								var it = new ItemContacto(val);
								$("#contactos .lista").append(it.html);
							}
						})

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


var ItemContacto = function(d){
	this.html = $(lib.ItemContacto);
	this.html.find('.nom').html(d.displayName);
	this.html.find('.tel').html(d.phoneNumbers[0].value);
}