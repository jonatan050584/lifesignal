var Contactos = function(){
	this.dom = $("#contactos");
	this.titulo = "Agregar Contacto";
	this.flag=false;

	this.lista = new Array();

	var validos = new Array();

	this.listar = function(){
		$("#contactos .lista").html("Listando contactos...");
		if(!this.flag){
			this.flag=true;

			var options      = new ContactFindOptions();
			options.filter   = "";
			options.multiple = true;
			//options.desiredFields = [navigator.contacts.fieldType.id];
			//var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
			navigator.contacts.find(['displayName', 'name','phoneNumbers'], function(res){
				
				
				//alert('Found ' + res.length + ' contacts.');

				//alert(JSON.stringify(res));

				$.each(res,function(key,val){
					if(val.phoneNumbers!=null && (val.displayName!=null || val.name.formatted!="")){

						$.each(val.phoneNumbers,function(k,v){
							var tel = v.value;
							tel = tel.replace("+51","");
							tel = tel.replace(/ /g,"");
							v.value = tel;

							if(tel.length==9){

								var nom = val.displayName;
								if(nom==null) nom = val.name.formatted;

								contactos.lista.push({
									id:null,
									nombre: nom,
									telefono:tel,
									tipo:v.type
								});
								validos.push(tel);
							}

						})

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
					
					$.each(contactos.lista,function(key,val){
						
						var i = contactos.buscar(val.telefono,existen);
						if(i!=-1){
							
							val.id = existen[i].id;
							var it = new ItemContacto(val);
							$("#contactos .lista").append(it.html);
						};

						
						

					});

					$.each(contactos.lista,function(key,val){
						
						var i = contactos.buscar(val.telefono,existen);
						if(i==-1){
							
							var it = new ItemContacto(val);
							$("#contactos .lista").append(it.html);
						};

						
						

					});

				})


			}, function(e){
				console.log(error);
				//alert('Error');
			}, options);
		}
	}

	this.buscar = function(num,arr){
		var res = -1;
		$.each(arr,function(key,val){
			if(val.telefono==num){
				res=key;
			}
		})
		return res;
	}



}
Contactos.prototype = new Seccion();


var ItemContacto = function(d){
	this.html = $(lib.ItemContacto);
	
	if(d.id!=null){
		this.html.addClass("app");
	}

	this.html.find('.nom').html(d.nombre);
	this.html.find('.tel').html(d.telefono);

	new Boton(this.html,function(){

		alert(d.id);

		
	})
}