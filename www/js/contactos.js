var Contactos = function(){
	this.dom = $("#contactos");

	this.flag=false;

	this.lista = new Array();

	var validos = new Array();

	this.invitados = new Array();

	this.total = 0;

	new Boton($("#contactos .invitacion .cerrar"),function(){
		$("#contactos .invitacion").hide();
	});

	


	$("#contactos .busqueda input[name=buscar]").keyup(function(e){
		var bus = $(this).val().toLowerCase();
		$("#contactos .lista .item").each(function(index){
			var res=false;
			
			var num= $(this).find(".tel").html();

			if(num.substr(0,bus.length)==bus){
				res=true;
			}

			if(!res){
				var nom = $(this).find(".nom").html().toLowerCase();
				var palabra = nom.split(" ");
				
				$.each(palabra,function(k,v){
					if(v.substr(0,bus.length)==bus){
						res=true;
					}
				});
			}


			


			if(res){
				$(this).show();
			}else{
				$(this).hide();
			}

		})
	})

	this.mostrar = function(){

		this.invitados = new Array();

		header.mostrar("back,done",'Elegir contactos<br><span class="sub">'+this.total+' de 10</span>');

		header.setButton("done",this.done);

		this.listar();

		Contactos.prototype.mostrar.call(this);
	}
	this.done = function(){
		var inv = new Array();
		$("#contactos .lista .item").each(function(index){
			if($(this).hasClass("check")){
				inv.push($(this).data("id"));
			}
		});
		if(inv.length>0){
			if(usuario.grupo==null){
				new Request("grupo/crear",{
					llave:usuario.llave,
					invitados:inv.join(",")
				},function(res){
					
					$.each(inv,function(k,v){
						socket.emit("directo",{ac:"invitacion",id:v});
					});

					usuario.setGrupo(res.grupo);
					usuario.setInvitaciones(res.invitados);
					
					getContent({page:"internagrupo"},true);

				},{
					espera:"Creando grupo..."
				})
			}else{
				new Request("grupo/agregarmiembros",{
					usuario:usuario.id,
					grupo:usuario.grupo.id,
					invitados:inv.join(",")
				},function(res){
					$.each(inv,function(k,v){
						socket.emit("directo",{ac:"invitacion",id:v});
					});
					usuario.setInvitaciones(res.invitados);
					getContent({page:"internagrupo"},true);
				})
			}
		}

	
	}

	this.listar = function(){
		//console.log(internagrupo.miembros);
		
			//$("#contactos .lista").html("Listando contactos...");
		var es = new Espera("Listando contactos...");

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

	this.onContacts = function(res){
		
		$.each(res,function(key,val){
			var foto=null;
			

			if(val.photos!=null){
				

				foto = val.photos[0].value;
				
			}

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
							tipo:v.type,
							foto:foto
						});
						validos.push(tel);
					}

				})

			}
		});
		//console.log("validos");
		//console.log(validos);

		new Request("usuario/validarexisten",{
			lista : validos.join(",")
		},function(existen){
			console.log("existen");
			//console.log(existen);

			$("#contactos .lista").empty();
			//console.log(contactos.lista);

			var mi = new Array();
			var inv = new Array();
			if(usuario.miembros!=null){
				$.each(usuario.miembros,function(k,v){
					mi.push(v.id);
				});
			}
			
			var inv = new Array();
			if(usuario.invitaciones!=null){
				$.each(usuario.invitaciones,function(k,v){
					inv.push(v.id);
				});
			}

			$.each(contactos.lista,function(key,val){
				
				var i = contactos.buscar(val.telefono,existen);
				if(i!=-1){
					if(val.telefono!=usuario.telefono){

						if(mi.indexOf(existen[i].id)==-1 && inv.indexOf(existen[i].id)==-1){

							val.id = existen[i].id;
							val.pic = existen[i].id;
							var it = new ItemContacto(val);
							$("#contactos .lista").append(it.html);
						}
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

	this.html.attr("data-id",d.id);
	if(d.foto!=null){
		this.html.find(".pic").css("background-image",'url("'+d.foto+'")');
	}
	
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

				
					if(e.hasClass("check")){
						contactos.total--;

						e.removeClass("check");
					}else{
						if(contactos.total<10){
							contactos.total++;
							e.addClass("check");
						}else{
							new Alerta("Solo puedes seleccionar hasta 10 contactos");
						}	
					}
					$("#header .sub").html(contactos.total+" de 10");
					
				
		        
		        
			}else{
				window.plugins.socialsharing.shareViaSMS('Prueba LifeSignal para tu smartphone. Visita http://picnic.pe/lifesignal/ para descargarlo',d.original,function(msg){console.log('ok: ' + msg);},function(msg) {alert('error: ' + msg);});
			}
			
		})
	}
}