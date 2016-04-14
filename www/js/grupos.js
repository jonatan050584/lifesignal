var Grupos = function(){
	this.dom = $("#grupos");
	this.titulo = "Grupos";


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
            $.each(response,function(key,val){
            	var it = new ItemGrupo(val);
            	$("#grupos .lista").append(it.html);
            });
            $.each(response,function(key,val){
            	var it = new ItemGrupo(val);
            	$("#grupos .lista").append(it.html);
            });
            $.each(response,function(key,val){
            	var it = new ItemGrupo(val);
            	$("#grupos .lista").append(it.html);
            });
            $.each(response,function(key,val){
            	var it = new ItemGrupo(val);
            	$("#grupos .lista").append(it.html);
            })
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


}