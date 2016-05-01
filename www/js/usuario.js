var Usuario = function(){

    this.iniciar = function(info){

        this.id = info.id;
        this.nombres = info.nombres;
        this.apellidos = info.apellidos;
        this.email = info.email;
        this.telefono = info.telefono;
        this.llave = info.llave;
        this.fbid = info.fbid;
        this.pic = info.pic;

        window.localStorage.setItem("usuario",JSON.stringify(info));

        flaglogin=true;

        /*
        socket = io.connect('http://picnic.pe:8882');

        socket.on("connect", function() {
            //alert("conectado");
            console.log("usuario conectado al servidor");
            
            

            var opciones = {
                maximumAge: 15000,
                enableHighAccuracy:true,

            };
            navigator.geolocation.watchPosition(function(position){
                
                socket.emit('enviarposicion',{
                    id:usuario.id,
                    lat:position.coords.latitude,
                    lon:position.coords.longitude,
                    from:'foreground'
                });

            },function(e){
                console.log('error watchposition: '+e);
            },opciones);


            
        });

        socket.on("posicion",function(data){
            console.log(data);
            ubicacion.onPosiciones(data);
        });
        socket.on("mensaje",function(data){
            console.log(data);
        });

        
        socket.on("estadoterremoto",function(valor){
            terremoto=valor;
            if(valor){
                new Alerta("Terremoto de 7.6<br>Epicentro: Cañete<br>¡Ubica a tus contactos ahora!");
                $("#internagrupo .btn.ubicacion").show();
                $("#internagrupo").css("padding-top",85);
            }
        });

        socket.on("hayterremoto",function(){
            terremoto=true;
            new Alerta("Terremoto de 7.6 - Epicentro Cañete<br>¡Ubica a tus contactos ahora!");
            $("#internagrupo .btn.ubicacion").show();
             $("#internagrupo").css("padding-top",85);
        });



        socket.on("acaboterremoto",function(){
            terremoto=false;
            console.log("acabo");
            $("#internagrupo .btn.ubicacion").hide();
            $("#internagrupo").css("padding-top",50);
            if(seccion=="ubicacion"){
                getContent({page:"grupos"},false);
            }
        });

        socket.on("enviarinvitacion",function(invitado){
            if(usuario.id == invitado){
                header.cargarInvitaciones();
            }
        });

        socket.on('aceptarinvitacion',function(data){
            if(data.usuario==usuario.id){
                grupos.listar();    
            }
            if(seccion=="internagrupo" && internagrupo.id == data.grupo){
                internagrupo.listarcontactos(data.grupo);
            }
        });
        socket.on("mensaje",function(data){
            
        });
        */


        
        
        internagrupo = new Internagrupo();
        //ubicacion = new Ubicacion();
        contactos = new Contactos();
        //invitaciones = new Invitaciones();
        //menu =  new Menu();

        console.log("sesion iniciada");
        console.log(usuario);
        console.log(window.localStorage.getItem("usuario"));
       
        /*
        $("#home").hide();
        $("#header").show();

        $("#menu .nombre").html(usuario.nombres+" "+usuario.apellidos);

        header.cargarInvitaciones();

        if(usuario.pic!=null){
            $("#menu .pic").css("background-image","url("+usuario.pic+")");
        }
        */
        getContent({page:"internagrupo"},true);

    }
    this.cerrarSesion = function(){
       
        window.localStorage.removeItem("id");
        location.reload();
    }
    
}
