const dati = {
   piemonte: {
      alessandria: ['Acqui Terme', 'Alessandria'],
      biella: ['Biella', 'Brusnengo', 'Casapinta', 'Mongrando'],
      torino: ['Torino']
   },
   sicilia: {
      catania: ['Aci Castello', 'Aci Catena', 'Bronte', 'Catania'],
      enna: ['Centuripe']
   },
   toscana: {
      firenze: ['Campi Bisenzio', 'Empoli', 'Firenze'],
      lucca: ['Lucca'],
      pisa: ['Bientina', 'Pisa', 'Pontedera', 'Terricciola'],
      pistoia: ['Montecatini Terme', 'Pistoia']
   }
};

function getProvince(key) {
   return dati[key];
};

function getComuni(r, p) {
   return dati[r][p];
};

function regioneSelezionata() {

   let regione = document.getElementById('selectRegioni').value;
   let domProvince = document.getElementById('selectProvince');

   if (domProvince) {
      domProvince.remove();
   }

   let selectProvince = document.createElement('select');
   selectProvince.classList.add('form-control', 'mt-4');
   selectProvince.id = 'selectProvince';
   selectProvince.onchange = function () { provinciaSelezionata() };

   let defaultOption = document.createElement('option');
   defaultOption.text = "-- Seleziona una provincia --";
   defaultOption.disabled = true;
   defaultOption.selected = true;
   selectProvince.add(defaultOption);

   for (let [p, c] of Object.entries(dati[regione])) {
      let option = document.createElement('option');
      option.text = p.charAt(0).toUpperCase() + p.slice(1).replace("-", " ");
      option.value = p;
      selectProvince.add(option);
   };

   document.getElementById('province').appendChild(selectProvince);

};

function provinciaSelezionata() {

   let regione = document.getElementById('selectRegioni').value;

   let provincia = document.getElementById('selectProvince').value;
   let domComuni = document.getElementById('selectComuni');

   if (domComuni) {
      domComuni.remove();
   }

   let selectComuni = document.createElement('select');
   selectComuni.classList.add('form-control', 'mt-4');
   selectComuni.id = 'selectComuni';

   let defaultOption = document.createElement('option');
   defaultOption.text = "-- Seleziona un comune --";
   defaultOption.disabled = true;
   defaultOption.selected = true;
   selectComuni.add(defaultOption);

   getComuni(regione, provincia).map((comune) => {
      let option = document.createElement('option');
      option.text = comune;
      option.value = comune.toLowerCase().replace(" ", "-");
      selectComuni.add(option);
   });

   document.getElementById('comuni').appendChild(selectComuni);

};