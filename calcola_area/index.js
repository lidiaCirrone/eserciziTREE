function scegliFigura() {
   let figura = document.getElementById('figura').value;

   clearData();
   clearResults();

   switch (figura) {

      case 'quadrato':
         let latoQuadrato = createInput();
         latoQuadrato.id = 'latoQuadrato';
         // titolo
         let titoloQuadrato = createSizeTitle('del lato');
         let bottoneQuadrato = createButton();
         bottoneQuadrato.onclick = function () { calcolaAreaQuadrato(figura, latoQuadrato.value) };
         // mostra nel DOM
         document.getElementById('dati').appendChild(titoloQuadrato);
         document.getElementById('dati').appendChild(latoQuadrato);
         document.getElementById('dati').appendChild(bottoneQuadrato);
         break;

      case 'triangolo':
         let baseTriangolo = createInput();
         baseTriangolo.id = 'baseTriangolo';
         let altezzaTriangolo = createInput();
         altezzaTriangolo.classList.add('mt-2');
         altezzaTriangolo.id = 'altezzaTriangolo';
         // titolo
         let titoloTriangolo = createSizeTitle('di base e altezza');
         let bottoneTriangolo = createButton();
         bottoneTriangolo.onclick = function () { calcolaAreaTriangolo(figura, baseTriangolo.value, altezzaTriangolo.value) };
         // mostra nel DOM
         document.getElementById('dati').appendChild(titoloTriangolo);
         document.getElementById('dati').appendChild(baseTriangolo);
         document.getElementById('dati').appendChild(altezzaTriangolo);
         document.getElementById('dati').appendChild(bottoneTriangolo);
         break;

      case 'cerchio':
         let raggio = createInput();
         raggio.id = 'raggio';
         // titolo
         let titoloCerchio = createSizeTitle('del raggio');
         let bottoneCerchio = createButton();
         bottoneCerchio.onclick = function () { calcolaAreaCerchio(figura, raggio.value) };
         // mostra nel DOM
         document.getElementById('dati').appendChild(titoloCerchio);
         document.getElementById('dati').appendChild(raggio);
         document.getElementById('dati').appendChild(bottoneCerchio);
         break;

      default:
         console.log('Operazione non consentita');
         break;
   };
};

// funzioni per calcolare le aree

function calcolaAreaQuadrato(figura, lato) {
   let area = lato * lato;
   clearResults();
   showResults(figura, area);
};

function calcolaAreaTriangolo(figura, b, h) {
   let area = b * h / 2;
   clearResults();
   showResults(figura, area);
};

function calcolaAreaCerchio(figura, raggio) {
   let area = Math.PI * raggio * raggio;
   clearResults();
   showResults(figura, area);
};

// funzioni di visualizzazione HTML

function showResults(figura, risultato) {
   let titolo = document.createElement('h5');
   titolo.classList.add('mt-4');
   titolo.innerHTML = 'Area del ' + figura + ':';
   let testo = document.createElement('p');
   testo.innerHTML = risultato;
   document.getElementById('risultato').appendChild(titolo);
   document.getElementById('risultato').appendChild(testo);
};

function createInput() {
   let nodo = document.createElement('input');
   nodo.classList.add('form-control');
   nodo.setAttribute("type", "number");
   return nodo;
};

function createSizeTitle(s) {
   let titolo = document.createElement('h5');
   titolo.classList.add('mt-4');
   titolo.innerHTML = 'Inserisci la misura ' + s + ':';
   return titolo;
}

function createButton() {
   let pulsante = document.createElement('button');
   pulsante.classList.add('btn', 'btn-primary', 'mt-2');
   pulsante.innerText = 'Calcola area';
   return pulsante;
}

// funzioni di supporto

function clearData() {
   let boxDati = document.getElementById('dati');
   if (boxDati) {
      boxDati.innerHTML = '';
   }
};

function clearResults() {
   let boxRisultato = document.getElementById('risultato');
   if (boxRisultato) {
      boxRisultato.innerHTML = '';
   }
};