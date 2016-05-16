var Internagrupo = function(){
	this.dom = $("#internagrupo");
	this.titulo = "Contactos";
	this.id = null;
	this.miembros = new Array();
	this.nombre = null;
	this.admin = false;
	/*
	new Boton($("#internagrupo .btn.ubicacion"),function(){
		getContent({page:"ubicacion"},true);
	});*/
	
	
	new Boton($("#internagrupo .bt.crear"),function(){
		//getContent({page:"contactos"},true);
		new Request("grupo/crear",{
			admin:usuario.llave
		},function(infogrupo){
			usuario.setGrupo(infogrupo);
			//getContent({page:"contactos"},true);
			internagrupo.mostrar();
		})
	})

	new Boton($("#internagrupo .bt.salir"),function(){
		var msg;
		if(internagrupo.admin){
			msg = "Eres administrador de este grupo. Si lo abandonas el grupo seguirá existiendo y se nombrará un administrador al azar.";
		}else{
			msg = "¿Deseas abandonar este grupo?"
		}
		new Alerta(msg,"Abandonar",function(){
			new Request("grupo/abandonar",{
				usuario:usuario.id,
				grupo:usuario.grupo.id,
				admin:internagrupo.admin
			},function(res){

				if(usuario.invitaciones!=null){
					$.each(usuario.invitaciones,function(k,v){
						var id = v.id;
						socket.emit("directo",{ac:"invitacion",id:id});

					})
				}
				if(usuario.miembros!=null){
					$.each(usuario.miembros,function(k,v){
						var id = v.id;
						socket.emit("directo",{ac:"invitacionrespondida",id:id});
					})
				}

				new Request("usuario/info",{
                    key:usuario.llave
                },function(response){
                    
                    usuario.iniciar(response);    
                })
				

			})
		});

	})
	
	

	this.mostrar = function(){
		
		
		
		//contactos.flag=false;

		//this.listarcontactos(id);
		

		if(usuario.grupo==null){
			header.mostrar("menu");
			$("#internagrupo").addClass("singrupo");
		}else{

			if(usuario.miembros!=null){
				$.each(usuario.miembros,function(k,v){
					if((v.id == usuario.id) && v.admin==1){
						internagrupo.admin=true;
					}
				});
			}

			if(internagrupo.admin){
				header.mostrar("menu,addcontact");
			}else{
				header.mostrar("menu");
			}
			
			$("#internagrupo").removeClass("singrupo");
			this.listarpendientes();
			this.listarmiembros();
		}

		Internagrupo.prototype.mostrar.call(this);

	}

	this.listarpendientes = function(){

		if(online){
			new Request("grupo/listarinvitaciones",{
				grupo:usuario.grupo.id
			},function(res){
				console.log(res);
				usuario.setInvitaciones(res);
			})
		}else{
			this.llenarListaPendientes();
		}
	}

	this.listarmiembros = function(){
		if(online){
			new Request("grupo/listarmiembros",{
				grupo:usuario.grupo.id
			},function(res){
				console.log(res);
				usuario.setMiembros(res);


				$.each(usuario.miembros,function(k,v){
					if((v.id == usuario.id) && v.admin==1){
						internagrupo.admin=true;
						header.mostrar("menu,addcontact");
					}
				});
				
			})
		}else{
			this.llenarListaMiembros();
		}
	}

	this.llenarListaMiembros = function(){
		$("#internagrupo .lista .miembros").empty();
		contactos.total = 0;
		$.each(usuario.miembros,function(key,val){
			contactos.total++;
			var it = new ItemMiembro(val);
			$("#internagrupo .lista .miembros").append(it.html);
		})	
	}
	this.llenarListaPendientes = function(){
		$("#internagrupo .lista .pendientes").empty();
		$.each(usuario.invitaciones,function(key,val){
			var it = new ItemMiembro(val,"pendiente");
			$("#internagrupo .lista .pendientes").append(it.html);
		})	
	}

	

}
Internagrupo.prototype = new Seccion();

var ItemMiembro = function(d,estado){
	//internagrupo.miembros.push(d);
	
	this.html = $(lib.ItemMiembro);
	if(estado!=undefined) this.html.addClass(estado);
	this.html.find('.nom').html(d.nombres+' '+d.apellidos);
	

	if(d.pic!=null){
		this.html.find('.pic').css("background-image","url('"+d.pic+"')");
	}
	if(d.admin==1){
		this.html.addClass("ad");
	}

	//

	new Boton(this.html,function(){
		if(d.pic == null) d.pic = "img/grey.jpg";
		var html = '<img src="'+d.pic+'" width="100" height="100" style="margin:auto;border-radius:50px;display:block;margin-bottom:20px">'+
								d.nombres+" "+d.apellidos;
		new Alerta(html,"LLamar",function(){
			window.open("tel:"+d.telefono, '_system');
			$("#alerta").show();
		});
	});

}