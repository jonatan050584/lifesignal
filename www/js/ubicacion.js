var mapa;

var Ubicacion = function(){

	this.dom = $("#ubicacion");
	this.titulo = "Ubicación";

	this.iniciarMapa = function(){

		navigator.geolocation.getCurrentPosition(this.onMyPosition, this.onError);
		//-12.071854, -77.115097

		
	}
	this.onError = function(error){
		console.log('code: '    + error.code    + '\n' +  'message: ' + error.message + '\n');
	}
	this.onMyPosition = function(position){
		this.currentpos = position.coords;

		var styles = [
	      {
	        featureType:"poi.business",
	        elementType:"labels",
	        stylers:[
	          {
	            visibility:"off"
	          }
	        ]
	      }
	    ];

	    var mapOptions = {
	      center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
	      zoom: 13,
	      mapTypeId: 'roadmap',
	      streetViewControl:false,
	      mapTypeControl:false,
	      zoomControl: false,
	      styles: styles
	    };
	    mapa = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


	    var icono = {

	    	url:'http://192.168.0.10/lifesignal/lifesignal/www/img/mark.png',
	    	scaledSize: new google.maps.Size(54, 68)

	    }

	    this.myloc = new google.maps.Marker({
	      clickable:false,
	     	
	      icon: icono,
	      shadow:null,
	      zIndex:999,
	      map:mapa,
	      position:{lat:position.coords.latitude,lng:position.coords.longitude}
	    });


	    var opciones = {
	    	enableHighAccuracy:true,

	    };
	    var watchId = navigator.geolocation.watchPosition(function(pos){
	    	console.log(pos);
	    },this.onError,opciones);
	}
	

}
Ubicacion.prototype = new Seccion();