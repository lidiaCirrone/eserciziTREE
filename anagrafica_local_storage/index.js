function Persona(n, c, cf) {
   this.nome = n;
   this.cognome = c;
   this.codicefiscale = cf;
}

let anagrafica = [];
let totContatti = 0;

window.onload = () => {
   if (window.localStorage.getItem('utenti') != null) {
      let datiStorage = JSON.parse(window.localStorage.getItem('utenti'));
      anagrafica = datiStorage;
   }
   updateContacts();
};

function createContactsList() {
   let domContatti = document.getElementById('listaContatti');
   if (domContatti) {
      domContatti.remove();
   }
   let listaContatti = document.createElement('ul');
   listaContatti.id = "listaContatti";
   listaContatti.classList.add('list-group');
   return listaContatti;
}

function createContactListItem(p, i) {
   let listItemContatto = document.createElement('li');
   listItemContatto.classList.add('list-group-item');
   let contatto = document.createTextNode(`${p.nome} ${p.cognome} - ${p.codicefiscale}`);
   let icon = document.createElement('i');
   icon.classList.add('fas', 'fa-trash-alt', 'float-right');
   icon.onclick = function () { deleteUser(listItemContatto, i) };
   listItemContatto.appendChild(contatto);
   listItemContatto.appendChild(icon);
   return listItemContatto;
}

function searchCF() {
   let codiceCercato = document.getElementById('searchCF').value;
   if (anagrafica.length > 0) {

      if (codiceCercato == '') {
         updateContacts();
      } else {

         let listaContatti = createContactsList();

         if (!anagrafica.find(e => e['codicefiscale'].startsWith(codiceCercato))) {

            var emptyListItem = document.createElement('li');
            emptyListItem.classList.add('list-group-item');
            let emptyMessage = document.createTextNode(`Nessun risultato per il codice fiscale ${codiceCercato}`);
            emptyListItem.appendChild(emptyMessage);
            listaContatti.appendChild(emptyListItem);
            contattiTrovati = 0;

         } else {
            anagrafica.forEach((p, i) => {
               if (p.codicefiscale.startsWith(codiceCercato)) {
                  let listItemContatto = createContactListItem(p, i);
                  listaContatti.appendChild(listItemContatto);
               }
            });
         }

         document.getElementById('contenitoreContatti').appendChild(listaContatti);
      }

      (emptyListItem) ? contattiTrovati = 0 : contattiTrovati = document.getElementById("listaContatti").childElementCount;
      document.getElementById('contatoreContatti').innerHTML = contattiTrovati;
   }

}

function updateContacts() {
   totContatti = anagrafica.length;
   document.getElementById('contatoreContatti').innerHTML = totContatti;

   if (anagrafica.length > 0) {
      let listaContatti = createContactsList();
      anagrafica.forEach((p, i) => {
         let listItemContatto = createContactListItem(p, i);
         listaContatti.appendChild(listItemContatto);
      });
      document.getElementById('contenitoreContatti').appendChild(listaContatti);
   }
}

function deleteUser(li, i) {
   let confirmDelete = confirm(`Sei sicuro di voler eliminare il codice fiscale ${anagrafica[i].codicefiscale}?`);
   if (confirmDelete) {
      li.remove();
      anagrafica.splice(i, 1);
      window.localStorage.setItem('utenti', JSON.stringify(anagrafica));
      updateContacts();
   }
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
   updateContacts();
   document.getElementById('cf').classList.remove('erroreCF');
}

function inviadati() {
   let nomeInput = document.getElementById('nome').value;
   let cognomeInput = document.getElementById('cognome').value;
   let cfInput = document.getElementById('cf').value;
   let trovato = false;

   if (nomeInput == '' || cognomeInput == '' || cfInput == '') {
      alert('Tutti i campi sono obbligatori');
   } else {
      if (anagrafica.length > 0) {
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
         salvaDatiStorage(nomeInput, cognomeInput, cfInput);
         alert('Utente inserito con successo');
      }
   }
}