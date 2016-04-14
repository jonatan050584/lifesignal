var Library = function(){

	this.set = function(v,f){
		
		$.get(f, function(res) {

			lib[v] = res;
		}, 'text');
	}

	this.set('ItemGrupo','library/ItemGrupo.html');

}
var lib = new Library();