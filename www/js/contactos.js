var Contactos = function(){
	this.dom = $("#contactos");
	this.titulo = "Add Contact";
	this.flag=false;

	this.lista = new Array();

	var validos = new Array();



	new Boton($("#contactos .invitacion .cerrar"),function(){
		$("#contactos .invitacion").hide();
	});


	this.listar = function(){
		console.log(internagrupo.miembros);
		if(!this.flag){
			this.flag=true;
			$("#contactos .lista").html("Listando contactos...");
			
			var options      = new ContactFindOptions();
			options.filter   = "";
			options.multiple = true;
			//options.desiredFields = [navigator.contacts.fieldType.id];
			//var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
			navigator.contacts.find(['displayName', 'name','phoneNumbers'], function(res){
			
			/*$.ajax({
				url:'contactos.json',
				dataType:'json'
			}).done(function(res){	*/
				
				//alert('Found ' + res.length + ' contacts.');

				//console.log(JSON.stringify(res));

				$.each(res,function(key,val){
					if(val.phoneNumbers!=null && (val.displayName!=null || val.name.formatted!="")){

						$.each(val.phoneNumbers,function(k,v){
							var tel = v.value;
							tel = tel.replace("+51","");
							tel = tel.replace(/ /g,"");
							

							if(tel.length==9 && tel.substr(0,1)!="0" && validos.indexOf(tel)==-1){

								var nom = val.displayName;
								if(nom==null) nom = val.name.formatted;

								contactos.lista.push({
									id:null,
									nombre: nom,
									telefono:tel,
									original:v.value,
									tipo:v.type
								});
								validos.push(tel);
							}

						})

					}
				});
				//console.log("validos");
				//console.log(validos);

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
							val.pic = existen[i].id;
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
			//});
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

		
		

		if(d.id!=null){
			$("#contactos .invitacion .nombres").html(d.nombre);
			$("#contactos .invitacion .telefono").html(d.telefono);

			$("#contactos .invitacion").css('display',"block");
	        $("#contactos .invitacion").transition({opacity:0},0);
	        $("#contactos .invitacion").transition({opacity:1});

	        $("#contactos .invitacion .ventana .bt.enviar").unbind();
	        
	        new Boton($("#contactos .invitacion .ventana .bt.enviar"),function(){
	        	var yaesta = false;
	        	$.each(internagrupo.miembros,function(k,v){
	        		if(v.id == d.id){
	        			yaesta=true;
	        		}
	        	})

	        	if(!yaesta){
		        	request("grupo/invitar",{
		        		usuario:usuario.id,
		        		invitado:d.id,
		        		grupo:internagrupo.id
		        	},function(res){
		        		console.log(res);
		        		socket.emit("invitar",d.id);
		        	});
	        	}else{
	        		alert("¡El contacto ya pertenece a este grupo! Selecciona otro");
	        	}


	        	$("#contactos .invitacion").hide();

	        });
		}else{
			window.plugins.socialsharing.shareViaSMS('Prueba LifeSignal para tu smartphone. Visita http://picnic.pe/lifesignal/ para descargarlo',d.original,function(msg){console.log('ok: ' + msg);},function(msg) {alert('error: ' + msg);});
		}
		
	})
}