var a =new function(){//Efecto de cambio de color del titulo pricipal
  setInterval(function(){
    var t=$(".main-titulo")[0]
    $(t).toggleClass('light')
  }, 1000);
}

var reloj //variable que accedera a todas las funciones del timer
function startTime(interv){

  reloj = new (function() {
    var $countdown,

    incrementTime = 70,
    currentTime = interv,
    updateTimer = function() {
      $countdown.html(formatTime(currentTime));
      if (currentTime == 0) {
        reloj.Timer.stop();
        timerComplete();
        reloj.resetCountdown();
        return;
      }
      currentTime -= incrementTime / 10;
      if (currentTime < 0) currentTime = 0;
    },
    timerComplete = function() {

      $('#panel-tablero').hide('drop',1000,function(){
        $('#panel-score').animate({ width:"100%"},"slow")
        $('#panel-score').addClass('gameover')
        $('#time-over').show()
      })




    },
    init = function() {
      $countdown = $('#timer');
      reloj.Timer = $.timer(updateTimer, incrementTime, true);

    };
    this.resetCountdown = function() {
      var newTime =12000 ;
      if (newTime > 0) {currentTime = newTime;}
      this.Timer.stop().once();
    };




    // Common functions
    function pad(number, length) {
      var str = '' + number;
      while (str.length < length) {str = '0' + str;}
      return str;
    }
    function formatTime(time) {
      var min = parseInt(time / 6000),
      sec = parseInt(time / 100) - (min * 60),
      hundredths = pad(time - (sec * 100) - (min * 6000), 2);
      return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) ;
    }
    $(init);
  });

}
