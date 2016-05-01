var production = true;
var pathapi;
var login;
var usuario;
var seccion = "home";
var facebook;
var ubicacion;
var grupos;
var header;
var internagrupo;
var contactos;
var invitaciones;
var registro;
var menu;

var socket;

var flaglogin=false;

var w; //ancho de pantalla
var h; //alto de pantalla

var terremoto = false;

if(production){
    //pathapi = "http://picnic.pe/clientes/bancofalabella/RESTAPI/";
    //pathapi = 'http://192.168.0.10/lifesignal/Life-Signal-Api/';
    pathapi = "http://picnic.pe/clientes/lifesignal/api/";
}else{
    //pathapi = 'http://52.34.151.159/RESTAPI/';
    pathapi = "http://localhost/lifesignal/api/";
    //pathapi = 'http://localhost/lifesignal/Life-Signal-Api/';
}

var home;
var usuario;
var initTime=1000;


var app = {
    
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        if(production){
            document.addEventListener('deviceready', this.onDeviceReady, false);
            document.addEventListener("resume", this.onDeviceResume);
            document.addEventListener("pause",this.onDevicePause);
            document.addEventListener("offline", function(){
                alert("offline");
            }, false);
            document.addEventListener("online",function(){
                alert("online");
            })
        }else{
            $(document).ready(this.onDeviceReady);
        }
    },
    
    onDeviceResume: function(){
        //alert(1);
        backgroundGeoLocation.stop()

    },
    onDevicePause:function(){


        var callbackFn = function(location) {
            console.log('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);

            socket.emit('enviarposicion',{
                id:usuario.id,
                lat:location.latitude,
                lon:location.longitude,
                from:'background'
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
            debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // <-- enable this to clear background location settings when the app terminates
        });

        // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
        backgroundGeoLocation.start();

    },

    onDeviceReady: function() {

        /*
        var push = PushNotification.init({
            android: {
                senderID: "1029590604378"
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            }
        });

        push.on('registration', function(data) {
            // data.registrationId
            console.log(data);
        });

        push.on('notification', function(data) {
            console.log(data);
            // data.message,
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
        });

        push.on('error', function(e) {
            console.log(e);
            // e.message
        });
    
    


        */
        console.log("device ready");

        ////sqlite

        








        ///////

        header = new Header();

        /*if(!production){
            setTimeout(function(){
                facebookConnectPlugin.browserInit('100412800363577');
            },2000);
            initTime = 4000;
        }*/

        if(window.localStorage.getItem("usuario")==null){
            window.localStorage.clear();
            console.log("no sesion");
            $("#home").show();
        }else{
            console.log("sesion activa");
            usuario = new Usuario();
            usuario.iniciar(JSON.parse(window.localStorage.getItem("usuario")));
        }

        
        
        w = $(window).innerWidth();
        h = $(window).innerHeight();
        //login = new Login();
        home = new Home();
        registro = new Registro();
        

        
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
    
    if(obj==null){
        obj = new Object({page:"home"});
    }

    var antseccion = seccion;
    seccion=obj.page;

   
    if(antseccion!=""){
        if(seccion=="home"){
            if(!flaglogin) window[antseccion].ocultar();    
        }else{
            window[antseccion].ocultar();    
        }
        
    }
       
    switch(seccion){
        case "home":
            if(!flaglogin){
                $("#header").hide();
                home.mostrar();
            }
            break;
        case "internagrupo":
            internagrupo.mostrar(obj.grupo,obj.nombre);
            
            break;
        case "ubicacion":
            if(terremoto==false){
                history.back();
            }
            ubicacion.mostrar();
            ubicacion.iniciarMapa();
            break;
        case "invitaciones":
            invitaciones.listar();
            invitaciones.mostrar();
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

        //header.setTitulo(this.titulo);

        //this.dom.show();
    }

    this.ocultar = function(){
        this.dom.hide();
    }
}


var Espera = function(msg,callback){

    $("#espera .txt").html(msg);
    $("#espera").show();
    this.fin = function(){
        $("#espera .txt").html("");
        $("#espera").hide();
    }

    this.txt = function(val){
        $("#espera .txt").html(val);
    }
}


var Alerta = function(msg,btn,callback){

    $("#alerta .txt").html(msg);

    if(btn!=undefined){
        $("#alerta .bt").html(btn);
    }else{
        $("#alerta .bt").html("OK");
    }


    //$("#cubre").show();
    //$("#alerta").show();

    
    $("#cubre").show();
    $("#cubre").transition({opacity:0},0);
    $("#cubre").transition({opacity:1,complete:function(){
        //$("#cubre").show();
    }});

    $("#alerta").show();
    $("#alerta").transition({opacity:0},0);
    

    var vh = $("#alerta").outerHeight();

    $("#alerta").css("top",(h-vh)/2);

    $("#alerta").transition({opacity:1,complete:function(){
       // $("#alerta").show();
    }});

    $("#alerta .bt.ok").unbind();

    new Boton($("#alerta .cerrar"),function(){
        $("#alerta").hide();
        $("#cubre").hide();

    });

    $("#alerta .bt.ok").unbind();
    new Boton($("#alerta .bt.ok"),function(){
        $("#alerta").hide();
        $("#cubre").hide();
        if(callback!=undefined){
            
            callback();
        }
    });
}




function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}

checkConnection();