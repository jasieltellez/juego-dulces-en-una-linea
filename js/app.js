


$(document).ready(function(){
  var puntuacion=$('#score-text').text()
  var mov1X,mov1Y,mov2X,mov2Y
  var imagen1,imagen2

  $('#start').on('click',function(){
    var est=$('.btn-reinicio')[0]
    if ($(est).text()=='Iniciar') {
      $(est).text('Reiniciar')
    }
    else {
      if ($('#panel-score').hasClass('gameover')) {
        $('#panel-tablero').show('drop',1000,function(){
          $('#panel-score')
          .animate({
            width:"25%",

          })
          $('#panel-score').removeClass('gameover')
        })
      }
    }
    limpiarTablero()
    llenarTablero()
    var t= cargarMatriz()
    verificarEliminaciones(t)
  })
  //A partir de aqui empiezan las funciones
  /*Funcion de Carga Inicial del Juego*/
  function limpiarTablero(){
    for (var h = 1; h < 8; h++) {
      var cl=  $(".col-"+h)[0]
      $(cl).empty()
    }
    $('#score-text').text('0')
  }
  /*Genera los 49 elementos del tablero Inicial*/
  function llenarTablero(){
    for (var i = 1; i <8; i++) {
      for (var j = 0; j < 7; j++) {
        var tipoDulce= Math.floor((Math.random() * 4) + 1);
        var aux=document.createElement('img')
        $(".col-"+i)[0].append(aux)
        $(aux).addClass('elemento')
        $(aux).draggable({
          drag: function(event,ui){
            drag(event,ui)},
          revert:"invalid"

        })
        $(aux).droppable({
          drop: function(event,ui){
            drop(event,ui)
          }
        });
        $(aux).attr('src',"image/"+tipoDulce+".png")
      }
    }

  }
  /*Cargar Matriz Principal*/
  function cargarMatriz(){
    var mTablero= new Array(7)
    var columna1=$('.col-1 img.elemento')
    var columna2=$('.col-2 img.elemento')
    var columna3=$('.col-3 img.elemento')
    var columna4=$('.col-4 img.elemento')
    var columna5=$('.col-5 img.elemento')
    var columna6=$('.col-6 img.elemento')
    var columna7=$('.col-7 img.elemento')
    mTablero=[columna1,columna2,columna3,columna4,columna5,columna6,columna7]
    return mTablero
  }

  /*Verificar Si hay posibles eliminaciones*/
  function verificarEliminaciones(mTablero){
    var contVertical=0
    var contHorizontal=0
    for (var col = 0; col < 7; col++) {
      for (var fila = 0;fila < 5; fila++) {
        var pivo=mTablero[col][fila]
        var pivoVSegundo=mTablero[col][fila+1]
        var pivoVTercero=mTablero[col][fila+2]
        if ((pivo.src==pivoVSegundo.src)&&(pivo.src==pivoVTercero.src)) {

          if(!$(pivo).hasClass('checked')){
            $(pivo).addClass('checked')
            contVertical++
          }
          if(!$(pivoVSegundo).hasClass('checked')){
            $(pivoVSegundo).addClass('checked')
            contVertical++
          }
          if(!$(pivoVTercero).hasClass('checked')){
            $(pivoVTercero).addClass('checked')
            contVertical++
          }
        }


      }
    }
    /*Recorrido horizontal*/
    for (var col = 0; col < 5; col++) {
      for (var fila = 0;fila < 7; fila++) {
        var pivoH=mTablero[col][fila]
        var pivoHSegundo=mTablero[col+1][fila]
        var pivoHTercero=mTablero[col+2][fila]
        if ((pivoH.src==pivoHSegundo.src)&&(pivoH.src==pivoHTercero.src)) {

          if(!$(pivoH).hasClass('checked')){
            $(pivoH).addClass('checked')
            contHorizontal++
          }
          if(!$(pivoHSegundo).hasClass('checked')){
            $(pivoHSegundo).addClass('checked')
            contHorizontal++
          }
          if(!$(pivoHTercero).hasClass('checked')){
            $(pivoHTercero).addClass('checked')
            contHorizontal++
          }
        }


      }
    }

    if (contVertical!=0||contHorizontal!=0) {

      $('#score-text').text(parseFloat($('#score-text').text())+contHorizontal+contVertical)

      /*Eliminando los iguales*/
      var eliminados=$('.checked')

      for (var item of eliminados) {
        $(item).hide('pulsate',1000)

      }
      setTimeout(function(){
        for (var item of eliminados) {
          //Rellenando
          item.remove()
        }
        /*Rellenando*/
        mTablero=cargarMatriz()
        for (var col = 0; col < 7; col++) {
          var lim=7 - mTablero[col].length
          var extra=col+1
          for (var im = 0; im < lim; im++) {
            var tipoDulce= Math.floor((Math.random() * 4) + 1);
            var aux=document.createElement('img')

            $(".col-"+extra)[0].prepend(aux)
            $(aux).hide();
            $(aux).addClass('elemento')
            $(aux).draggable({
              drag: function(event,ui){
                drag(event,ui)},
              revert:"invalid"

            })
            $(aux).droppable({
              drop: function(event,ui){
                drop(event,ui)
              }
            });
            $(aux).attr('src',"image/"+tipoDulce+".png")
            $(aux).show("slide", { direction: "up" }, 700);
          }
        }
        mTablero=cargarMatriz()
        verificarEliminaciones(mTablero)
      },1000)


    }


  }
  function gameover(){
    $('#panel-tablero').hide('drop',1000,function(){
      $('#panel-score')
      .animate({
        width:"100%",

      })
      $('#panel-score').addClass('gameover')
    })
  }

  /*Funciones para el drag and drop*/
  /*var mov1X,mov1Y,mov2X,mov2Y
  var imagen1,imagen2*/
  function drag(event,ui) {

    mov1X=event.pageX
    mov1Y=event.pageY
    imagen1=event.target

  }

  function drop(event,ui) {
    var c=$(ui.draggable)[0]
    imagen2=$(c).clone()
    $(imagen2).draggable({
      drag: function(event,ui){
        drag(event,ui)},
      revert:"invalid"

    })
    $(imagen2).droppable({
      drop: function(event,ui){
        drop(event,ui)
      }
    });

   $(event.target).before(imagen2)
   $(event.target).replaceAll(ui.draggable[0])
   $(imagen2).css("position","")
   var tb=cargarMatriz()
   verificarEliminaciones(tb)
  }

})
