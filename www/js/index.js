var production = true;
var pathapi;
var login;
var usuario;
var seccion = "";
var facebook;
var ubicacion;
var grupos;
var header;
var internagrupo;
var contactos;


var socket;


var w; //ancho de pantalla




if(production){
    //pathapi = "http://picnic.pe/clientes/bancofalabella/RESTAPI/";
    //pathapi = 'http://192.168.0.10/lifesignal/Life-Signal-Api/';
    pathapi = "http://picnic.pe/clientes/lifesignal/api/";
}else{
    //pathapi = 'http://52.34.151.159/RESTAPI/';
    //pathapi = "http://localhost/lifesignal/api/";
    pathapi = 'http://localhost/lifesignal/Life-Signal-Api/';
}

var home;
var usuario;
var initTime=1000;

//window.localStorage.setItem("id",111);

var app = {
    
    initialize: function() {
        
        this.bindEvents();
    },

    bindEvents: function() {
        if(production){
            document.addEventListener('deviceready', this.onDeviceReady, false);
            document.addEventListener("resume", thi.onDeviceResume);
        }{
            else $(document).ready(this.onDeviceReady);
        }
    },
    
    onDeviceResume: function(){
        alert(1);
    }

    onDeviceReady: function() {
        
        console.log("device ready");

        header = new Header();

        if(!production){
            setTimeout(function(){
                facebookConnectPlugin.browserInit('100412800363577');
            },2000);
            initTime = 4000;
        }

        setTimeout(function(){
            facebook =  new Facebook();
            console.log("local storage: "+window.localStorage.getItem("id"));
            if(window.localStorage.getItem("id")==null){
                console.log("no sesion");
                $("#home").show();
            }else{
                console.log("sesion activa");
                request("usuario/validar",{
                    id:window.localStorage.getItem("id")
                },function(res){
                    console.log("validar");
                    console.log(res);
                    if(res.existe == true){
                        usuario = new Usuario();
                        usuario.id = res.info.id;
                        usuario.nombres = res.info.nombres;
                        usuario.apellidos = res.info.apellidos;
                        usuario.email = res.info.email;
                        usuario.fbid = res.info.fbid;
                        usuario.pic = res.info.pic;





                        if(res.solofacebook == true){
                            facebook.getStatus(function(conectado){
                                console.log("statusfacebook");
                                console.log(conectado);
                                if(conectado){
                                    facebook.myInfo(function(info){
                                        console.log("infofacebook");
                                        
                                        usuario.iniciarSesion();

                                        //console.log("GRUPOS");
                                    })
                                }else{
                                    window.localStorage.removeItem("id");
                                    $("#home").show();
                                }

                            });
                        }else{
                            console.log("tiene usuario y clave");

                            usuario.iniciarSesion();
                            //console.log("GRUPOS");
                        }
                    }else{

                        window.localStorage.removeItem("id");
                        $("#home").show();
                    }
                },"get");
                
            }

        },initTime);
        

        //login = new Login();
        home = new Home();
        w = $(window).innerWidth();

        
    },
};




var Boton = function(dom,callback){
    var flagtouch=false;
    if(production){
        dom.on({
            "touchstart":function(){
                flagtouch=true;
                $(this).addClass("over");
            },
            "touchmove":function(){

                flagtouch=false;
            },
            "touchend":function(){
                if(flagtouch){
                    $(this).removeClass("over");

                    callback($(this));
                }
                

            }
        });
       

    }else{
        dom.bind({
            "mousedown":function(){
                $(this).addClass("over");
            },
            "mouseup":function(){
                $(this).removeClass("over");
                callback($(this));
            }
        });
    }

};

var Espera = function(){
    this.mensaje = function(str){
        $("#espera .msg").html(str);
    }
    this.show = function(){
        $("#espera").show();
    }
    this.hide = function(){
        $("#espera").hide();
        $("#espera .msg").html("");
    }
}


