var Invitaciones = function(){
	this.dom = $("#invitaciones");
	this.titulo = "Invitations";
	this.lista = null;

	this.listar = function(){
		$("#invitaciones .lista").empty();
		if(this.lista.length>0){
			$.each(this.lista,function(key,val){
				var it =  new ItemInvitacion(val);
				$("#invitaciones .lista").append(it.html);
			})
		}else{
			$("#invitaciones .lista").html("No tienes ninguna invitación pendiente.")
		}
	}
}
Invitaciones.prototype = new Seccion();

var ItemInvitacion = function(d){
	this.html = $(lib.ItemInvitacion);
	this.html.find(".txt").html(d.usuario_nombre+' te ha invitado a formar parte de su grupo "'+d.grupo+'"');

	new Boton(this.html.find(".btn.aceptar"),function(e){
		
		e.parent().hide();
		request("grupo/aceptarinvitacion",{
			id:d.id
		},function(res){
			console.log(res);
			header.cargarInvitaciones();
			socket.emit("aceptarinvitacion",{
				usuario:d.usuario_id,
				grupo:d.grupo_id
			});

			grupos.listar();
			internagrupo.listar(d.grupo_id);
		});

	});
	new Boton(this.html.find(".btn.rechazar"),function(e){
		
		e.parent().hide();
		request("grupo/rechazarinvitacion",{
			id:d.id
		},function(res){
			console.log(res);
			header.cargarInvitaciones();
		});

	});
}