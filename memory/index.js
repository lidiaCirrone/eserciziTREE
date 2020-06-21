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

var clickedTiles = [];


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

      // TODO pointer cursor on .tile-front

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

function resetGame() {
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
   empty(tileContainer);

   let shuffledColors = shuffleColors(colors);
   // console.log('--- shuffledColors ---');
   // console.log(shuffledColors);

   for (let i = 0; i < shuffledColors.length; i++) {
      let tileColor = shuffledColors[i];
      let tile = new Tile(tileColor, i);
      let tileDOM = createTile(tile, tileColor, i);
      // console.log('--- tileDOM ---');
      // console.log(tileDOM);
      // console.log('--- tile object ---');
      // console.log(tile);

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

function createTile(tileObject, color, index) {
   let tile = document.createElement('div');
   tile.classList.add('col', 'col-3', 'tile');

   let tileFront = document.createElement('div');
   tileFront.classList.add('tile-front');
   tile.appendChild(tileFront);
   let tileBack = document.createElement('div');
   tileBack.classList.add('tile-back');
   tile.appendChild(tileBack);


   tile.onclick = function () { flipTile(tile, tileObject) };
   return tile;
}

function Tile(color, index) {
   this.color = color;
   this.index = index;
}

function flipTile(tileDOM, tileObj) {
   // console.log(tileDOM);
   // console.log(tileObj);

   let clickedTile = {
      dom: tileDOM,
      object: tileObj
   }
   clickedTiles.push(clickedTile);
   // console.log(' --- clickedTiles ---');
   // console.log(clickedTiles);

   var firstTile = clickedTiles[0];

   let tileFront = tileDOM.querySelector('.tile-front');
   let tileBack = tileDOM.querySelector('.tile-back');

   // tileFront.innerHTML = tileObj.index;
   tileBack.style.backgroundColor = tileObj.color;


   // interval prima di girarle?
   toggleVisibility(tileFront);
   toggleVisibility(tileBack);


   // tileFront.toggle('disabled');
   tileDOM.style.pointerEvents = 'none';



   console.log('clickedTile object');
   console.log(clickedTile);

   console.log('clickedTiles array');
   console.log(clickedTiles);

   console.log('firstTile object');
   console.log(firstTile);



   if (clickedTiles.length == 2) {
      if (firstTile.object.color == tileObj.color) {
         console.log(tileObj.color);
         console.log('matched');

         //svuoto l'array

      } else {
         console.log(firstTile.object.color);
         console.log(tileObj.color);
         console.log('NOT matched');

         // riabilito entrambe
         firstTile.dom.style.pointerEvents = 'none';
         tileDOM.style.pointerEvents = 'none';

         // svuoto l'array


         //  TODO interval prima di rigirarle sennò non vedo il colore
         toggleVisibility(tileFront);
         toggleVisibility(tileBack);
      }

   }
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

function setDisabled(element) {
   element.disabled = true;
}

function removeDisabled(element) {
   element.disabled = false;
}

function empty(element) {
   element.innerHTML = '';
}

function emptyInput(element) {
   element.value = '';
}

function toggleVisibility(element) {
   // console.log('element, before');
   // console.log(element);

   // let visibility = element.style.display;
   let visibility = window.getComputedStyle(element).getPropertyValue('display');

   // console.log('visibility, before');
   // console.log(visibility);

   visibility == 'block' ? element.style.display = 'none' : element.style.display = 'block';


   // if (visibility == 'block')
   //    element.style.display = 'none';
   // else
   //    element.style.display = 'block';

   // console.log('visibility, after');
   // console.log(visibility);

   // console.log('element, after');
   // console.log(element);
}