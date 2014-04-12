(function($){
$.fn.carrusel = function( params ) {
    // Valores por defecto de la config
    var defaults = {
        width: 300,
        height: 300,
        next: false,
        prev: false,
        vertical: false,
        auto: false,
        fade: false,
        current: 0,
        items: 0,
        slidespeed: 600,
        visible: 1,
        pagination: false
    };
	
	// Para acceder a los valor de la configuración
    var config = $.extend(defaults, params);
	
    // Recogemos los valores para crear el "ul" y sus hijos "li" con las imagenes
    var ul = $(this);
    var li = ul.children('li');
    
    config.items = li.length;
    
	// Recogemos el valor de altura y anchura
    var height = config.height;
    var width = config.width;
    
    
	// Creamos el contenedor del carrusel
    ul.wrap('<div class="carrusel-frame" style="width:'+width+'px;height:'+height+'px;overflow:hidden">');
    // Generamos un estilo para  los "ul" del contenedor anterior
	var container = ul.parent('.carrusel-frame');
    if(!config.vertical) {
        ul.width(config.items*config.width);
        ul.height(config.height);
    } else {
        ul.width(config.width);
        ul.height(config.items*config.height);
    }
    ul.css('overflow','hidden');
    
	// Estilo para los "li"
    li.each(function(i,item) {
        $(item).width(config.width);
        $(item).height(config.height);
        if(!config.vertical)
            $(item).css('float','left');
    });	
    
    // Movimiento al pulsar sobre los botones hace visible la imagen en el contenedor principal
    var slide = function(dir, click) {		
        if(typeof click == "undefined" & config.auto==false)
            return;	
			//Derecha
        if(dir=="next") {
            config.current += config.visible;			
            if(config.current>=config.items)
                config.current = 0;
			// Izquierda
        } else if(dir=="prev") {
            config.current -= config.visible;
            if(config.current<0)
                config.current = (config.visible==1) ? config.items-1 : config.items-config.visible+(config.visible-(config.items%config.visible));
        } else {
            config.current = dir;
        }
        
        // Paginación, para elimianr el "li" actual y poner el siguiente elemento activo
        if(config.pagination != false) {
            container.next('.carrusel-pagination').find('li').removeClass('carrusel-pagination-active')
            container.next('.carrusel-pagination').find('li:nth-child('+(config.current+1)+')').addClass('carrusel-pagination-active');					
        }
        
        // Función para mostrar o ocultar, utilizando Fade
        if(config.fade!=false) {
            ul.fadeOut(config.fade, function() {
                ul.css({marginLeft: -1.0*config.current*config.width});
                ul.fadeIn(config.fade);
            });
            
        // Configuramos la animación del slide con el valor de velocidad del config
        } else {
            if(!config.vertical)
                ul.animate( {marginLeft: -1.0*config.current*config.width}, config.slidespeed );
            else
                ul.animate( {marginTop: -1.0*config.current*config.height}, config.slidespeed );
        }
		
		//Agregamos texto con AJAX
        loadXMLDoc(config.current);
		
		// Desactivar la pasada del slider automático, al pulsar
        if(typeof click != "undefined")
            config.auto = false;
        // Si no esta desactivado, pasar los slides automaticamente al siguiente
        if(config.auto!=false)
            setTimeout(function() {
                slide('next');
            }, config.auto);
    }
    
    // Crear el contenedor de la paginación
    if(config.pagination != false) {		
        container.after('<ul class="carrusel-pagination"></ul>');
        var pagination = container.next('.carrusel-pagination');
		// Creamos tantos elementos como imagenes haya
        for(var i=0;i<config.items;i++) {
            if(i==0)				
				// Si el la primera, será por defecto la slide activa
                pagination.append('<li class="carrusel-pagination-active"><img src="./img/'+i+'_small.jpg" alt="image'+i+'" onclick="loadXMLDoc('+i+')"></li>');
            else
				// Para el resto de slides
                pagination.append('<li><img src="./img/'+i+'_small.jpg" alt="image'+i+'" onclick="loadXMLDoc('+i+')"></li>');
        }
        
        pagination.find('li').each(function(index, item) {
            $(this).click(function() {				
                slide(index,true);				
            });
        });
    }
        
    // Manejador para los eventos al pulsar sobre derecha e izquierda o teclas derecha e izquierda
    if(config.next!=false)
        config.next.click(function() {						
            slide('next',true);
        });         
    if(config.prev!=false)
        config.prev.click(function() {
            slide('prev',true);
        });
		
	   
	// Evento para manejar las teclas izquierda, derecha
    function manejadorTeclas(event) {				
			var code = ('charCode' in event) ? event.keyCode : event.charCode;
			switch (code) {
				case 39:// '>'					
					slide('next',true);
				break;
				case 37://'<'
					slide('prev',true);
				break;				   
			}
		}
		
	window.document.onkeypress=manejadorTeclas;
	
    // Auto Sliding, hacia la derecha
    if(config.auto!=false)
        setTimeout(function() {
            slide('next');
        }, config.auto);
		
		//AJAX carga de textos
		function loadXMLDoc(numero) {			
			req=new XMLHttpRequest();
			req.onreadystatechange=function() {
				if (req.readyState==4 && req.status==200) {					
					document.getElementById("texto").innerHTML=req.responseText;					
				}
			}
			switch(numero)
			{
			case 0:
				req.open("GET","./texto/"+numero+".txt",true);
				req.send();
			  break;
			case 1:
				req.open("GET","./texto/"+numero+".txt",true);
				req.send();
			  break;
			case 2:
				req.open("GET","./texto/"+numero+".txt",true);
				req.send();
			  break;
			case 3:
				req.open("GET","./texto/"+numero+".txt",true);
				req.send();
			  break;
			case 4:
				req.open("GET","./texto/"+numero+".txt",true);
				req.send();
			  break;
			default:
			  alert("ERROR al leer el fichero de texto.")
			}			
		}
}
})(jQuery);