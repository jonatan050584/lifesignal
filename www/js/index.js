var production = false;
var pathapi;
var login;
var usuario;
var seccion = "";
var facebook;

var grupos;
var header;


var w; //ancho de pantalla

if(production){
    //pathapi = "http://picnic.pe/clientes/bancofalabella/RESTAPI/";
    pathapi = 'http://192.168.0.10/lifesignal/api/';
    //pathapi = "http://192.168.0.12/bancofalabella/RESTAPI/";
}else{
    //pathapi = 'http://52.34.151.159/RESTAPI/';
    pathapi = "http://localhost/lifesignal/api/";
}

var home;
var usuario;
var initTime=0;

//window.localStorage.setItem("id",111);

var app = {
    
    initialize: function() {
        
        this.bindEvents();
    },

    bindEvents: function() {
        if(production) document.addEventListener('deviceready', this.onDeviceReady, false);
        else $(document).ready(this.onDeviceReady);
    },
    

    onDeviceReady: function() {
        
        header = new Header();

        if(!production){
            setTimeout(function(){
                facebookConnectPlugin.browserInit('100412800363577');
            },2000);
            initTime = 4000;
        }

        setTimeout(function(){
            facebook =  new Facebook();
            if(window.localStorage.getItem("id")==null){
                console.log("no sesion");
                $("#home").show();
            }else{
                
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
        window.localStorage.setItem("id",this.id);
        grupos = new Grupos();
        $("#home").hide();
        $("#header").show();

        grupos.cargarMiPerfil();
        grupos.listar();



        getContent({page:"grupos"},true);
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

        case "grupos":
            grupos.mostrar();
            break;

        /*case "descuentos":

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
            break;*/
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