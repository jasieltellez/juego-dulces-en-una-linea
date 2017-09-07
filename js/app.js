/*Funcion de Carga Inicial del Juego*/
function limpiarTablero(){
  for (var h = 1; h < 8; h++) {
  var cl=  $(".col-"+h)[0]
  $(cl).empty()
  }
}
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




$(document).ready(function(){


  $('#start').on('click',function(){
    var est=$('.btn-reinicio')[0]
    if ($(est).text()=='Iniciar') {
         $(est).text('Reiniciar')
    }
    limpiarTablero()
    llenarTablero()

  })

})
