



/*Funcion de parpadeo cada 1 segundo*/
function Parpadeo(){
  var MTittle=$('h1.main-titulo')[0]
  if($(MTittle).css('color')=="rgb(220, 255, 14)"){
    $(MTittle).css('color','white')
  }
  else{
    $(MTittle).css('color',"rgb(220, 255, 14)")
  }
}
