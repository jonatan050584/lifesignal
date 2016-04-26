var Internagrupo = function(){
	this.dom = $("#internagrupo");
	this.titulo = "Contactos";
	this.id = null;
	this.miembros = null;
	this.nombre = null;
	
	new Boton($("#internagrupo .btn.ubicacion"),function(){
		getContent({page:"ubicacion"},true);
	});
	new Boton($("#internagrupo .btn.editar"),function(){
		$("#internagrupo .edicion input[name=nombre]").val(internagrupo.nombre);
		$("#internagrupo .edicion").css('display',"block");
        $("#internagrupo .edicion").transition({opacity:0},0);
        $("#internagrupo .edicion").transition({opacity:1});
	});

	new Boton($("#internagrupo .edicion .cerrar"),function(){
		$("#internagrupo .edicion").hide();
	});

	new Boton($("#internagrupo .edicion .bt.guardar"),function(){
		var nom = $("#internagrupo .edicion input[name=nombre]").val();
		if(nom!=""){
			$("#internagrupo .edicion").hide();
			var es = new Espera("Guardando...");

			request("grupo/editar",{
				id:internagrupo.id,
				nombre:nom
			},function(res){
				es.fin();
				internagrupo.nombre = nom;
				$("#internagrupo h1.titulo").html(nom);

			})
		}
	})

	this.mostrar = function(id,nombre){
		this.id = id;
		this.nombre = nombre;

		$("#header .btn.add").hide();
		$("#header .btn.addcontact").show();
		$("#header .btn.editar").show();

		$("#internagrupo h1.titulo").html(nombre);

		this.listarcontactos(id);
		$("#header .back").show();
		$("#header .menu").hide();



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