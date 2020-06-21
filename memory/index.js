var interval;
var colors = [
   'ff0900',
   'ff0900',
   'ffa000',
   'ffa000',
   'ffef00',
   'ffef00',
   '00f11d',
   '00f11d',
   '00ffee',
   '00ffee',
   '0079ff',
   '0079ff',
   'ab5b00',
   'ab5b00',
   'ff00f5',
   'ff00f5'
];

var playerNameContainer = document.getElementById('name');
var timer = document.getElementById('timer');
var tileContainer = document.getElementById('tile-container');

var tileObjectsArray = [];
var clickedTiles = [];
var matchedTiles = 0;

function startGame() {
   if (playerNameContainer.value.trim() == '') {
      alert('Per poter giocare devi inserire un nome');
   } else {
      startTimer(timer);
      setDisabled(playerNameContainer);
      setDisabled(startButton);
      removeDisabled(stopButton);
      setDisabled(resetButton);
      generateTiles('pointer');
   }
}

function stopGame() {
   // prompt di conferma?
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

   // resetto senza stare a fare lo shuffle?
   generateTiles('auto');
}



// tiles functions

function generateTiles(cursor) {
   empty(tileContainer);

   let shuffledColors = shuffleColors(colors);

   for (let i = 0; i < shuffledColors.length; i++) {
      let tileColor = shuffledColors[i];
      let tileDOM = createTile(cursor);
      let tileObject = {
         dom: tileDOM,
         color: tileColor,
         index: i
      }

      tileObjectsArray.push(tileObject);
      tileDOM.onclick = function () { flipTile(tileObject.dom, tileObject.color) };
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

function createTile(cursor) {
   let tile = document.createElement('div');
   tile.classList.add('col', 'col-3', 'tile');

   let tileFront = document.createElement('div');
   tileFront.classList.add('tile-front');
   tileFront.style.cursor = cursor;
   tile.appendChild(tileFront);

   let tileBack = document.createElement('div');
   tileBack.classList.add('tile-back');
   tileBack.style.cursor = cursor;
   tile.appendChild(tileBack);

   return tile;
}

// function Tile(color, index) {
//    this.color = color;
//    this.index = index;
// }

function flipTile(tileDOM, colorCode) {

   tileDOM.classList.add('shown');

   let newTile = {
      dom: tileDOM,
      color: colorCode
   }

   clickedTiles.push(newTile);

   var firstTile = clickedTiles[0];

   let firstTileFront = firstTile.dom.querySelector('.tile-front');
   let firstTileBack = firstTile.dom.querySelector('.tile-back');

   let tileFront = tileDOM.querySelector('.tile-front');
   let tileBack = tileDOM.querySelector('.tile-back');

   tileBack.style.backgroundColor = colorCode;

   toggleVisibility(tileFront);
   toggleVisibility(tileBack);

   tileDOM.style.pointerEvents = 'none';

   if (clickedTiles.length == 2) {
      if (firstTile.color == newTile.color) {

         setTimeout(() => {
            firstTile.dom.style.opacity = 0.3;
            newTile.dom.style.opacity = 0.3;
         }, 500);

         matchedTiles += 2;

      } else {
         firstTile.dom.style.pointerEvents = 'auto';
         tileDOM.style.pointerEvents = 'auto';

         setTimeout(() => {
            toggleVisibility(firstTileFront);
            toggleVisibility(tileFront);
            toggleVisibility(firstTileBack);
            toggleVisibility(tileBack);
         }, 500);
      }

      clickedTiles = [];

   }

   if (matchedTiles == tileObjectsArray.length) {

      // salva giocatore in localStorage

      let time = timer.innerHTML;

      setTimeout(() => {
         alert(`Partita completata! Tempo impiegato: ${time}`);
         resetGame();
      }, 1000);
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
   let visibility = window.getComputedStyle(element).getPropertyValue('display');
   visibility == 'block' ? element.style.display = 'none' : element.style.display = 'block';
}