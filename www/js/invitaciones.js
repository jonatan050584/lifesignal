var Invitaciones = function(){
	this.dom = $("#invitaciones");
	this.titulo = "Invitations";
	this.lista = null;

	this.mostrar = function(){
		$("#header .menu").hide();
		$("#header .back").show();
		$("#header .add").hide();
		$("#header .titulo").html("");

		Invitaciones.prototype.mostrar.call(this);
	}

	this.listar = function(){
		$("#invitaciones .lista").empty();
		if(this.lista.length>0){
			$.each(this.lista,function(key,val){
				var it =  new ItemInvitacion(val);
				$("#invitaciones .lista").append(it.html);
			})
		}else{
			$("#invitaciones .lista").html('<div class="nohay">No tienes ninguna invitación pendiente.</div>')
		}
	}
}
Invitaciones.prototype = new Seccion();

var ItemInvitacion = function(d){
	this.html = $(lib.ItemInvitacion);
	
	this.html.find(".usuario").html(d.usuario_nombre);
	this.html.find(".grupo").html(d.grupo);

	if(d.pic!=null){
		this.html.find('.pic').css("background-image","url('"+d.pic+"')");
	}

	new Boton(this.html.find(".bt.aceptar"),function(e){
		var es = new Espera("Enviando respuesta...");
		e.parent().hide();
		request("grupo/aceptarinvitacion",{
			id:d.id
		},function(res){
			
			es.fin();

			console.log(res);
			header.cargarInvitaciones();
			socket.emit("aceptarinvitacion",{
				usuario:d.usuario_id,
				grupo:d.grupo_id
			});

			grupos.listar();
			internagrupo.listarcontactos(d.grupo_id);
		});

	});
	new Boton(this.html.find(".bt.rechazar"),function(e){
		var es = new Espera("Enviando respuesta...");
		e.parent().hide();
		request("grupo/rechazarinvitacion",{
			id:d.id
		},function(res){
			es.fin();
			console.log(res);
			header.cargarInvitaciones();
		});

	});
}