var Internagrupo = function(){
	this.dom = $("#internagrupo");
	this.titulo = "Contactos";
	this.id = null;
	this.miembros = null;
	
	new Boton($("#internagrupo .btn.ubicacion"),function(){
		getContent({page:"ubicacion"},true);
	});
	new Boton($("#internagrupo .btn.crear"),function(){
		getContent({page:"contactos"},true);
	});
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
	this.html.find('.pic').css("background-image","url('"+d.pic+"')");

	/*new Boton(this.html,function(){
		getContent({page:"internagrupo"},true);
	});*/

}