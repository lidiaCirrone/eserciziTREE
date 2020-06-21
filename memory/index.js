var interval;
var colors = [
   'ff0900',
   'ff0900',
   'ffa000',
   'ffa000',
   // 'ff7f00',
   // 'ff7f00',
   'ffef00',
   'ffef00',
   '00f11d',
   '00f11d',
   '00ffee',
   '00ffee',
   // '00f5ff',
   // '00f5ff',
   // '2e00ff',
   // '2e00ff',
   '0079ff',
   '0079ff',
   'ab5b00',
   'ab5b00',
   // '9e9e9e',
   // '9e9e9e',
   // 'a800ff',
   // 'a800ff',
   'ff00f5',
   'ff00f5'
];

// var startButton = document.getElementById('startButton');
// var stopButton = document.getElementById('stopButton');
// console.log('--- startButton ---');
// console.log(startButton);
// console.log('--- stopButton ---');
// console.log(stopButton);
// console.log('--- resetButton ---');
// console.log(resetButton);
var playerNameContainer = document.getElementById('name');
var tileContainer = document.getElementById('tile-container');


// var colors = {
//    red: 'ff0900',
//    orange: 'ff7f00',
//    yellow: 'ffef00',
//    green: '00f11d',
//    aqua: '00f5ff',
//    blue: '0079ff',
//    violet: 'a800ff',
//    fuchsia: 'ff00f5'
// };

window.onload = () => {
   // var startButton = document.getElementById('startButton');
   // var stopButton = document.getElementById('stopButton');

   // var tileContainer = document.getElementById('tile-container');
   // console.log('--- container all onload ---');
   // console.log(tileContainer);

}

function startGame() {
   if (playerNameContainer.value.trim() == '') {
      alert('Per poter giocare devi inserire un nome');
   } else {
      startTimer(timer);
      setDisabled(playerNameContainer);
      setDisabled(startButton);
      removeDisabled(stopButton);
      setDisabled(resetButton);

      // genera tile (shuffle)
      generateTiles();

      // rendi le tile cliccabili e da lì gioca
      // stoppa il tempo alla vincita
   }
}

function stopGame() {
   // se il gioco non è mai partito, ciccia --> pulsante disabled, controllo comunque?
   // se era partito, salva il tempo e il giocatore nel locale storage in forma {giocatore: tempo}
   stopTimer();

   
   removeDisabled(startButton);
   setDisabled(stopButton);
   // doppione di resetGame()?
   emptyInput(playerNameContainer);

   // resetto solo le tile ma lasciando lo spazio per tile di default?
   empty(tileContainer);

}

function resetGame(){
   stopTimer();
   emptyInput(playerNameContainer);

   // resetto solo le tile ma lasciando lo spazio per tile di default?
   empty(tileContainer);
}



// tiles functions

function generateTiles() {
   // let card = document.getElementsByClassName('tile');
   // console.log('let card');
   // console.log(card);

   // let tileContainer = document.getElementById('tile-container');
   // console.log('--- container nella funzione generateTiles ---');
   // console.log(tileContainer);
   // empty container


   // resetto solo le tile ma lasciando lo spazio per tile di default?
   console.log(tileContainer);
   empty(tileContainer);

   let shuffledColors = shuffleColors(colors);
   // console.log('--- shuffledColors ---');
   // console.log(shuffledColors);

   for (let i = 0; i < shuffledColors.length; i++) {
      let tileColor = shuffledColors[i];
      let tile = new Tile(tileColor, i);
      let tileDOM = createTile(tileColor, i);
      // console.log('--- tileDOM ---');
      // console.log(tileDOM);
      console.log('--- tile object ---');
      console.log(tile);

      // fill container with new tiles
      tileContainer.appendChild(tileDOM);
   }


}

function shuffleColors(colors) {
   let j, x, i;
   for (i = colors.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = colors[i];
      colors[i] = colors[j];
      colors[j] = x;
   }
   return colors;
}

function createTile(color, index) {
   let tile = document.createElement('div');
   tile.classList.add('col', 'col-3', 'tile');
   // tile.innerHTML = index;
   // tile.style.backgroundColor = color;
   return tile;
}

function Tile(color, index) {
   this.color = color;
   this.index = index;
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
      if (seconds < 10) { timerText = `0${minutes}:0${seconds}`; }
      timer.innerHTML = timerText;
   }, 1000);
}

function stopTimer() {
   clearInterval(interval);
   timer.innerHTML = '00:00';
}



// shortcut functions

function setDisabled(button) {
   button.disabled = true;
}

function removeDisabled(button) {
   button.disabled = false;
}

function empty(domElement){
   domElement.innerHTML = '';
}

function emptyInput(domElement){
   domElement.value = '';
}