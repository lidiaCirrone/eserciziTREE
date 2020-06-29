const search = document.getElementById("searchEmail");

async function cercaPrenotazioni(searchText) {

        let risultati = prenotazioni.filter(prenotazione => {
            const regex = new RegExp(`^${searchText}`, 'gi'); 
            return prenotazione.cliente.match(regex);
        });

        if(searchText.length === 0) {
           caricaPagina(prenotazioni);
        } else {            
            caricaPagina(risultati);
        }

}

search.addEventListener('input', () => cercaPrenotazioni(search.value));

function caricaPagina(arrayPrenotazioni) {
    let table = document.getElementById("table");
    let content="";
    let today = moment(new Date()).format("yyyy-MM-DD");
    let index;
    if(arrayPrenotazioni.length!=0){
        table.innerHTML="";
        arrayPrenotazioni.forEach((ele, indice) =>{
            index=prenotazioni.findIndex(prenotazione => prenotazione.cliente==ele.cliente);
           if(ele.data < today) {
                content += `<tr>
                    <td>${indice+1}</td>
                    <td>${ele.data}</td>
                    <td>${ele.cliente}</td>
                    <td>${ele.auto}</td>
                    <td>
                        <i class="fas fa-times-circle" onclick="cancellaPrenotazione('${index}')"></i>
                        <span data-toggle="modal" data-target="#exampleModal">
                            <i class="fas fa-registered" onclick="mostraModaleAuto('${index}')"></i>
                        </span>
                    </td>
                    </tr>`;
            }else{
                content += `<tr>
                    <td>${indice+1}</td>
                    <td>${ele.data}</td>
                    <td>${ele.cliente}</td>
                    <td>${ele.auto}</td>
                    <td>
                        <i class="fas fa-times-circle" onclick="cancellaPrenotazione('${index}')"></i>
                    </td>
                    </tr>`;
            }
            
        }) 
        table.innerHTML=content;
    }else{
        table.innerHTML=`<tr>
                            <td colspan="5" class="text-center">Non ci sono affitti</td>
                        </tr>`;
    }

}

caricaPagina(prenotazioni);

function cancellaPrenotazione(i){
    prenotazioni.splice(i,1);
    LP.save();
    caricaPagina(prenotazioni);
}

let indice;
function mostraModaleAuto(i){
    indice=i;
    var start = prenotazioni[i].data;
    var end = moment(new Date()); 
    document.getElementById("data").textContent="Auto restituita il " + end.format("yyyy-MM-DD");
    var duration = moment.duration(end.diff(start));
    var days = Math.floor(duration.asDays());
    document.getElementById("prezzo").textContent="Costo " +40*days;
}
 
function restituisciAuto (){
    console.log(indice);
    var start = prenotazioni[indice].data; 
    var end = moment(new Date()); 
    var duration = moment.duration(end.diff(start));
    var days = Math.floor(duration.asDays());
    cassa.push(new Pagamento(end.format("yyyy-MM-DD"),40*days,prenotazioni[indice].auto));
    LCA.save();
    cancellaPrenotazione(indice);
}





