var Usuario = function(){

    this.id = null;
    this.pic = null;
    this.nombres = null;
    this.fbid = null;

    this.iniciarSesion = function(tipo){
        console.log("iniciar sesion:"+this.id);
        window.localStorage.setItem("id",this.id);
        
        
        

       


        socket = io.connect('http://picnic.pe:8881');

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
            ubicacion.moverPosicion(data);
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



        if(tipo=="nuevo"){
            socket.emit("mensaje",{
                accion:"nuevousuario"
            })
        }
        grupos = new Grupos();
        internagrupo = new Internagrupo();
        ubicacion = new Ubicacion();
        contactos = new Contactos();
        invitaciones = new Invitaciones();
        menu =  new Menu();

        socket.on("mensaje",function(data){
            if(data.accion=="nuevousuario"){
                contactos.flag=false;
            }
        });

        $("#home").hide();
        $("#header").show();

        $("#menu .nombre").html(usuario.nombres+" "+usuario.apellidos);

        header.cargarInvitaciones();

        if(usuario.pic!=null){
            $("#menu .pic").css("background-image","url("+usuario.pic+")");
        }

        getContent({page:"grupos"},true);

    }
    this.cerrarSesion = function(){
       
        window.localStorage.removeItem("id");
        location.reload();
    }
    
}
