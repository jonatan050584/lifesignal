var Grupos = function(){
	this.dom = $("#grupos");
	this.titulo = "Grupos";

	new Boton($("#grupos .barra .btn.crear"),function(){
		$("#grupos .creacion").css('display',"block");
        $("#grupos .creacion").transition({opacity:0},0);
        $("#grupos .creacion").transition({opacity:1});
	})

	new Boton($("#grupos .creacion .cerrar"),function(){
		$("#grupos .creacion").hide();
	});

	new Boton($("#grupos .creacion .bt.creargrupo"),function(){
		var nom = $("#grupos .creacion input[name=nombre]").val();

		if(nom!=""){
	        $("#grupos .creacion").hide();
	        $("#grupos .creacion input[name=nombre]").val("");
	       // $("#grupos .creacion").delay(200).hide();
			request("grupo/crear",{
				us:usuario.id,
				nom:nom
			},function(res){
				var it = new ItemGrupo(res);
				$("#grupos .lista").prepend(it.html);
			})
		}
	})


	this.cargarMiPerfil = function(){
		$(".perfil .pic").css("background-image","url('"+usuario.pic+"')");
		$(".perfil .nombre").html(usuario.nombres+"<br>"+usuario.apellidos);
	}

	this.listar = function(){
	    request("/grupo/listar",{
            us:usuario.id
        },function(response){
            console.log(response);
            $.each(response,function(key,val){
            	var it = new ItemGrupo(val);
            	$("#grupos .lista").append(it.html);
            });
           
        })
    
	}
}
Grupos.prototype = new Seccion();

var ItemGrupo = function(d){
	this.html = $(lib.ItemGrupo);
	this.html.find('.nom').html(d.nombre);

	var cant = String(d.cant);

	if(d.cant==1) cant+=" miembro";
	else cant+=" miembros";

	this.html.find('.cant').html(cant);

	new Boton(this.html,function(){
		getContent({page:"internagrupo",grupo:d.id},true);
	});


}