const lista=document.getElementById("accordionExample");

async function mostraGarage() {

    let garage$ = await fetch(URL).then(response => {
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Response failed...');
        }
    }).catch((err)=>{
        console.error(err);
    });

    if (garage$!=undefined) {

            let content = ``;
            let marche=garage$.Results;

            for(let i=0; i<10 && i<marche.length; i++){
        

                let modello$ = await fetch(URLVEICOLI+marche[i].Make_ID+"?format=json").then(response => {
                    if(response.ok){
                        return response.json();
                    }else{
                        throw new Error('Response failed...');
                    }
                }).catch((err)=>{
                    console.error(err);
                });

                if (modello$!=undefined) {
                    let auto=modello$.Results;

                    content += `<div class="card">
                    <div class="card-header" id="${i}">
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                        ${marche[i].Make_Name}
                        </button>
                    </h2>
                    </div>
                    <div id="collapse${i}" class="collapse " aria-labelledby="${i}" data-parent="#accordionExample">
                        <div class="card-body">
                        <ul class="list-group list-group-flush">
                    `;
                    for(let j=0; j<10 && j<auto.length; j++){
                        let trovato=false;
                            
                        for(let k=0; k<prenotazioni.length; k++){
                            if(`${auto[j].Make_Name} ${auto[j].Model_Name}`==prenotazioni[k].auto)
                                trovato=true;
                        }
                        if(trovato==false){
                            content += `
                                <li class="list-group-item text-left">${auto[j].Model_Name}</li>
                                `;
                        } else{
                            content += `
                            <li class="list-group-item bg-danger text-white text-left">${auto[j].Model_Name}</li>
                            `;
                        } 

                    }
                    content += `</ul>
                    </div>
                                </div>
                                </div>`;
                }
            }
        lista.innerHTML=content;

    }


}

mostraGarage();