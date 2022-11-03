$(document).ready(function(){

	/******************INICIO PRINCIPAL******************/
	$("#generarPrincipal").click(function(){

		var resultadoPrincipal='document.title="'+$('#paginaTitulo').val().replace(/"/g,'\\"')+'";'+
		'var nombreCurso="'+$('#paginaCurso').val().replace(/"/g,'\\"')+'";'+
		'var nombreUnidad="'+$('#paginaUnidad').val().replace(/"/g,'\\"')+'";'+
		'opcionesTextoUnidad = ['+
		'"'+$('#principalObjetivos').val().replace(/"/g,'\\"')+'",'+
		'"'+$('#principalContenido').val().replace(/"/g,'\\"')+'",'+
		'"'+$('#principalMetodologia').val().replace(/"/g,'\\"')+'"'+
		'];';

		$("#resultadoPrincipal").val(resultadoPrincipal);
	
	});	

	$("#borrarPrincipal").click(function(){
		$("#resultadoPrincipal").val("");	
	});	

	$("#resultadoPrincipal").click(function(){
		$("#resultadoPrincipal").select();	
	});
	/******************FIN PRINCIPAL******************/

	/******************INICIO TIPO 1******************/
	var cantidadBotonesTipo1=1;
	$("#agregarTipo1").click(function(){
		cantidadBotonesTipo1++;
		$('<label for="boton'+(cantidadBotonesTipo1)+'Tipo1">Botón '+(cantidadBotonesTipo1)+' texto:</label><input type="text" id="boton'+(cantidadBotonesTipo1)+'Tipo1" class="textos"><label for="modal'+(cantidadBotonesTipo1)+'Tipo1">Modal '+(cantidadBotonesTipo1)+' texto:</label><input type="text" id="modal'+(cantidadBotonesTipo1)+'Tipo1" class="textos">').insertAfter($("#modal"+(cantidadBotonesTipo1-1)+"Tipo1"));
	});

	$("#generarTipo1").click(function(){
		var botones='[';
        var modales='[';
		for(i=1;i<=cantidadBotonesTipo1;i++){
			botones+='"'+$('#boton'+i+'Tipo1').val().replace(/"/g,'\\"')+'",';
			modales+='"'+$('#modal'+i+'Tipo1').val().replace(/"/g,'\\"')+'",';
		}
		botones=botones.trim().substring(0,botones.length-1);
		botones+=']';
		modales=modales.trim().substring(0,modales.length-1);
		modales+=']';

		var resultadoTipo1='infoPantallaTipo'+Math.round(Math.random()*10000)+'={tipo:1,id:"pantalla'+Math.round(Math.random()*10000)+'",'+
               'titulo:"'+$("#tituloTipo1").val().replace(/"/g,'\\"')+'<br>",'+
               'audio:"assets/audios/'+$("#audioTipo1").val()+'",'+
               'texto:"'+$("#textoTipo1").val().replace(/"/g,'\\"')+'",'+
               'imagen:"assets/images/'+$("#imagenTipo1").val()+'",'+
               'botones:'+botones+','+
               'contenidoModal:'+modales+'};';

		$("#resultadoTipo1").val(resultadoTipo1);
	
	});	

	$("#borrarTipo1").click(function(){
		$("#resultadoTipo1").val("");	
	});	

	$("#resultadoTipo1").click(function(){
		$("#resultadoTipo1").select();	
	});
	/******************FIN TIPO 1******************/	    

	/******************INICIO TIPO 2******************/
	var cantidadConversacionesTipo2=[1,1,1,1];

	$("#conversacion1Tipo2").click(function(){
		cantidadConversacionesTipo2[0]++;
		$('<label for="conversacion1A'+cantidadConversacionesTipo2[0]+'Tipo2">Conv 1 Intervención '+cantidadConversacionesTipo2[0]+':</label><input type="text" id="conversacion1A'+cantidadConversacionesTipo2[0]+'Tipo2" class="textos"><label for="conversacion1audioI'+cantidadConversacionesTipo2[0]+'Tipo2">Conv 1 Audio Intervención '+cantidadConversacionesTipo2[0]+':</label><input type="text" id="conversacion1audioI'+cantidadConversacionesTipo2[0]+'Tipo2" class="textos"><label for="conversacion1V'+cantidadConversacionesTipo2[0]+'Tipo2">Conv 1 Respuesta '+cantidadConversacionesTipo2[0]+':</label><input type="text" id="conversacion1V'+cantidadConversacionesTipo2[0]+'Tipo2" class="textos"><label for="conversacion1audioR'+cantidadConversacionesTipo2[0]+'Tipo2">Conv 1 Audio Respuesta '+cantidadConversacionesTipo2[0]+':</label><input type="text" id="conversacion1audioR'+cantidadConversacionesTipo2[0]+'Tipo2" class="textos"><label for="conversacion1pdf'+cantidadConversacionesTipo2[0]+'Tipo2">Conv 1 Pdf '+cantidadConversacionesTipo2[0]+':</label><input type="text" id="conversacion1pdf'+cantidadConversacionesTipo2[0]+'Tipo2" class="textos">').insertAfter($("#conversacion1pdf"+(cantidadConversacionesTipo2[0]-1)+"Tipo2"));
  	});

	$("#conversacion2Tipo2").click(function(){
		cantidadConversacionesTipo2[1]++;
		$('<label for="conversacion2A'+cantidadConversacionesTipo2[1]+'Tipo2">Conv 2 Intervención '+cantidadConversacionesTipo2[1]+':</label><input type="text" id="conversacion2A'+cantidadConversacionesTipo2[1]+'Tipo2" class="textos"><label for="conversacion2audioI'+cantidadConversacionesTipo2[1]+'Tipo2">Conv 2 Audio Intervención '+cantidadConversacionesTipo2[1]+':</label><input type="text" id="conversacion2audioI'+cantidadConversacionesTipo2[1]+'Tipo2" class="textos"><label for="conversacion2V'+cantidadConversacionesTipo2[1]+'Tipo2">Conv 2 Respuesta '+cantidadConversacionesTipo2[1]+':</label><input type="text" id="conversacion2V'+cantidadConversacionesTipo2[1]+'Tipo2" class="textos"><label for="conversacion2audioR'+cantidadConversacionesTipo2[1]+'Tipo2">Conv 2 Audio Respuesta '+cantidadConversacionesTipo2[1]+':</label><input type="text" id="conversacion2audioR'+cantidadConversacionesTipo2[1]+'Tipo2" class="textos"><label for="conversacion2pdf'+cantidadConversacionesTipo2[1]+'Tipo2">Conv 2 Pdf '+cantidadConversacionesTipo2[1]+':</label><input type="text" id="conversacion2pdf'+cantidadConversacionesTipo2[1]+'Tipo2" class="textos">').insertAfter($("#conversacion2pdf"+(cantidadConversacionesTipo2[1]-1)+"Tipo2"));
  	});

	$("#conversacion3Tipo2").click(function(){
		cantidadConversacionesTipo2[2]++;
		$('<label for="conversacion3A'+cantidadConversacionesTipo2[2]+'Tipo2">Conv 3 Intervención '+cantidadConversacionesTipo2[2]+':</label><input type="text" id="conversacion3A'+cantidadConversacionesTipo2[2]+'Tipo2" class="textos"><label for="conversacion3audioI'+cantidadConversacionesTipo2[2]+'Tipo2">Conv 3 Audio Intervención '+cantidadConversacionesTipo2[2]+':</label><input type="text" id="conversacion3audioI'+cantidadConversacionesTipo2[2]+'Tipo2" class="textos"><label for="conversacion3V'+cantidadConversacionesTipo2[2]+'Tipo2">Conv 3 Respuesta '+cantidadConversacionesTipo2[2]+':</label><input type="text" id="conversacion3V'+cantidadConversacionesTipo2[2]+'Tipo2" class="textos"><label for="conversacion3audioR'+cantidadConversacionesTipo2[2]+'Tipo2">Conv 3 Audio Respuesta '+cantidadConversacionesTipo2[2]+':</label><input type="text" id="conversacion3audioR'+cantidadConversacionesTipo2[2]+'Tipo2" class="textos"><label for="conversacion3pdf'+cantidadConversacionesTipo2[2]+'Tipo2">Conv 3 Pdf '+cantidadConversacionesTipo2[2]+':</label><input type="text" id="conversacion3pdf'+cantidadConversacionesTipo2[2]+'Tipo2" class="textos">').insertAfter($("#conversacion3pdf"+(cantidadConversacionesTipo2[2]-1)+"Tipo2"));
  	});

	$("#conversacion4Tipo2").click(function(){
		cantidadConversacionesTipo2[3]++;
		$('<label for="conversacion4A'+cantidadConversacionesTipo2[3]+'Tipo2">Conv 4 Intervención '+cantidadConversacionesTipo2[3]+':</label><input type="text" id="conversacion4A'+cantidadConversacionesTipo2[3]+'Tipo2" class="textos"><label for="conversacion4audioI'+cantidadConversacionesTipo2[3]+'Tipo2">Conv 4 Audio Intervención '+cantidadConversacionesTipo2[3]+':</label><input type="text" id="conversacion4audioI'+cantidadConversacionesTipo2[3]+'Tipo2" class="textos"><label for="conversacion4V'+cantidadConversacionesTipo2[3]+'Tipo2">Conv 4 Respuesta '+cantidadConversacionesTipo2[3]+':</label><input type="text" id="conversacion4V'+cantidadConversacionesTipo2[3]+'Tipo2" class="textos"><label for="conversacion4audioR'+cantidadConversacionesTipo2[3]+'Tipo2">Conv 4 Audio Respuesta '+cantidadConversacionesTipo2[3]+':</label><input type="text" id="conversacion4audioR'+cantidadConversacionesTipo2[3]+'Tipo2" class="textos"><label for="conversacion4pdf'+cantidadConversacionesTipo2[3]+'Tipo2">Conv 4 Pdf '+cantidadConversacionesTipo2[3]+':</label><input type="text" id="conversacion4pdf'+cantidadConversacionesTipo2[3]+'Tipo2" class="textos">').insertAfter($("#conversacion4pdf"+(cantidadConversacionesTipo2[3]-1)+"Tipo2"));
  	});
           

	$("#generarTipo2").click(function(){
		var conversacion1='[';
		var conversacion2='[';
		var conversacion3='[';
		var conversacion4='[';
		
		for(i=1;i<=cantidadConversacionesTipo2[0];i++){

			conversacion1+='"Azul##'+$('#conversacion1A'+i+'Tipo2').val().replace(/"/g,'\\"')+'##assets/audios/'+$('#conversacion1audioI'+i+'Tipo2').val()+'","Verde##'+$('#conversacion1V'+i+'Tipo2').val().replace(/"/g,'\\"')+'##assets/audios/'+$('#conversacion1audioR'+i+'Tipo2').val()+'",';
			if($('#conversacion1pdf'+i+'Tipo2').val()!=''){
				conversacion1=conversacion1.replace(/{/g,'<a href=\\"#\\" onclick=\\"openPdf(\\\'assets/pdfs/'+$('#conversacion1pdf'+i+'Tipo2').val()+'\\\');\\" class=\\"linksPdf\\">');
				conversacion1=conversacion1.replace(/}/g,'</a>');

				
			}	
		}
		conversacion1=conversacion1.trim().substring(0,conversacion1.length-1);
		conversacion1+=']';				

		for(i=1;i<=cantidadConversacionesTipo2[1];i++){
			conversacion2+='"Azul##'+$('#conversacion2A'+i+'Tipo2').val().replace(/"/g,'\\"')+'##assets/audios/'+$('#conversacion2audioI'+i+'Tipo2').val()+'","Verde##'+$('#conversacion2V'+i+'Tipo2').val().replace(/"/g,'\\"')+'##assets/audios/'+$('#conversacion2audioR'+i+'Tipo2').val()+'",';
			if($('#conversacion2pdf'+i+'Tipo2').val()!=''){
				conversacion2=conversacion2.replace(/{/g,'<a  href=\\"#\\" onclick=\\"openPdf(\\\'assets/pdfs/'+$('#conversacion2pdf'+i+'Tipo2').val()+'\\\');\\"  class=\\"linksPdf\\">');
				conversacion2=conversacion2.replace(/}/g,'</a>');
			}	

		}

		conversacion2=conversacion2.trim().substring(0,conversacion2.length-1);
		conversacion2+=']';				

		for(i=1;i<=cantidadConversacionesTipo2[2];i++){
			conversacion3+='"Azul##'+$('#conversacion3A'+i+'Tipo2').val().replace(/"/g,'\\"')+'##assets/audios/'+$('#conversacion3audioI'+i+'Tipo2').val()+'","Verde##'+$('#conversacion3V'+i+'Tipo2').val().replace(/"/g,'\\"')+'##assets/audios/'+$('#conversacion3audioR'+i+'Tipo2').val()+'",';
			if($('#conversacion3pdf'+i+'Tipo2').val()!=''){
				conversacion3=conversacion3.replace(/{/g,'<a href=\\"#\\" onclick=\\"openPdf(\\\'assets/pdfs/'+$('#conversacion3pdf'+i+'Tipo2').val()+'\\\');\\"  class=\\"linksPdf\\">');
				conversacion3=conversacion3.replace(/}/g,'</a>');
			}	

		}
		conversacion3=conversacion3.trim().substring(0,conversacion3.length-1);
		conversacion3+=']';				
		
		for(i=1;i<=cantidadConversacionesTipo2[3];i++){
			conversacion4+='"Azul##'+$('#conversacion4A'+i+'Tipo2').val().replace(/"/g,'\\"')+'##assets/audios/'+$('#conversacion4audioI'+i+'Tipo2').val()+'","Verde##'+$('#conversacion4V'+i+'Tipo2').val().replace(/"/g,'\\"')+'##assets/audios/'+$('#conversacion4audioR'+i+'Tipo2').val()+'",';
			if($('#conversacion4pdf'+i+'Tipo2').val()!=''){
				conversacion4=conversacion4.replace(/{/g,'<a  href=\\"#\\" onclick=\\"openPdf(\\\'assets/pdfs/'+$('#conversacion4pdf'+i+'Tipo2').val()+'\\\');\\"  class=\\"linksPdf\\">');
				conversacion4=conversacion4.replace(/}/g,'</a>');
			}	
		}
		conversacion4=conversacion4.trim().substring(0,conversacion4.length-1);
		conversacion4+=']';				
        
        linksImagenes='';
        
        for(i=1;i<5;i++){
        	if($("#imagen"+i+"Tipo2").val()!='')
				linksImagenes+='"assets/images/'+$("#imagen"+i+"Tipo2").val()+'",';
		}

		linksImagenes=linksImagenes.trim().substring(0,linksImagenes.length-1);		
        
		var resultadoTipo2='infoPantallaTipo'+Math.round(Math.random()*10000)+'={tipo:2,id:"pantalla'+Math.round(Math.random()*10000)+'",'+
               'titulo:"'+$("#tituloTipo2").val().replace(/"/g,'\\"')+'",'+
               'audio:"assets/audios/'+$("#audio0Tipo2").val()+'",'+
               'texto:"'+$("#texto0Tipo2").val().replace(/"/g,'\\"')+'",'+
               'conversacion1:'+conversacion1+','+
               'conversacion2:'+conversacion2+','+
               'conversacion3:'+conversacion3+','+
               'conversacion4:'+conversacion4+','+
               'imagenes:['+linksImagenes+'],'+
               'imagenesGeneral:['+'"assets/images/'+$("#imagenGeneral0Tipo2").val()+'",'+'"assets/images/'+$("#imagenGeneral1Tipo2").val()+'",'+'"assets/images/'+$("#imagenGeneral2Tipo2").val()+'",'+'"assets/images/'+$("#imagenGeneral3Tipo2").val()+'",'+'"assets/images/'+$("#imagenGeneral4Tipo2").val()+'"]'+
               '};';

		$("#resultadoTipo2").val(resultadoTipo2);
	
	});	

	$("#borrarTipo2").click(function(){
		$("#resultadoTipo2").val("");	
	});	

	$("#resultadoTipo2").click(function(){
		$("#resultadoTipo2").select();	
	});
	/******************FIN TIPO 2******************/	 

	/******************INICIO TIPO 3******************/
	var cantidadBotonesTipo3=0;
	$("#agregarTipo3").click(function(){
		cantidadBotonesTipo3++;
		$('<label for="audio'+(cantidadBotonesTipo3)+'Tipo3">Audio '+(cantidadBotonesTipo3)+':</label><input type="text" id="audio'+(cantidadBotonesTipo3)+'Tipo3" class="textos"><label for="texto'+(cantidadBotonesTipo3)+'Tipo3">Texto '+(cantidadBotonesTipo3)+':</label>			<input type="text" id="texto'+(cantidadBotonesTipo3)+'Tipo3" class="textos"><label for="imagen'+(cantidadBotonesTipo3)+'Tipo3">Imagen '+(cantidadBotonesTipo3)+':</label><input type="text" id="imagen'+(cantidadBotonesTipo3)+'Tipo3" class="textos"><label for="boton'+(cantidadBotonesTipo3)+'Tipo3">Botón '+(cantidadBotonesTipo3)+' texto:</label><input type="text" id="boton'+(cantidadBotonesTipo3)+'Tipo3" class="textos">').insertAfter((cantidadBotonesTipo3==1)?$("#imagen"+(cantidadBotonesTipo3-1)+"Tipo3"):$("#boton"+(cantidadBotonesTipo3-1)+"Tipo3"));
	});
                
	$("#generarTipo3").click(function(){
		var botones='[';
        var textos='[';
        var imagenes='[';
        var audios='[';
		

		textos+='"'+$('#texto0Tipo3').val().replace(/"/g,'\\"')+'",';
		imagenes+='"assets/images/'+$('#imagen0Tipo3').val()+'",';
		

		for(i=1;i<=cantidadBotonesTipo3;i++){
			audios+='"assets/audios/'+$('#audio'+i+'Tipo3').val()+'",';
			botones+='"'+$('#boton'+i+'Tipo3').val().replace(/"/g,'\\"')+'",';
			textos+='"'+$('#texto'+i+'Tipo3').val().replace(/"/g,'\\"')+'",';
			imagenes+='"assets/images/'+$('#imagen'+i+'Tipo3').val()+'",';
		}

		botones=botones.trim().substring(0,botones.length-1);
		botones+=']';
		textos=textos.trim().substring(0,textos.length-1);
		textos+=']';
		imagenes=imagenes.trim().substring(0,imagenes.length-1);
		imagenes+=']';
		audios=audios.trim().substring(0,audios.length-1);
		audios+=']';

		var resultadoTipo3='infoPantallaTipo'+Math.round(Math.random()*10000)+'={tipo:3,id:"pantalla'+Math.round(Math.random()*10000)+'",'+
               'titulo:"'+$("#tituloTipo3").val().replace(/"/g,'\\"')+'",'+
               'audio:"assets/audios/'+$("#audio0Tipo3").val()+'",'+
               'audios:'+audios+','+
               'texto:'+textos+','+
               'imagen:'+imagenes+','+
               'botones:'+botones+'};';

		$("#resultadoTipo3").val(resultadoTipo3);
	
	});	

	$("#borrarTipo3").click(function(){
		$("#resultadoTipo3").val("");	
	});	

	$("#resultadoTipo3").click(function(){
		$("#resultadoTipo3").select();	
	});

	/******************FIN TIPO 3******************/
   
   /******************INICIO TIPO 4******************/
	var cantidadBotonesTipo4=0;
	$("#agregarTipo4").click(function(){
		cantidadBotonesTipo4++;
			$('<label for="audio'+(cantidadBotonesTipo4)+'Tipo4">Audio '+(cantidadBotonesTipo4)+':</label><input type="text" id="audio'+(cantidadBotonesTipo4)+'Tipo4" class="textos"><label for="texto'+(cantidadBotonesTipo4)+'Tipo4">Texto '+(cantidadBotonesTipo4)+':</label><input type="text" id="texto'+(cantidadBotonesTipo4)+'Tipo4" class="textos"><label for="imagen'+(cantidadBotonesTipo4)+'Tipo4">Imagen '+(cantidadBotonesTipo4)+':</label><input type="text" id="imagen'+(cantidadBotonesTipo4)+'Tipo4" class="textos"><label for="boton'+(cantidadBotonesTipo4)+'Tipo4">Botón '+(cantidadBotonesTipo4)+' texto:</label><input type="text" id="boton'+(cantidadBotonesTipo4)+'Tipo4" value="'+(cantidadBotonesTipo4)+'" readonly="true" class="textos">').insertAfter((cantidadBotonesTipo4==1)?$("#imagen"+(cantidadBotonesTipo4-1)+"Tipo4"):$("#boton"+(cantidadBotonesTipo4-1)+"Tipo4"));
	});

	$("#generarTipo4").click(function(){
		var botones='[';
        var textos='[';
        var imagenes='[';
        var audios='[';
		
		textos+='"'+$('#texto0Tipo4').val().replace(/"/g,'\\"')+'",';
		imagenes+='"assets/images/'+$('#imagen0Tipo4').val()+'",';
			
		for(i=1;i<=cantidadBotonesTipo4;i++){
			audios+='"assets/audios/'+$('#audio'+i+'Tipo4').val()+'",';
			botones+='"'+$('#boton'+i+'Tipo4').val().replace(/"/g,'\\"')+'",';
			textos+='"'+$('#texto'+i+'Tipo4').val().replace(/"/g,'\\"')+'",';
			imagenes+='"assets/images/'+$('#imagen'+i+'Tipo4').val()+'",';
		}
		
		botones=botones.trim().substring(0,botones.length-1);
		botones+=']';
		textos=textos.trim().substring(0,textos.length-1);
		textos+=']';
		imagenes=imagenes.trim().substring(0,imagenes.length-1);
		imagenes+=']';
		audios=audios.trim().substring(0,audios.length-1);
		audios+=']';

		var resultadoTipo4='infoPantallaTipo'+Math.round(Math.random()*10000)+'={tipo:4,id:"pantalla'+Math.round(Math.random()*10000)+'",'+
               'titulo:"'+$("#tituloTipo4").val().replace(/"/g,'\\"')+'",'+
               'audio:"assets/audios/'+$("#audio0Tipo4").val()+'",'+
               'audios:'+audios+','+
               'texto:'+textos+','+
               'imagen:'+imagenes+','+
               'botones:'+botones+'};';

		$("#resultadoTipo4").val(resultadoTipo4);
	
	});	

	$("#borrarTipo4").click(function(){
		$("#resultadoTipo4").val("");	
	});	

	$("#resultadoTipo4").click(function(){
		$("#resultadoTipo4").select();	
	});

	/******************FIN TIPO 4******************/

   /******************INICIO TIPO 5******************/

    var cantidadBotonesTipo5=1;
	$("#agregarTipo5").click(function(){
		cantidadBotonesTipo5++;
		$('<label for="boton'+(cantidadBotonesTipo5)+'Tipo5">Botón '+(cantidadBotonesTipo5)+' texto:</label><input type="text" id="boton'+(cantidadBotonesTipo5)+'Tipo5" class="textos"><label for="modal'+(cantidadBotonesTipo5)+'Tipo5">Modal '+(cantidadBotonesTipo5)+' texto:</label><input type="text" id="modal'+(cantidadBotonesTipo5)+'Tipo5" class="textos">').insertAfter($("#modal"+(cantidadBotonesTipo5-1)+"Tipo5"));
	});

	
    $("#generarTipo5").click(function(){
		var botones='[';
        var modales='[';
		
		for(i=1;i<=cantidadBotonesTipo5;i++){
			botones+='"'+$('#boton'+i+'Tipo5').val().replace(/"/g,'\\"')+'",';
			modales+='"'+$('#modal'+i+'Tipo5').val().replace(/"/g,'\\"')+'",';
		}
		botones=botones.trim().substring(0,botones.length-1);
		botones+=']';
		modales=modales.trim().substring(0,modales.length-1);
		modales+=']';

		var resultadoTipo5='infoPantallaTipo'+Math.round(Math.random()*10000)+'={tipo:5,id:"pantalla'+Math.round(Math.random()*10000)+'",'+
               'titulo:"'+$("#tituloTipo5").val()+'",'+
               'audio:"assets/audios/'+$("#audioTipo5").val()+'",'+
               'texto:"'+$("#textoTipo5").val().replace(/"/g,'\\"')+'",'+
               'imagen:"assets/images/'+$("#imagenTipo5").val()+'",'+
               'botones:'+botones+','+
               'contenidoModal:'+modales+'};';

		$("#resultadoTipo5").val(resultadoTipo5);	
	});	

	$("#borrarTipo5").click(function(){
		$("#resultadoTipo5").val("");	
	});	

	$("#resultadoTipo5").click(function(){
		$("#resultadoTipo5").select();	
	});
	/******************FIN TIPO 5******************/	    

	/******************INICIO TIPO 6******************/    
	
    $("#generarTipo6").click(function(){
		var resultadoTipo6='infoPantallaTipo'+Math.round(Math.random()*10000)+'={tipo:6,id:"pantalla'+Math.round(Math.random()*10000)+'",'+
               'titulo:"'+$("#tituloTipo6").val().replace(/"/g,'\\"')+'",'+
               'audio:"assets/audios/'+$("#audioTipo6").val()+'",'+
               'texto:"'+$("#textoTipo6").val().replace(/"/g,'\\"')+'",'+
               'video:"assets/videos/'+$("#videoTipo6").val()+'"};';

		$("#resultadoTipo6").val(resultadoTipo6);	
	});	

	$("#borrarTipo6").click(function(){
		$("#resultadoTipo6").val("");	
	});	

	$("#resultadoTipo6").click(function(){
		$("#resultadoTipo6").select();	
	});
	/******************FIN TIPO 6******************/	

    /******************INICIO TIPO 7******************/

    var cantidadBotonesTipo7=1;
	$("#agregarTipo7").click(function(){
		cantidadBotonesTipo7++;
		$('<label for="boton'+(cantidadBotonesTipo7)+'Tipo7">Botón '+(cantidadBotonesTipo7)+' pregunta:</label><input type="text" id="boton'+(cantidadBotonesTipo7)+'Tipo7" class="textos"><label for="opcion'+(cantidadBotonesTipo7)+'Tipo7">Botón '+(cantidadBotonesTipo7)+' opción:</label><input type="text" id="opcion'+(cantidadBotonesTipo7)+'Tipo7" class="textos"><label for="respuesta'+(cantidadBotonesTipo7)+'Tipo7">Respuesta '+(cantidadBotonesTipo7)+':</label><input type="number" min="1" id="respuesta'+(cantidadBotonesTipo7)+'Tipo7" class="textos">').insertAfter($("#respuesta"+(cantidadBotonesTipo7-1)+"Tipo7"));
	});
	
    $("#generarTipo7").click(function(){
		var botones='[';
        var opciones='[';
        var respuestas='[';
		
		botones+='"'+$('#tituloPreguntasTipo7').val().replace(/"/g,'\\"')+'",';
		opciones+='"'+$('#tituloOpcionesTipo7').val().replace(/"/g,'\\"')+'",';
			
		for(i=2;i<=(cantidadBotonesTipo7+1);i++){
			botones+='"'+$('#boton'+(i-1)+'Tipo7').val().replace(/"/g,'\\"')+'",';
			opciones+='"'+$('#opcion'+(i-1)+'Tipo7').val().replace(/"/g,'\\"')+'",';
		}

		botones=botones.trim().substring(0,botones.length-1);
		botones+=']';
		opciones=opciones.trim().substring(0,opciones.length-1);
		opciones+=']';

		for(i=1;i<=cantidadBotonesTipo7;i++){
			respuestas+=''+$('#respuesta'+i+'Tipo7').val().replace(/"/g,'\\"')+',';
		}

		respuestas=respuestas.trim().substring(0,respuestas.length-1);
		respuestas+=']';

		var resultadoTipo7='infoPantallaTipo'+Math.round(Math.random()*10000)+'={tipo:7,id:"pantalla'+Math.round(Math.random()*10000)+'",'+
               'titulo:"'+$("#tituloTipo7").val().replace(/"/g,'\\"')+'",'+
               'audio:"assets/audios/'+$("#audioTipo7").val()+'",'+
               'texto:"'+$("#textoTipo7").val().replace(/"/g,'\\"')+'",'+
               'botonesPregunta:'+botones+','+
               'botonesRespuesta:'+opciones+','+
               'respuestasCorrectas:'+respuestas+'};';

		$("#resultadoTipo7").val(resultadoTipo7);	
	});	

	$("#borrarTipo7").click(function(){
		$("#resultadoTipo7").val("");	
	});	

	$("#resultadoTipo7").click(function(){
		$("#resultadoTipo7").select();	
	});
	/******************FIN TIPO 7******************/
	

    /******************INICIO TIPO 8******************/

    var cantidadBotonesTipo8=1;
	$("#agregarTipo8").click(function(){
		cantidadBotonesTipo8++;
		$('<label for="imagen'+(cantidadBotonesTipo8)+'Tipo8">Imagen '+(cantidadBotonesTipo8)+' opción:</label><input type="text" id="imagen'+(cantidadBotonesTipo8)+'Tipo8" class="textos"><label for="boton'+(cantidadBotonesTipo8)+'Tipo8">Botón '+(cantidadBotonesTipo8)+' pregunta:</label><input type="text" id="boton'+(cantidadBotonesTipo8)+'Tipo8" class="textos"><label for="respuesta'+(cantidadBotonesTipo8)+'Tipo8">Respuesta '+(cantidadBotonesTipo8)+':</label><input type="number" min="1" id="respuesta'+(cantidadBotonesTipo8)+'Tipo8" class="textos">').insertAfter($("#respuesta"+(cantidadBotonesTipo8-1)+"Tipo8"));
	});
	
    $("#generarTipo8").click(function(){
		var botones='[';
        var imagenes='[';
        var respuestas='[';
		
		for(i=1;i<=cantidadBotonesTipo8;i++){
			botones+='"'+$('#boton'+i+'Tipo8').val().replace(/"/g,'\\"')+'",';
			imagenes+='"assets/images/'+$('#imagen'+i+'Tipo8').val()+'",';
			respuestas+=''+$('#respuesta'+i+'Tipo8').val().replace(/"/g,'\\"')+',';
		}

		botones=botones.trim().substring(0,botones.length-1);
		botones+=']';
		imagenes=imagenes.trim().substring(0,imagenes.length-1);
		imagenes+=']';
		respuestas=respuestas.trim().substring(0,respuestas.length-1);
		respuestas+=']';
		

		var resultadoTipo8='infoPantallaTipo'+Math.round(Math.random()*10000)+'={tipo:8,id:"pantalla'+Math.round(Math.random()*10000)+'",'+
               'titulo:"'+$("#tituloTipo8").val().replace(/"/g,'\\"')+'",'+
               'audio:"assets/audios/'+$("#audioTipo8").val()+'",'+
               'texto:"'+$("#textoTipo8").val().replace(/"/g,'\\"')+'",'+
               'imagenesPregunta:'+imagenes+','+
               'botonesPregunta:'+botones+','+
               'respuestasCorrectas:'+respuestas+'};';

		$("#resultadoTipo8").val(resultadoTipo8);	
	});	

	$("#borrarTipo8").click(function(){
		$("#resultadoTipo8").val("");	
	});	

	$("#resultadoTipo8").click(function(){
		$("#resultadoTipo8").select();	
	});
	/******************FIN TIPO 8******************/
	
    /******************INICIO TIPO 9******************/

    var cantidadBotonesTipo9=1;
	var cantidadOpcionesTipo9=[1,1,1,1,1,1,1,1,1,1];//Array para máximo 10 preguntas.
	
    $("#agregar1boton1Tipo9").click(function(){
		cantidadOpcionesTipo9[0]++;
		$('<label for="boton1Opcion'+(cantidadOpcionesTipo9[0])+'Tipo9">Opción '+(cantidadOpcionesTipo9[0])+' respuesta:</label><input type="text" id="boton1Opcion'+(cantidadOpcionesTipo9[0])+'Tipo9" class="textos">').insertAfter($("#boton1Opcion"+(cantidadOpcionesTipo9[0]-1)+"Tipo9"));
    });

	$("#agregarTipo9").click(function(){
		cantidadBotonesTipo9++;

		$('<label for="boton'+cantidadBotonesTipo9+'Tipo9">Botón pregunta:</label><input type="text" id="boton'+cantidadBotonesTipo9+'Tipo9" class="textos"><label for="boton'+cantidadBotonesTipo9+'Tipo9">Opción '+cantidadBotonesTipo9+' respuesta:</label><button type="button" id="agregar1boton'+cantidadBotonesTipo9+'Tipo9" class="botonesCortos">+</button><input type="text" id="boton'+cantidadBotonesTipo9+'Opcion1Tipo9" class="textosCortos"><label for="respuesta'+cantidadBotonesTipo9+'Tipo9">Respuesta '+cantidadBotonesTipo9+':</label><input type="number" min="1" id="respuesta'+cantidadBotonesTipo9+'Tipo9" class="textos">').insertAfter($("#respuesta"+(cantidadBotonesTipo9-1)+"Tipo9"));
		$("#agregar1boton"+cantidadBotonesTipo9+"Tipo9").click(function(){ 
			cantidadOpcionesTipo9[cantidadBotonesTipo9-1]++; 
			$('<label for="boton'+cantidadBotonesTipo9+'Opcion'+cantidadOpcionesTipo9[cantidadBotonesTipo9-1]+'Tipo9">Opción '+(cantidadOpcionesTipo9[cantidadBotonesTipo9-1])+' respuesta:</label><input type="text" id="boton'+cantidadBotonesTipo9+'Opcion'+cantidadOpcionesTipo9[cantidadBotonesTipo9-1]+'Tipo9" class="textos">').insertAfter($("#boton"+cantidadBotonesTipo9+"Opcion"+(cantidadOpcionesTipo9[cantidadBotonesTipo9-1]-1)+"Tipo9"));
        });

	});
	
    $("#generarTipo9").click(function(){
    	var botones='[';
        var respuestas='[';
		
		for(i=1;i<=cantidadBotonesTipo9;i++){
			
            botones+='"'+$('#boton'+i+'Tipo9').val().replace(/"/g,'\\"')+'##';
			for(j=1;j<=cantidadOpcionesTipo9[i-1];j++){
				botones+=$('#boton'+i+'Opcion'+j+'Tipo9').val().replace(/"/g,'\\"')+'##';
			}
			botones=botones.trim().substring(0,botones.length-2);
			botones+='",';
			respuestas+=''+$('#respuesta'+i+'Tipo9').val().replace(/"/g,'\\"')+',';
		}

		botones=botones.trim().substring(0,botones.length-1);
		botones+=']';
		respuestas=respuestas.trim().substring(0,respuestas.length-1);
		respuestas+=']';
		

        if($("#imagenTipo9").val()!="")
        	$("#textoTipo9").val('<img src=\"assets/images/product.jpg\" align=\"left\">'+$("#textoTipo9").val());

		var resultadoTipo9='infoPantallaTipo'+Math.round(Math.random()*10000)+'={tipo:9,id:"pantalla'+Math.round(Math.random()*10000)+'",'+
               'titulo:"'+$("#tituloTipo9").val().replace(/"/g,'\\"')+'",'+
               'audio:"assets/audios/'+$("#audioTipo9").val()+'",'+
               'texto:"'+$("#textoTipo9").val().replace(/"/g,'\\"')+'",'+
               'botonesPregunta:'+botones+','+
               'respuestasCorrectas:'+respuestas+'};';

		$("#resultadoTipo9").val(resultadoTipo9);	
	});	

	$("#borrarTipo9").click(function(){
		$("#resultadoTipo9").val("");	
	});	

	$("#resultadoTipo9").click(function(){
		$("#resultadoTipo9").select();	
	});
	/******************FIN TIPO 9******************/
 	
 	/******************INICIO TIPO 10******************/

    var cantidadBotonesTipo10=1;
	$("#agregarTipo10").click(function(){
		cantidadBotonesTipo10++;
		$('<label for="boton'+(cantidadBotonesTipo10)+'Tipo10">Enunciado '+(cantidadBotonesTipo10)+' pregunta:</label><input type="text" id="boton'+(cantidadBotonesTipo10)+'Tipo10" class="textos"><label for="opcion'+(cantidadBotonesTipo10)+'Tipo10">Botón '+(cantidadBotonesTipo10)+' opción:</label><input type="text" id="opcion'+(cantidadBotonesTipo10)+'Tipo10" class="textos"><label for="respuesta'+(cantidadBotonesTipo10)+'Tipo10">Respuesta '+(cantidadBotonesTipo10)+':</label><input type="number" min="1" id="respuesta'+(cantidadBotonesTipo10)+'Tipo10" class="textos">').insertAfter($("#respuesta"+(cantidadBotonesTipo10-1)+"Tipo10"));
	});
	
    $("#generarTipo10").click(function(){
		var botones='[';
        var opciones='[';
        var respuestas='[';
		
		for(i=1;i<=cantidadBotonesTipo10;i++){
			botones+='"'+$('#boton'+i+'Tipo10').val().replace(/"/g,'\\"')+'",';
			opciones+='"'+$('#opcion'+i+'Tipo10').val().replace(/"/g,'\\"')+'",';
		}

		botones=botones.trim().substring(0,botones.length-1);
		botones+=']';
		opciones=opciones.trim().substring(0,opciones.length-1);
		opciones+=']';

		for(i=1;i<=cantidadBotonesTipo10;i++){
			respuestas+=''+$('#respuesta'+i+'Tipo10').val().replace(/"/g,'\\"')+',';
		}

		respuestas=respuestas.trim().substring(0,respuestas.length-1);
		respuestas+=']';

		var resultadoTipo10='infoPantallaTipo'+Math.round(Math.random()*10000)+'={tipo:10,id:"pantalla'+Math.round(Math.random()*10000)+'",'+
               'titulo:"'+$("#tituloTipo10").val().replace(/"/g,'\\"')+'",'+
               'audio:"assets/audios/'+$("#audioTipo10").val()+'",'+
               'texto:"'+$("#textoTipo10").val().replace(/"/g,'\\"')+'",'+
               'botonesPregunta:'+botones+','+
               'botonesRespuesta:'+opciones+','+
               'respuestasCorrectas:'+respuestas+'};';

		$("#resultadoTipo10").val(resultadoTipo10);	
	});	

	$("#borrarTipo10").click(function(){
		$("#resultadoTipo10").val("");	
	});	

	$("#resultadoTipo10").click(function(){
		$("#resultadoTipo10").select();	
	});
	/******************TIPO 11******************/

	$("#generarTipo11").click(function(){			
		$("#resultadoTipo11").val($("#resultadoTipo11").val().replace(/COLORAPP/g,$("#tituloTipo11").val()));
		$("#resultadoTipo11").val($("#resultadoTipo11").val().replace(/FONDOMENU/g,$("#tituloTipo12").val()));		
		$("#resultadoTipo11").val($("#resultadoTipo11").val().replace(/COLORTEXTOS/g,$("#tituloTipo13").val()));
    });    
	/******************FIN TIPO 11******************/

	/******************INICIO GLOSARIO***************/

    var cantidadOpcionesGlosario=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	var abecedario=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','Y','Z'];

    $("#botonA").click(function(){ 
		cantidadOpcionesGlosario[0]++; 
		$('<input type="text" id="letraA'+cantidadOpcionesGlosario[0]+'" class="textosGlosario"><input type="text" id="significadoA'+cantidadOpcionesGlosario[0]+'" class="textosGlosario">').insertAfter($("#significadoA"+(cantidadOpcionesGlosario[0]-1)));
	});

	$("#botonB").click(function(){ 
		cantidadOpcionesGlosario[1]++; 
		$('<input type="text" id="letraB'+cantidadOpcionesGlosario[1]+'" class="textosGlosario"><input type="text" id="significadoB'+cantidadOpcionesGlosario[1]+'" class="textosGlosario">').insertAfter($("#significadoB"+(cantidadOpcionesGlosario[1]-1)));
	});

	$("#botonC").click(function(){ 
		cantidadOpcionesGlosario[2]++; 
		$('<input type="text" id="letraC'+cantidadOpcionesGlosario[2]+'" class="textosGlosario"><input type="text" id="significadoC'+cantidadOpcionesGlosario[2]+'" class="textosGlosario">').insertAfter($("#significadoC"+(cantidadOpcionesGlosario[2]-1)));
	});
    
    $("#botonD").click(function(){ 
		cantidadOpcionesGlosario[3]++; 
		$('<input type="text" id="letraD'+cantidadOpcionesGlosario[3]+'" class="textosGlosario"><input type="text" id="significadoD'+cantidadOpcionesGlosario[3]+'" class="textosGlosario">').insertAfter($("#significadoD"+(cantidadOpcionesGlosario[3]-1)));
	});
    
    $("#botonE").click(function(){ 
		cantidadOpcionesGlosario[4]++; 
		$('<input type="text" id="letraE'+cantidadOpcionesGlosario[4]+'" class="textosGlosario"><input type="text" id="significadoE'+cantidadOpcionesGlosario[4]+'" class="textosGlosario">').insertAfter($("#significadoE"+(cantidadOpcionesGlosario[4]-1)));
	});

    
    $("#botonF").click(function(){ 
		cantidadOpcionesGlosario[5]++; 
		$('<input type="text" id="letraF'+cantidadOpcionesGlosario[5]+'" class="textosGlosario"><input type="text" id="significadoF'+cantidadOpcionesGlosario[5]+'" class="textosGlosario">').insertAfter($("#significadoF"+(cantidadOpcionesGlosario[5]-1)));
	});

    
    $("#botonG").click(function(){ 
		cantidadOpcionesGlosario[6]++; 
		$('<input type="text" id="letraG'+cantidadOpcionesGlosario[6]+'" class="textosGlosario"><input type="text" id="significadoG'+cantidadOpcionesGlosario[6]+'" class="textosGlosario">').insertAfter($("#significadoG"+(cantidadOpcionesGlosario[6]-1)));
	});

    
    $("#botonH").click(function(){ 
		cantidadOpcionesGlosario[7]++; 
		$('<input type="text" id="letraH'+cantidadOpcionesGlosario[7]+'" class="textosGlosario"><input type="text" id="significadoH'+cantidadOpcionesGlosario[7]+'" class="textosGlosario">').insertAfter($("#significadoH"+(cantidadOpcionesGlosario[7]-1)));
	});

    
    $("#botonI").click(function(){ 
		cantidadOpcionesGlosario[8]++; 
		$('<input type="text" id="letraI'+cantidadOpcionesGlosario[8]+'" class="textosGlosario"><input type="text" id="significadoI'+cantidadOpcionesGlosario[8]+'" class="textosGlosario">').insertAfter($("#significadoI"+(cantidadOpcionesGlosario[8]-1)));
	});

    
    $("#botonJ").click(function(){ 
		cantidadOpcionesGlosario[9]++; 
		$('<input type="text" id="letraJ'+cantidadOpcionesGlosario[9]+'" class="textosGlosario"><input type="text" id="significadoJ'+cantidadOpcionesGlosario[9]+'" class="textosGlosario">').insertAfter($("#significadoJ"+(cantidadOpcionesGlosario[9]-1)));
	});

    
    $("#botonK").click(function(){ 
		cantidadOpcionesGlosario[10]++; 
		$('<input type="text" id="letraK'+cantidadOpcionesGlosario[10]+'" class="textosGlosario"><input type="text" id="significadoK'+cantidadOpcionesGlosario[10]+'" class="textosGlosario">').insertAfter($("#significadoK"+(cantidadOpcionesGlosario[10]-1)));
	});

    
    $("#botonL").click(function(){ 
		cantidadOpcionesGlosario[11]++; 
		$('<input type="text" id="letraL'+cantidadOpcionesGlosario[11]+'" class="textosGlosario"><input type="text" id="significadoL'+cantidadOpcionesGlosario[11]+'" class="textosGlosario">').insertAfter($("#significadoL"+(cantidadOpcionesGlosario[11]-1)));
	});

    
    $("#botonM").click(function(){ 
		cantidadOpcionesGlosario[12]++; 
		$('<input type="text" id="letraM'+cantidadOpcionesGlosario[12]+'" class="textosGlosario"><input type="text" id="significadoM'+cantidadOpcionesGlosario[12]+'" class="textosGlosario">').insertAfter($("#significadoM"+(cantidadOpcionesGlosario[12]-1)));
	});

    
    $("#botonN").click(function(){ 
		cantidadOpcionesGlosario[13]++; 
		$('<input type="text" id="letraN'+cantidadOpcionesGlosario[13]+'" class="textosGlosario"><input type="text" id="significadoN'+cantidadOpcionesGlosario[13]+'" class="textosGlosario">').insertAfter($("#significadoN"+(cantidadOpcionesGlosario[13]-1)));
	});

    
    $("#botonO").click(function(){ 
		cantidadOpcionesGlosario[14]++; 
		$('<input type="text" id="letraO'+cantidadOpcionesGlosario[14]+'" class="textosGlosario"><input type="text" id="significadoO'+cantidadOpcionesGlosario[14]+'" class="textosGlosario">').insertAfter($("#significadoO"+(cantidadOpcionesGlosario[14]-1)));
	});

    
    $("#botonP").click(function(){ 
		cantidadOpcionesGlosario[15]++; 
		$('<input type="text" id="letraP'+cantidadOpcionesGlosario[15]+'" class="textosGlosario"><input type="text" id="significadoP'+cantidadOpcionesGlosario[15]+'" class="textosGlosario">').insertAfter($("#significadoP"+(cantidadOpcionesGlosario[15]-1)));
	});

    
    $("#botonQ").click(function(){ 
		cantidadOpcionesGlosario[16]++; 
		$('<input type="text" id="letraQ'+cantidadOpcionesGlosario[16]+'" class="textosGlosario"><input type="text" id="significadoQ'+cantidadOpcionesGlosario[16]+'" class="textosGlosario">').insertAfter($("#significadoQ"+(cantidadOpcionesGlosario[16]-1)));
	});

    
    $("#botonR").click(function(){ 
		cantidadOpcionesGlosario[17]++; 
		$('<input type="text" id="letraR'+cantidadOpcionesGlosario[17]+'" class="textosGlosario"><input type="text" id="significadoR'+cantidadOpcionesGlosario[17]+'" class="textosGlosario">').insertAfter($("#significadoR"+(cantidadOpcionesGlosario[17]-1)));
	});

    
    $("#botonS").click(function(){ 
		cantidadOpcionesGlosario[18]++; 
		$('<input type="text" id="letraS'+cantidadOpcionesGlosario[18]+'" class="textosGlosario"><input type="text" id="significadoS'+cantidadOpcionesGlosario[18]+'" class="textosGlosario">').insertAfter($("#significadoS"+(cantidadOpcionesGlosario[18]-1)));
	});

    
    $("#botonT").click(function(){ 
		cantidadOpcionesGlosario[19]++; 
		$('<input type="text" id="letraT'+cantidadOpcionesGlosario[19]+'" class="textosGlosario"><input type="text" id="significadoT'+cantidadOpcionesGlosario[19]+'" class="textosGlosario">').insertAfter($("#significadoT"+(cantidadOpcionesGlosario[19]-1)));
	});

    
    $("#botonU").click(function(){ 
		cantidadOpcionesGlosario[20]++; 
		$('<input type="text" id="letraU'+cantidadOpcionesGlosario[20]+'" class="textosGlosario"><input type="text" id="significadoU'+cantidadOpcionesGlosario[20]+'" class="textosGlosario">').insertAfter($("#significadoU"+(cantidadOpcionesGlosario[20]-1)));
	});

    
    $("#botonV").click(function(){ 
		cantidadOpcionesGlosario[21]++; 
		$('<input type="text" id="letraV'+cantidadOpcionesGlosario[21]+'" class="textosGlosario"><input type="text" id="significadoV'+cantidadOpcionesGlosario[21]+'" class="textosGlosario">').insertAfter($("#significadoV"+(cantidadOpcionesGlosario[21]-1)));
	});

    
    $("#botonW").click(function(){ 
		cantidadOpcionesGlosario[22]++; 
		$('<input type="text" id="letraW'+cantidadOpcionesGlosario[22]+'" class="textosGlosario"><input type="text" id="significadoW'+cantidadOpcionesGlosario[22]+'" class="textosGlosario">').insertAfter($("#significadoW"+(cantidadOpcionesGlosario[22]-1)));
	});

    
    $("#botonX").click(function(){ 
		cantidadOpcionesGlosario[23]++; 
		$('<input type="text" id="letraX'+cantidadOpcionesGlosario[23]+'" class="textosGlosario"><input type="text" id="significadoX'+cantidadOpcionesGlosario[23]+'" class="textosGlosario">').insertAfter($("#significadoX"+(cantidadOpcionesGlosario[23]-1)));
	});

    
    $("#botonY").click(function(){ 
		cantidadOpcionesGlosario[24]++; 
		$('<input type="text" id="letraY'+cantidadOpcionesGlosario[24]+'" class="textosGlosario"><input type="text" id="significadoY'+cantidadOpcionesGlosario[24]+'" class="textosGlosario">').insertAfter($("#significadoY"+(cantidadOpcionesGlosario[24]-1)));
	});

    
    $("#botonZ").click(function(){ 
		cantidadOpcionesGlosario[25]++; 
		$('<input type="text" id="letraZ'+cantidadOpcionesGlosario[25]+'" class="textosGlosario"><input type="text" id="significadoZ'+cantidadOpcionesGlosario[25]+'" class="textosGlosario">').insertAfter($("#significadoZ"+(cantidadOpcionesGlosario[25]-1)));
	});


	$("#generarGlosario").click(function(){
		var letraA='';
        var letraB='';
        var letraC='';
        var letraD='';
        var letraE='';
        var letraF='';
        var letraG='';
        var letraH='';
        var letraI='';
        var letraJ='';
        var letraK='';
        var letraL='';
        var letraM='';
        var letraN='';
        var letraO='';
        var letraP='';
        var letraQ='';
        var letraR='';
        var letraS='';
        var letraT='';
        var letraU='';
        var letraV='';
        var letraW='';
        var letraX='';
        var letraY='';
        var letraZ='';
        
		for(i=1;i<=cantidadOpcionesGlosario[0];i++){
			letraA+='"'+$('#letraA'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoA'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraA=letraA.trim().substring(0,letraA.length-1);

		for(i=1;i<=cantidadOpcionesGlosario[1];i++){
			letraB+='"'+$('#letraB'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoB'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraB=letraB.trim().substring(0,letraB.length-1);
				
		for(i=1;i<=cantidadOpcionesGlosario[2];i++){
			letraC+='"'+$('#letraC'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoC'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraC=letraC.trim().substring(0,letraC.length-1);
		
				for(i=1;i<=cantidadOpcionesGlosario[3];i++){
			letraD+='"'+$('#letraD'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoD'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraD=letraD.trim().substring(0,letraD.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[4];i++){
			letraE+='"'+$('#letraE'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoE'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraE=letraE.trim().substring(0,letraE.length-1);

		for(i=1;i<=cantidadOpcionesGlosario[5];i++){
			letraF+='"'+$('#letraF'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoF'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraF=letraF.trim().substring(0,letraF.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[6];i++){
			letraG+='"'+$('#letraG'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoG'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraG=letraG.trim().substring(0,letraG.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[7];i++){
			letraH+='"'+$('#letraH'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoH'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraH=letraH.trim().substring(0,letraH.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[8];i++){
			letraI+='"'+$('#letraI'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoI'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraI=letraI.trim().substring(0,letraI.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[9];i++){
			letraJ+='"'+$('#letraJ'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoJ'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraJ=letraJ.trim().substring(0,letraJ.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[10];i++){
			letraK+='"'+$('#letraK'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoK'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraK=letraK.trim().substring(0,letraK.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[11];i++){
			letraL+='"'+$('#letraL'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoL'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraL=letraL.trim().substring(0,letraL.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[12];i++){
			letraM+='"'+$('#letraM'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoM'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraM=letraM.trim().substring(0,letraM.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[13];i++){
			letraN+='"'+$('#letraN'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoN'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraN=letraN.trim().substring(0,letraN.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[14];i++){
			letraO+='"'+$('#letraO'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoO'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraO=letraO.trim().substring(0,letraO.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[15];i++){
			letraP+='"'+$('#letraP'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoP'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraP=letraP.trim().substring(0,letraP.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[16];i++){
			letraQ+='"'+$('#letraQ'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoQ'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraQ=letraQ.trim().substring(0,letraQ.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[17];i++){
			letraR+='"'+$('#letraR'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoR'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraR=letraR.trim().substring(0,letraR.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[18];i++){
			letraS+='"'+$('#letraS'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoS'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraS=letraS.trim().substring(0,letraS.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[19];i++){
			letraT+='"'+$('#letraT'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoT'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraT=letraT.trim().substring(0,letraT.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[20];i++){
			letraU+='"'+$('#letraU'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoU'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraU=letraU.trim().substring(0,letraU.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[21];i++){
			letraV+='"'+$('#letraV'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoV'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraV=letraV.trim().substring(0,letraV.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[22];i++){
			letraW+='"'+$('#letraW'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoW'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraW=letraW.trim().substring(0,letraW.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[23];i++){
			letraX+='"'+$('#letraX'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoX'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraX=letraX.trim().substring(0,letraX.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[24];i++){
			letraY+='"'+$('#letraY'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoY'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraY=letraY.trim().substring(0,letraY.length-1);
		
		for(i=1;i<=cantidadOpcionesGlosario[25];i++){
			letraZ+='"'+$('#letraZ'+i).val().replace(/"/g,'\\"')+'##'+$('#significadoZ'+i).val().replace(/"/g,'\\"')+'",';
		}

		letraZ=letraZ.trim().substring(0,letraZ.length-1);
						

		var resultadoGlosario='opcionesGlosario = ['+
		                    '["A",'+letraA+'],'+ 
		                    '["B",'+letraB+'],'+ 
		                    '["C",'+letraC+'],'+ 
		                    '["D",'+letraD+'],'+ 
		                    '["E",'+letraE+'],'+ 
		                    '["F",'+letraF+'],'+ 
		                    '["G",'+letraG+'],'+ 
		                    '["H",'+letraH+'],'+ 
		                    '["I",'+letraI+'],'+ 
		                    '["J",'+letraJ+'],'+ 
		                    '["K",'+letraK+'],'+ 
		                    '["L",'+letraL+'],'+ 
		                    '["M",'+letraM+'],'+ 
		                    '["N",'+letraN+'],'+ 
		                    '["O",'+letraO+'],'+ 
		                    '["P",'+letraP+'],'+ 
		                    '["Q",'+letraQ+'],'+ 
		                    '["R",'+letraR+'],'+ 
		                    '["S",'+letraS+'],'+ 
		                    '["T",'+letraT+'],'+ 
		                    '["U",'+letraU+'],'+ 
		                    '["V",'+letraV+'],'+ 
		                    '["W",'+letraW+'],'+ 
		                    '["X",'+letraX+'],'+ 
		                    '["Y",'+letraY+'],'+ 
		                    '["Z",'+letraZ+']'+ 
							'];';

		$("#resultadoGlosario").val(resultadoGlosario);	
	});

	$("#borrarGlosario").click(function(){
		$("#resultadoGlosario").val("");	
	});	

	$("#resultadoGlosario").click(function(){
		$("#resultadoGlosario").select();	
	});

	/******************FIN GLOSARIO******************/
	
	/******************INICIO PAGINA******************/

	    var cantidadBotonesOpciones=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    	var cantidadOpciones=1;        
        
        function crearOpciones(idOpcion,numeroOpcion){
				$('<label for="opcion'+numeroOpcion+'Pantalla'+idOpcion+'">Opción '+numeroOpcion+' Pantalla '+idOpcion+':</label><input type="text" id="opcion'+numeroOpcion+'Pantalla'+idOpcion+'" class="textos">').insertAfter($("#opcion"+(numeroOpcion-1)+"Pantalla"+idOpcion+""));
		}	    

		$("#agregar1OpcionPrincipal").click(function(){			
			cantidadBotonesOpciones[0]++;
	        crearOpciones(1,cantidadBotonesOpciones[0]);
	    });    

		$("#agregarOpcionPantalla").click(function(){					
			cantidadOpciones++;
			$('<label for="opcion'+cantidadOpciones+'Menu">Texto Opción '+cantidadOpciones+':</label><input type="radio" name="tipoOpcion'+cantidadOpciones+'" value="A" class="radioOp"><span class="radioOp"> Actividad</span> <input type="radio" name="tipoOpcion'+cantidadOpciones+'" value="P" class="radioOp"><span class="radioOp"> Practica</span><input type="text" id="opcion'+cantidadOpciones+'Menu" class="textosCortosSmall"><label for="opcion1Pantalla'+cantidadOpciones+'">Opción 1 Pantalla '+cantidadOpciones+':</label><button type="button" id="agregar'+cantidadOpciones+'OpcionPrincipal" class="botonesCortos">+</button><input type="text" id="opcion1Pantalla'+cantidadOpciones+'" class="textosCortos">').insertAfter($("#opcion"+cantidadBotonesOpciones[cantidadOpciones-2]+"Pantalla"+(cantidadOpciones-1)));
            
			$("#agregar"+cantidadOpciones+"OpcionPrincipal").click(function(){			
				cantidadBotonesOpciones[cantidadOpciones-1]++;
		        crearOpciones(cantidadOpciones,cantidadBotonesOpciones[cantidadOpciones-1]);
		    });    
		});

		$("#generarPagina").click(function(){
			opciones='';
        
	        for(i=1;i<=cantidadOpciones;i++){ 

	        	tipoLetra=$("input:radio[name=tipoOpcion"+i+"]:checked").val();		
				opciones+='["'+tipoLetra+'","'+$("#opcion"+i+"Menu").val().replace(/"/g,'\\"')+'",';
				for(k=1;k<=cantidadBotonesOpciones[i-1];k++){ 
					opciones+=$("#opcion"+k+"Pantalla"+i).val()+',';
				}
				
				opciones=opciones.trim().substring(0,opciones.length-1);		
				opciones+='],';
			}
			opciones=opciones.trim().substring(0,opciones.length-1);

	        var resultadoPagina='var opcionesMenu=['+
            					''+opciones+''+
	        					'];';

	        $("#resultadoPagina").val(resultadoPagina);	
		});	

		$("#borrarPagina").click(function(){
			$("#resultadoPagina").val("");	
		});	

		$("#resultadoPagina").click(function(){
			$("#resultadoPagina").select();	
		});
		/******************FIN PAGINA******************/
});

function openPantalla(evt, tipo) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tipo).style.display = "block";
    evt.currentTarget.className += " active";
}