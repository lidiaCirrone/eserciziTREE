function Persona(n, c, cf) {
   this.nome = n;
   this.cognome = c;
   this.codicefiscale = cf;
}

let anagrafica = [];
let totContatti = 0;

//init dell'applicazione
window.onload = () => {
   if (window.localStorage.getItem('utenti') != null) { // verifico che ci siano persone nello storage
      let datiStorage = JSON.parse(window.localStorage.getItem('utenti'));
      anagrafica = datiStorage; // ho inizializzato l'anagrafica con i dati presenti nello store
   }
   updateCounter();
};

function updateCounter() {
   totContatti = anagrafica.length;
   document.getElementById('contatoreContatti').innerHTML = totContatti;

   if (anagrafica.length > 0) {
      let domContatti = document.getElementById('listaContatti');
      if (domContatti) {
         domContatti.remove();
      }
      let listaContatti = document.createElement('ul');
      listaContatti.id = "listaContatti";
      listaContatti.classList.add('list-group');
      anagrafica.forEach((p, i) => {
         let li = document.createElement('li');
         li.classList.add('list-group-item');
         let contatto = document.createTextNode(`${p.nome} ${p.cognome} - ${p.codicefiscale}`);
         let icon = document.createElement('i');
         icon.classList.add('fas', 'fa-trash-alt', 'float-right');
         icon.onclick = function () { deleteUser(li, i) };
         li.appendChild(contatto);
         li.appendChild(icon);
         listaContatti.appendChild(li);
      });
      document.getElementById('contenitoreContatti').appendChild(listaContatti);
   }
}

function deleteUser(li, i) {
   li.remove();
   anagrafica.splice(i, 1);
   window.localStorage.setItem('utenti', JSON.stringify(anagrafica));
   updateCounter();
}

function azzeraForm() {
   document.getElementById('nome').value = '';
   document.getElementById('cognome').value = '';
   document.getElementById('cf').value = '';
}

function salvaDatiStorage(n, c, cf) {
   let p = new Persona(n, c, cf);
   anagrafica.push(p);
   window.localStorage.setItem('utenti', JSON.stringify(anagrafica));
   azzeraForm();
   updateCounter();
   document.getElementById('cf').classList.remove('erroreCF');
}

function inviadati() {
   let nomeInput = document.getElementById('nome').value;
   let cognomeInput = document.getElementById('cognome').value;
   let cfInput = document.getElementById('cf').value;
   let trovato = false;

   //validazione campi vuoti
   if (nomeInput == '' || cognomeInput == '' || cfInput == '') {
      alert('Tutti i campi sono obbligatori');
   } else {
      if (anagrafica.length > 0) {
         // vuol dire che c'è almeno una persona nell'array
         // devo controllare che all'interno dell'array anagrafica non ci sia un'altra persona con lo stesso cf
         anagrafica.forEach((p) => {
            if (p.codicefiscale == cfInput) {
               trovato = true;
               return;
            }
         });
         if (!trovato) {
            salvaDatiStorage(nomeInput, cognomeInput, cfInput);
            alert('Utente inserito con successo');
         } else {
            alert('Utente già presente');
            document.getElementById('cf').classList.add('erroreCF');
         }
      } else {
         // l'anagrafica è vuota
         salvaDatiStorage(nomeInput, cognomeInput, cfInput);
         alert('Utente inserito con successo');
      }
   }
}

// al salva deve aggiornarsi un elenco puntato sotto "I tuoi contatti:", da anagrafica, per ogni li un'icona cestino che elimini il contatto, sia da anagrafica che da storage e si deve aggiornare il numeretto. Invec che alert confirm, se sì eliminiamo dallo storage

// sotto cerca facciamo il cerca