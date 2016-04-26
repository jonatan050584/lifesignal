var Contactos = function(){
	this.dom = $("#contactos");
	this.titulo = "Add Contact";
	this.flag=false;

	this.lista = new Array();

	var validos = new Array();



	new Boton($("#contactos .invitacion .cerrar"),function(){
		$("#contactos .invitacion").hide();
	});

	this.mostrar = function(){

		$("#header .titulo").html("Elegir contacto");
		$("#header").addClass("nologo");
		$("#header .btn.addcontact").hide();

		this.listar();
		Contactos.prototype.mostrar.call(this);
	}

	this.listar = function(){
		//console.log(internagrupo.miembros);
		if(!this.flag){
			this.flag=true;
			$("#contactos .lista").html("Listando contactos...");


			if(production){

				var options      = new ContactFindOptions();
				options.filter   = "";
				options.multiple = true;
				
				navigator.contacts.find(['displayName', 'name','phoneNumbers'], this.onContacts, function(e){
					console.log(error);
				}, options);
			}else{

				$.ajax({
					url:'contactos.json',
					dataType:'json'
				}).done(this.onContacts);

			}

			
		}

	}	

	this.onContacts = function(res){

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
					if(val.telefono!=usuario.telefono){
						val.id = existen[i].id;
						val.pic = existen[i].id;
						var it = new ItemContacto(val);
						$("#contactos .lista").append(it.html);
					}
				};

			});

			$.each(contactos.lista,function(key,val){
				
				var i = contactos.buscar(val.telefono,existen);
				if(i==-1){
					if(val.telefono!=usuario.telefono){
						var it = new ItemContacto(val);
						$("#contactos .lista").append(it.html);
					}
					
				};

				
				

			});

		})
	
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
		this.html.addClass("plus");
	}
	var ye=false;
	$.each(internagrupo.miembros,function(k,v){

		if(v.id == d.id){
			ye=true;
		}

	})
	if(ye){
		this.html.removeClass('plus');
		this.html.addClass("check");
	}
	
	this.html.find('.nom').html(d.nombre);
	this.html.find('.tel').html(d.telefono);

	if(!ye){

		new Boton(this.html,function(e){

			
			

			if(d.id!=null){
				new Alerta('¿Deseas agregar a '+d.nombre+' al grupo "'+internagrupo.nombre+'"?',"Agregar",function(){
					var es = new Espera("Enviando notificación...");


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
			        		es.fin();
			        		console.log(res);
			        		socket.emit("invitar",d.id);
			        	});
		        	}else{
		        		es.fin();
		        		new Alerta("¡El contacto ya pertenece a este grupo! Selecciona otro");
		        	}


		        	$("#contactos .invitacion").hide();
				});
				/*$("#contactos .invitacion .nombres").html(d.nombre);
				$("#contactos .invitacion .telefono").html(d.telefono);

				$("#contactos .invitacion").css('display',"block");
		        $("#contactos .invitacion").transition({opacity:0},0);
		        $("#contactos .invitacion").transition({opacity:1});

		        $("#contactos .invitacion .ventana .bt.enviar").unbind();*/
		        
		        new Boton($("#contactos .invitacion .ventana .bt.enviar"),function(){
		        	

		        });
			}else{
				window.plugins.socialsharing.shareViaSMS('Prueba LifeSignal para tu smartphone. Visita http://picnic.pe/lifesignal/ para descargarlo',d.original,function(msg){console.log('ok: ' + msg);},function(msg) {alert('error: ' + msg);});
			}
			
		})
	}
}