var interval;

window.onload = () => {

   // if (document.getElementById('nome').value != null) {
   //    console.log(document.getElementById('nome').value);
   //    var giocatore = document.getElementById('nome').value;
   // }

}

function startGame() {
   if (document.getElementById('name').value.trim() == '') {
      alert('Per poter giocare devi inserire un nome');
   } else {
      var giocatore = document.getElementById('name').value;

      // var timer = 0;
      startTimer(timer);
      // rendi le tile cliccabili e da lì gioca
   }
}

function stopGame() {
   // se il gioco non è mai partito, ciccia
   // se era partito, salva il tempo e il giocatore nel locale storage in forma {giocatore: tempo}
   stopTimer();

}

function startTimer() {
   // this.idInterval = setInterval(() => {
   //    this.timer++;
   //    document.getElementById('time-elapsed').innerText(this.timer + ' sec');
   // }, 1000);
}

function startTimer() {
   var seconds = 0;
   var minutes = 0;
   var timer = document.getElementById('timer');
   interval = setInterval(function () {
      timer.innerHTML = minutes + ':' + seconds;
      seconds++;
      if (seconds == 60) {
         minutes++;
         seconds = 0;
      }
      if (minutes == 60) {
         hour++;
         minutes = 0;
      }
   }, 1000);
}

function stopTimer() {
   clearInterval(interval);
   timer.innerHTML = 0 + ':' + 0;
}