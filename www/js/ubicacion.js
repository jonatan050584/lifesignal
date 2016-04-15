var mapa;

var Ubicacion = function(){

	this.dom = $("#ubicacion");
	this.titulo = "Ubicación";

	this.iniciarMapa = function(){


		//-12.071854, -77.115097

		var mapOptions = {
		  center: new google.maps.LatLng(-12.071854, -77.115097),
		  zoom: 13,
		  mapTypeId: 'roadmap',
		  streetViewControl:false,
		  mapTypeControl:false,
		  //styles: styles,
		  zoomControl: false,
		  /*zoomControlOptions: {
		      position: google.maps.ControlPosition.RIGHT_CENTER
		  },*/
		};

		mapa = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	}

}
Ubicacion.prototype = new Seccion();