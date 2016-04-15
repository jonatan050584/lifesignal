var mapa;
var existemapa = false;
var Ubicacion = function(){

	this.dom = $("#ubicacion");
	this.titulo = "Ubicación";
	this.contactos = null;
	this.markers = new Array();
	this.iniciarMapa = function(){
		if(!existemapa){
			existemapa=true;

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
		      center: new google.maps.LatLng(-12.071854, -77.115097),
		      zoom: 10,
		      mapTypeId: 'roadmap',
		      streetViewControl:false,
		      mapTypeControl:false,
		      zoomControl: false,
		      styles: styles
		    };
		    mapa = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		}
		//navigator.geolocation.getCurrentPosition(this.onMyPosition, this.onError);
		//-12.071854, -77.115097

		
	}
	this.onError = function(error){
		console.log('code: '    + error.code    + '\n' +  'message: ' + error.message + '\n');
	}
	this.onMyPosition = function(position){

		this.currentpos = position.coords;

		


	    /*var icono = {

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
		*/
		console.log(this.contactos);
	}
	this.moverPosicion = function(data){
		console.log(data);
		//console.log(this.contactos);
		if(this.contactos!=null){
			$.each(this.contactos,function(key,val){
				if(val.id==data.id){
					//if(markers[parseInt(val.id)])
					if(ubicacion.markers[parseInt(val.id)]==undefined){
						//crear marker
						console.log("crear marker");
						var icono = {
					    	url:'http://picnic.pe/clientes/lifesignal/api/mark.png',
					    	scaledSize: new google.maps.Size(54, 68)
					    }

					    var marker = new google.maps.Marker({
					      clickable:false,
					     	
					      icon: icono,
					      shadow:null,
					      zIndex:999,
					      map:mapa,
					      position:{lat:data.lat,lng:data.lon}
					    });
					    ubicacion.markers[parseInt(val.id)] = marker;
					}else{
						var m = ubicacion.markers[parseInt(val.id)];

						var latlng = new google.maps.LatLng(data.lat,data.lon)
						m.setPosition(latlng)
					}
				}
			})
		}
	}
	

}
Ubicacion.prototype = new Seccion();