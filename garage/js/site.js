const SERVERURL = 'http://localhost:3000/';
const USERSURL = 'users/';
const URL = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json";
const URLVEICOLI="https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/";


function Cliente(name,username,email){
    this.name = name;
    this.username=username;
    this.email = email;
}

function Prenotazione(data,cliente, auto){
    this.data=data; //data di inizio prenotazione
    this.cliente=cliente;
    this.auto=auto;
}

function Pagamento(dataFine,totale, auto){
    this.dataFine=dataFine; //data di fine prenotazione
    this.totale=totale;
    this.auto=auto;
}

const prenotazioni=[];
const clienti=[];

const LP={
    lsKey:"prenotazioni",

    get: function(){
        return JSON.parse(window.localStorage.getItem(this.lsKey));
    },

    save: function(){
        window.localStorage.setItem(this.lsKey,JSON.stringify(prenotazioni));
    },

    init: function(){
        if(window.localStorage[this.lsKey]==undefined){
           
            this.save();
        }

        this.get().forEach(prenotazione =>{prenotazioni.push(new Prenotazione(prenotazione.data, prenotazione.cliente, prenotazione.auto));});
      
    }
}
LP.init();

const LC={
    lcKey:"clienti",

    get: function(){
        return JSON.parse(window.localStorage.getItem(this.lcKey));
    },

    save: function(){
        window.localStorage.setItem(this.lcKey,JSON.stringify(clienti));
    },

    init: async function(){
        if(window.localStorage[this.lcKey]==undefined){

            let apiClienti$ = await fetch(SERVERURL+USERSURL).then(response => {
                if(response.ok){
                    return response.json();
                }else{
                    throw new Error('Response failed...');
                }
            }).catch((err)=>{
                console.error(err);
            });

            if(apiClienti$!=undefined){
                apiClienti$.forEach(cliente => {
                    clienti.push(new Cliente(cliente.name, cliente.username, cliente.email));
                });
            }
            
           
            this.save();
        }else{

            this.get().forEach(cliente =>{clienti.push(new Cliente(cliente.name, cliente.username, cliente.email));});
        }
    }
}
LC.init();


const cassa=[];

const LCA={
    lsKey:"cassa",

    get: function(){
        return JSON.parse(window.localStorage.getItem(this.lsKey));
    },

    save: function(){
        window.localStorage.setItem(this.lsKey,JSON.stringify(cassa));
    },

    init: function(){
        if(window.localStorage[this.lsKey]==undefined){
           
            this.save();
        }

        this.get().forEach(pagamento =>{cassa.push(new Pagamento(pagamento.dataFine, pagamento.totale, pagamento.auto));});
      
    }
}
LCA.init();

function resetCookie(){
    //setto il cookie in un momento passato
    document.cookie = "username= ; expires=Thu, 01 Jan 1970 00:00:00 UTC ;path=/";
    location.href = "index.html";
}

/*window.onload = () =>{

    if (document.cookie.split(';').some(function(item) {
        //il cookie salvato viene cancellato alla chiusura del browser quindi mi basta controllare che il cookie esista
        return item.trim().indexOf('username=') == 0
    })) {
        console.log('The cookie  exists ');
    }else{
        alert("non sei loggato!");
        location.href = "index.html";
    }
}*/


const logout=document.querySelector("#logout");
logout.addEventListener("click", resetCookie);