var Usuario = function(){

    this.iniciarSesion = function(){
        console.log("iniciar sesion:"+this.id);
        window.localStorage.setItem("id",this.id);
        
        grupos = new Grupos();
        internagrupo = new Internagrupo();
        ubicacion = new Ubicacion();
        contactos = new Contactos();
        

        $("#home").hide();
        $("#header").show();

        grupos.cargarMiPerfil();
        grupos.listar();



        getContent({page:"grupos"},true);



        socket = io.connect('http://picnic.pe:8881');

        socket.on("connect", function() {
            //alert("conectado");
            console.log("usuario conectado al servidor");
            
            

            var opciones = {
                maximumAge: 3000,
                enableHighAccuracy:true,

            };
            navigator.geolocation.watchPosition(function(position){
                

                socket.emit('enviarposicion',{
                    id:usuario.id,
                    lat:position.coords.latitude,
                    lon:position.coords.longitude
                });



            },function(e){
                console.log('error watchposition: '+e);
            },opciones);


            var callbackFn = function(location) {
                console.log('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);

                // Do your HTTP request here to POST location to your server.
                // jQuery.post(url, JSON.stringify(location));

                /*
                IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
                and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
                IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
                */

                socket.emit('mensaje',{
                    msg:'holaaaa',
                    lat:location.latitude,
                    lon:location.longitude
                });
                backgroundGeoLocation.finish();

            };

            var failureFn = function(error) {
                console.log('BackgroundGeoLocation error');
            };

            // BackgroundGeoLocation is highly configurable. See platform specific configuration options
            backgroundGeoLocation.configure(callbackFn, failureFn, {
                desiredAccuracy: 10,
                stationaryRadius: 20,
                distanceFilter: 30,
                debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                stopOnTerminate: false, // <-- enable this to clear background location settings when the app terminates
            });

            // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
            backgroundGeoLocation.start();
        });

        socket.on("posicion",function(data){
            //console.log(data);
            ubicacion.moverPosicion(data);
        });
        socket.on("mensaje",function(data){
            console.log(data);
        })
    }

    
}


function request(ac,params,callback){
    $.ajax({
        url:pathapi+ac,
        dataType:"json",
        data:params,
        type:'get',
        success:callback
    });
}


window.onpopstate = function(event) {

   
    getContent(event.state,false);
   

    

};


function getContent(obj,addEntry){
    
   
    var antseccion = seccion;
    seccion=obj.page;

   
    if(antseccion!="") window[antseccion].ocultar();
       
    switch(seccion){

        case "internagrupo":
            internagrupo.mostrar();
            internagrupo.listarcontactos(obj.grupo);
            break;
        case "ubicacion":

            ubicacion.mostrar();
            ubicacion.iniciarMapa();
            break;
        case "contactos":
            contactos.listar();
            contactos.mostrar();
            break;
        default:
            window[seccion].mostrar();

       
    }

    //if(menu.abierto) menu.cerrar();

    


   
   
    

    

    //window[antseccion].ocultar();
    //window[seccion].mostrar();

    if(addEntry == true) {
        history.pushState(obj,null); 
    }

    //window.scrollTo(0,0);

    
    


}

var Seccion = function(){

    this.mostrar = function(){
        this.dom.css('display',"block");
        this.dom.transition({opacity:0},0);
        this.dom.transition({opacity:1});

        header.setTitulo(this.titulo);

        //this.dom.show();
    }

    this.ocultar = function(){
        this.dom.hide();
    }
}

/*var Alerta = function(msg,callback,title,button){
    if(production){
        navigator.notification.alert(msg, callback, title, button);
    }else{
        alert(msg);
        callback();
    }
}

var Data = function(){

    this.categorias = new Array();
    this.descuentos = new Array();
    this.beneficios = new Array();
    this.locales = new Array();
    this.tipos = new Array();
    this.canales =  new Array();

}

var data = new Data();


window.onpopstate = function(event) {

   
    getContent(event.state,false);
   

    

};


function getContent(obj,addEntry){
    
   
    var antseccion = seccion;
    seccion=obj.page;

   
    if(antseccion!="") window[antseccion].ocultar();
       
    switch(seccion){
        case "descuentos":

            descuentos.mostrar(obj.cat,obj.neg);
            break;
        case "beneficios":
            beneficios.mostrar();
            break;
        case "encuentranos":
            encuentranos.mostrar();
            break;
        case "detalle":
            detalle.mostrar(obj.id);
            break;
        case "gmaps":
            gmaps.mostrar(obj.cat,obj.neg);
            break;
        case "ubicacion":
            ubicacion.mostrar(obj.negocio);
            break;
        case "canales":
            canales.mostrar();
            break;
    }

    if(menu.abierto) menu.cerrar();

    


   
   
    

    

    //window[antseccion].ocultar();
    //window[seccion].mostrar();

    if(addEntry == true) {
        history.pushState(obj,null); 
    }

    //window.scrollTo(0,0);

    
    


}


*/