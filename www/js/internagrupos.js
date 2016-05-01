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
	})
	
	
	

	this.mostrar = function(id,nombre){
		this.id = id;
		this.nombre = nombre;

		$("#header .btn.add").hide();
		$("#header .btn.addcontact").show();
		$("#header .btn.editar").show();

		$("#internagrupo h1.titulo").html(nombre);
		
		//contactos.flag=false;

		//this.listarcontactos(id);
		header.mostrar("menu");



		Internagrupo.prototype.mostrar.call(this);

	}

	this.listarcontactos = function(id){
		this.id = id;
		this.miembros = new Array();

		$("#internagrupo .lista").empty();

		request("grupo/listarmiembros",{
			grupo:id
		},function(res){
			ubicacion.contactos = res;
			$.each(res,function(key,val){

				var it = new ItemMiembro(val);
				$("#internagrupo .lista").append(it.html);
			});
		})
	}

}
Internagrupo.prototype = new Seccion();

var ItemMiembro = function(d){
	internagrupo.miembros.push(d);
	
	this.html = $(lib.ItemMiembro);
	this.html.find('.nom').html(d.nombres+' '+d.apellidos);
	
	if(d.pic!=null){
		this.html.find('.pic').css("background-image","url('"+d.pic+"')");
	}
	if(d.admin==1){
		this.html.addClass("ad");
	}

	//

	/*new Boton(this.html,function(){
		getContent({page:"internagrupo"},true);
	});*/

}