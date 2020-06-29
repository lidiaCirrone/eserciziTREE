

const selectMarca = document.getElementById('marca');
const selectModello = document.getElementById('modello');
const selectCliente = document.getElementById('cliente');
const inputData =document.getElementById("data");
const form = document.forms['affitto'];

form.addEventListener('submit',creaAffitto);

inputData.min=moment().add(1,'days').format("yyyy-MM-DD");


async function getMarca() {
    let marca$ = await fetch(URL).then(response => {
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Response failed...');
        }
    }).catch((err)=>{
        console.error(err);
    });
    let tag = `<option value="empty" selected disabled>Scegli una marca</option>`;

    if(marca$!=undefined){
        const marcaArray = marca$.Results;

        for(let i = 0; i<10; i++) {
            tag += `<option value='${marcaArray[i].Make_ID}' id='${marcaArray[i].Make_ID}'>${marcaArray[i].Make_Name}</option>`;
        }
    }
    selectMarca.innerHTML = tag;
}

getMarca();

async function getModello() {
    let id = selectMarca.value;
    let modello$ = await fetch(URLVEICOLI+id+"?format=json").then(response => {
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Response failed...');
        }
    }).catch((err)=>{
        console.error(err);
    });

    let tag = `<option value="empty" selected disabled>Scegli un modello</option>`;

    if(modello$!=undefined){
        const modelloArray = modello$.Results;
        console.log(modelloArray);

        const modello=document.getElementById(id).textContent;

        for(let i = 0; i<10 && i<modelloArray.length; i++) {
            let trovato=false;
            for(let j=0; j<prenotazioni.length; j++){
                if(`${modello} ${modelloArray[i].Model_Name}`==prenotazioni[j].auto)
                    trovato=true;
            }
            if(trovato==false)
                tag += `<option value='${modelloArray[i].Model_ID}' id='${modelloArray[i].Model_ID}'>${modelloArray[i].Model_Name}</option>`;
        
        }
    }
    selectModello.innerHTML = tag;
}

function getCliente() {
    let tag = `<option value="empty" selected disabled>Seleziona cliente</option>`;

    if(clienti.length != 0) {
        for(let i=0;i<clienti.length; i++) {
            let trovato = false;
            for(let p=0; p<prenotazioni.length;p++) {
                if (clienti[i].email == prenotazioni[p].cliente) {
                    trovato = true;
                }
            }
            if(trovato==false){
                tag += `<option value='${clienti[i].email}'>${clienti[i].username}</option>`;

            }
        }




        /*clienti.forEach((c, c) => {
            
            if(prenotazioni.find((p) => c['email'] != p['cliente'])){
                tag += `<option value='${c.email}'>${c.username}</option>`;
                //console.log(p);
                ///console.log(c);
            }
                
            /* for (let i=0; i<prenotazioni.length; i++  ) {
                if(ele.email != prenotazioni[i].cliente) 
                    tag += `<option value='${ele.email}'>${ele.username}</option>`;
            } 
        })*/
    }
    selectCliente.innerHTML = tag;
    
}

getCliente();

function creaAffitto(event){
    event.preventDefault();
    if (selectMarca.value == 'empty' || selectModello.value == '' || selectModello.value == "empty" || selectCliente.value == "empty" || inputData.value == ''){
        
        alert('Compila tutti i campi');
    } else {
        prenotazioni.push(new Prenotazione(inputData.value, selectCliente.value, document.getElementById(selectMarca.value).textContent + ' ' + document.getElementById(selectModello.value).textContent));
        LP.save();
        location.href = "home.html";
    }

}