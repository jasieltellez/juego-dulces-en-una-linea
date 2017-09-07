/*Funcion de Carga Inicial del Juego*/
function limpiarTablero(){
  for (var h = 1; h < 8; h++) {
    var cl=  $(".col-"+h)[0]
    $(cl).empty()
  }
}
/*Genera los 49 elementos del tablero Inicial*/
function llenarTablero(){
  for (var i = 1; i <8; i++) {
    for (var j = 0; j < 7; j++) {
      var tipoDulce= Math.floor((Math.random() * 4) + 1);
      var aux=document.createElement('img')
      $(".col-"+i)[0].append(aux)
      $(aux).addClass('elemento')
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


  alert(contVertical)
  alert(contHorizontal)
  /*Eliminando los iguales*/
  var eliminados=$('.checked')
  for (var i = 0; i < eliminados.length; i++) {
    eliminados[i].remove()
  }
  /*Rellenando*/
}



  $(document).ready(function(){


    $('#start').on('click',function(){
      var est=$('.btn-reinicio')[0]
      if ($(est).text()=='Iniciar') {
        $(est).text('Reiniciar')
      }
      limpiarTablero()
      llenarTablero()
      var t=  cargarMatriz()
      verificarEliminaciones(t)
    })

  })
