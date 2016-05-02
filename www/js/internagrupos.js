var Internagrupo = function(){
	this.dom = $("#internagrupo");
	this.titulo = "Contactos";
	this.id = null;
	this.miembros = new Array();
	this.nombre = null;
	
	/*
	new Boton($("#internagrupo .btn.ubicacion"),function(){
		getContent({page:"ubicacion"},true);
	});*/
	
	new Boton($("#internagrupo .bt.crear"),function(){
		getContent({page:"contactos"},true);
	});


	
	
	

	this.mostrar = function(){
		
		
		
		//contactos.flag=false;

		//this.listarcontactos(id);
		header.mostrar("menu");

		if(usuario.grupo==null){
			$("#internagrupo").addClass("singrupo");
		}else{
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
			})
		}else{
			this.llenarListaMiembros();
		}
	}

	this.llenarListaMiembros = function(){
		$("#internagrupo .lista .miembros").empty();
		$.each(usuario.miembros,function(key,val){
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
		console.log(d.id);
		socket.emit("privado",{id:d.id,msg:"Holaaaaaaaa"});
	});

}