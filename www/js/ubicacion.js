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
		var idsMiembros = new Array();
		$.each(internagrupo.miembros,function(key,val){
			idsMiembros.push(val.id);
		})
		setTimeout(function(){
			socket.emit("pedirultimasposiciones",idsMiembros);	
		},2000);
		


		//navigator.geolocation.getCurrentPosition(this.onMyPosition, this.onError);
		//-12.071854, -77.115097

		
	}

	socket.on("mostrarposiciones",function(data){
		console.log(data);
		console.log(internagrupo.miembros);
		$.each(internagrupo.miembros,function(key,val){
			if(data[parseInt(val.id)]!=null){
				if(ubicacion.markers[parseInt(val.id)]==undefined){
					//crear marker
					var img = escape(val.pic);

					var icono = {
				    	url:'http://picnic.pe/clientes/lifesignal/api/imagen.php?path='+img,
				    	scaledSize: new google.maps.Size(54, 54)
				    }

				    var marker = new google.maps.Marker({
				      clickable:false,
				     	
				      icon: icono,
				      shadow:null,
				      zIndex:999,
				      map:mapa,
				      position:{lat:data[parseInt(val.id)].lat,lng:data[parseInt(val.id)].lon}
				    });
				    ubicacion.markers[parseInt(val.id)] = marker;
				}else{
					var m = ubicacion.markers[parseInt(val.id)];

					var latlng = new google.maps.LatLng(data[parseInt(val.id)].lat,data[parseInt(val.id)].lon);
					m.setPosition(latlng);
				}
			}
		})
	})

	this.onError = function(error){
		console.log('code: '    + error.code    + '\n' +  'message: ' + error.message + '\n');
	}
	
	this.moverPosicion = function(data){
		if(existemapa){
			//console.log(this.contactos);
			if(this.contactos!=null){
				$.each(this.contactos,function(key,val){
					if(val.id==data.id){
						//if(markers[parseInt(val.id)])
						if(ubicacion.markers[parseInt(val.id)]==undefined){
							//crear marker
							console.log("crear marker");

							var img = escape(val.pic);

							var icono = {
						    	url:'http://picnic.pe/clientes/lifesignal/api/imagen.php?path='+img,
						    	scaledSize: new google.maps.Size(54, 54)
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
	

}
Ubicacion.prototype = new Seccion();