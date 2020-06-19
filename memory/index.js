var interval;

window.onload = () => {
   var startButton = document.getElementById('startButton');
   var stopButton = document.getElementById('stopButton');
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



// timer functions

function startTimer() {
   var seconds = 0;
   var minutes = 0;
   var timer = document.getElementById('timer');
   interval = setInterval(function () {
      seconds++;
      if (seconds == 60) {
         minutes++;
         seconds = 0;
      }
      let timerText = `0${minutes}:${seconds}`;
      if (seconds < 10) { timerText = `0${minutes}:0${seconds}` }
      timer.innerHTML = timerText;
   }, 1000);
   setDisabled(startButton);
   removeDisabled(stopButton);
}

function stopTimer() {
   clearInterval(interval);
   timer.innerHTML = '00:00';
   removeDisabled(startButton);
   setDisabled(stopButton);
}



// shortcut functions

function setDisabled(button) {
   button.disabled = true;
}

function removeDisabled(button) {
   button.disabled = false;
}