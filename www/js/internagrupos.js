var Internagrupo = function(){
	this.dom = $("#internagrupo");
	this.titulo = "Contactos";
	
	new Boton($("#internagrupo .btn.ubicacion"),function(){
		
		getContent({page:"ubicacion"},true);
		
	
	});

	this.listarcontactos = function(id){
		
		$("#internagrupo .lista").empty();

		request("grupo/listarmiembros",{
			grupo:id
		},function(res){
			ubicacion.contactos = res;
			$.each(res,function(key,val){
				var it = new ItemContacto(val);
				$("#internagrupo .lista").append(it.html);
			});
		})
	}
}
Internagrupo.prototype = new Seccion();

var ItemContacto = function(d){
	this.html = $(lib.ItemContacto);
	this.html.find('.nom').html(d.nombres+' '+d.apellidos);
	this.html.find('.pic').css("background-image","url('"+d.pic+"')");

	/*new Boton(this.html,function(){
		getContent({page:"internagrupo"},true);
	});*/
}