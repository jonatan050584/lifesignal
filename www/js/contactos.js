var Contactos = function(){
	this.dom = $("#contactos");
	this.titulo = "Agregar Contacto";

	this.listar = function(){
		var options      = new ContactFindOptions();
		options.filter   = "";
		options.multiple = true;
		//options.desiredFields = [navigator.contacts.fieldType.id];
		//var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
		navigator.contacts.find(['displayName', 'name','phoneNumbers'], function(res){
			console.log(res);
			alert('Found ' + res.length + ' contacts.');
			$.each(res,function(key,val){
				if(val.phoneNumbers!=null){

					var it = new ItemContacto(val);
					$("#contactos .lista").append(it.html);

				}
			});
		}, function(e){
			console.log(error);
			//alert('Error');
		}, options);
	}



}
Contactos.prototype = new Seccion();


var ItemContacto = function(d){
	this.html = $(lib.ItemGrupo);
	this.html.find('.nom').html(d.displayName);
	this.html.find('.tel').html(d.phoneNumbers[0].value);
}