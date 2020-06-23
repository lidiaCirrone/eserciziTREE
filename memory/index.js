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
var winnersContainer = document.getElementById('winners');
var tileContainer = document.getElementById('tile-container');

var tileObjectsArray = [];
var clickedTiles = [];
var matchedTiles = 0;
var winners = [];
var winnersLs = window.localStorage.getItem('winners');

var seconds = 0;
var minutes = 0;
var timer = document.getElementById('timer');



// --------------------
// ------- GAME -------
// --------------------

function startGame() {
   if (playerNameContainer.value.trim() == '') {
      alert('Per poter giocare devi inserire un nome');
   } else if (winners.find(e => e['name'] == playerNameContainer.value.trim())) {
      alert('Giocatore già presente in classifica');
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

   let confirmStop = confirm('Vuoi davvero interrompere la partita?');
   if (confirmStop) {

      resetGame();

      removeDisabled(playerNameContainer);
      removeDisabled(startButton);
      setDisabled(stopButton);
      removeDisabled(resetButton);
   }

}

function resetGame() {
   stopTimer();
   emptyInput(playerNameContainer);
   matchedTiles = 0;


   removeDisabled(playerNameContainer);
   removeDisabled(startButton);
   setDisabled(stopButton);
   removeDisabled(resetButton);

   // resetto senza stare a fare lo shuffle?
   generateTiles('auto');
}



// --------------------
// ------- RANK -------
// --------------------

window.onload = () => {

   if (winnersLs != null) {
      let datiStorage = JSON.parse(winnersLs);
      winners = datiStorage;
   }

   updateWinners();
};

function updateWinners() {
   empty(winnersContainer);

   if (winners != null && winners.length != 0) {
      let list = document.createElement('ul');
      list.classList.add('list-group');
      winnersContainer.appendChild(list);

      winners.sort((a, b) => {
         minutesA = a.time.m;
         secondsA = a.time.s;
         let timeA = minutesA * 60 + secondsA;
         minutesB = b.time.m;
         secondsB = b.time.s;
         let timeB = minutesB * 60 + secondsB;
         return timeA - timeB;
      });

      winners.forEach((player, i) => {
         let listItem = document.createElement('li');
         listItem.classList.add('list-group-item');
         listItem.innerHTML = `${player.name}`;

         let score = document.createElement('span');
         score.classList.add('float-right');
         let scoreText = player.time.m == 0 ? `${player.time.s}s` : `${player.time.m}m ${player.time.s}s`;
         score.innerHTML = scoreText;

         listItem.appendChild(score);
         list.appendChild(listItem);
      });

   } else {
      let message = document.createElement('p');
      message.innerHTML = 'Non è ancora stata giocata nessuna partita';
      winnersContainer.appendChild(message);
   }
}



// ---------------------
// ------- TILES -------
// ---------------------

function generateTiles(cursor) {
   empty(tileContainer);

   let shuffledColors = shuffleColors(colors);

   for (let i = 0; i < shuffledColors.length; i++) {
      let tileColor = shuffledColors[i];
      let tileBox = createTile(cursor);
      let tileDOM = tileBox.querySelector('.tile');
      let tileObject = {
         dom: tileDOM,
         color: tileColor,
         index: i
      }

      tileObjectsArray.push(tileObject);
      tileDOM.onclick = function () { flipTile(tileObject.dom, tileObject.color) };
      tileContainer.appendChild(tileBox);
   }
}

function shuffleColors(colors) {
   let j, x, i;
   for (i = colors.length - 1; i >= 0; i--) {
      j = Math.floor(Math.random() * i) + 1;
      x = colors[i];
      colors[i] = colors[j];
      colors[j] = x;
   }
   return colors;
}

function createTile(cursor) {
   let tileBox = document.createElement('div');
   tileBox.classList.add('col', 'col-6', 'col-md-4', 'col-lg-3', 'p-3');

   let tile = document.createElement('div');
   tile.classList.add('tile');
   tileBox.appendChild(tile);

   let tileFront = document.createElement('div');
   tileFront.classList.add('tile-front');
   tileFront.style.cursor = cursor;
   tile.appendChild(tileFront);

   let tileBack = document.createElement('div');
   tileBack.classList.add('tile-back');
   tileBack.style.cursor = cursor;
   tile.appendChild(tileBack);

   return tileBox;
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

      let player = playerNameContainer.value.trim();
      let time = timer.innerHTML;
      winners.push({
         name: player,
         time: {
            m: minutes,
            s: seconds
         }
      })

      window.localStorage.setItem('winners', JSON.stringify(winners));

      setTimeout(() => {
         alert(`Partita completata! Tempo impiegato: ${time}`);
         resetGame();
         updateWinners();
      }, 1000);
   }
}



// ---------------------
// ------- TIMER -------
// ---------------------

function startTimer() {
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



// ----------------------------------
// ------- SHORTCUT FUNCTIONS -------
// ----------------------------------

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