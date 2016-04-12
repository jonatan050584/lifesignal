var Library = function(){

	this.set = function(v,f){
		
		$.get(f, function(res) {

			lib[v] = res;
		}, 'text');
	}

	this.set('ItemDescuento','library/ItemDescuento.html');
	this.set('ItemBeneficio','library/ItemBeneficio.html');
	this.set('ItemLeyenda','library/ItemLeyenda.html');

}
var lib = new Library();