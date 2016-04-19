var Internagrupo = function(){
	this.dom = $("#internagrupo");
	this.titulo = "Contactos";
	
	new Boton($("#internagrupo .btn.ubicacion"),function(){
		
		getContent({page:"ubicacion"},true);
		
	
	});
	new Boton($("#internagrupo .btn.crear"),function(){
		/*navigator.contacts.pickContact(function(contact){
	        alert(JSON.stringify(contact));
	    },function(err){
	        alert('Error: ' + err);
	    });*/

		

		// find all contacts with 'Bob' in any name field
		var options      = new ContactFindOptions();
		options.multiple = true;
		options.desiredFields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name,navigator.contacts.phoneNumbers];
		//var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name,navigator.contacts.phoneNumbers];
		navigator.contacts.find(['displayName', 'name'], function(res){
			console.log(res);
			alert('Found ' + res.length + ' contacts.');
		}, function(e){
			console.log(error);
			alert('Error');
		}, options);

	})
	this.listarcontactos = function(id){
		
		$("#internagrupo .lista").empty();

		request("grupo/listarmiembros",{
			grupo:id
		},function(res){
			ubicacion.contactos = res;
			$.each(res,function(key,val){
				var it = new ItemContacto(val);
				$("#internagrupo .lista").append(it.html);
			});
		})
	}
}
Internagrupo.prototype = new Seccion();

var ItemContacto = function(d){
	this.html = $(lib.ItemContacto);
	this.html.find('.nom').html(d.nombres+' '+d.apellidos);
	this.html.find('.pic').css("background-image","url('"+d.pic+"')");

	/*new Boton(this.html,function(){
		getContent({page:"internagrupo"},true);
	});*/
}