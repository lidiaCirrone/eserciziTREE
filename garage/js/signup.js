async function validaCampi(event){
    avvisoCampi.classList.add('nascosto');
    avvisoPassword.classList.add('nascosto');
    avvisoUtente.classList.add('nascosto');
    let errore=false;
    let nome=form.nome.value;
    let cognome=form.cognome.value;
    let email=form.email.value;
    let nome_utente=form.nome_utente.value;
    let password=form.password.value;
    let conferma_password=form.conferma_password.value;
   
    event.preventDefault();
    if(nome.length == 0 || cognome.length == 0 || email.length == 0 || nome_utente.length == 0 
        || password.length == 0 || conferma_password.length == 0 ){
         avvisoCampi.classList.remove('nascosto');
         errore=true;
         
    }else{
        if(!controlloUtente()){
            avvisoUtente.classList.remove('nascosto');
            errore=true;
            
        }
        if(!validaEmail()){
            errore=true;  
            avvisoEmail.classList.remove('nascosto');
            
        }
        if(password!==conferma_password){
            errore=true;
            avvisoPassword.classList.remove('nascosto');
            
        }
    }

    if(!errore){
        //se non ci sono errori creo un nuovo utente
        let password2= await hash(password);
        utenti.push(new Utente(nome,cognome,email,nome_utente,password2));
        LS.save();
        //setto  cookie
        let usernameCriptato= await hash(nome_utente);
        createCookie(usernameCriptato);
        form.submit();
    }
    
}


function createCookie(nome_utente){
    var d = new Date();
    d.setTime(d.getTime() + ( 15* 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie =  "username=" + nome_utente + ";" + expires + ";path=/";
}


function validaEmail() {
    //var regexp = /^(([^<>;()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    //pattern trovato online ma testato con email reali e non funziona
    var regexp=/^[^@ ]+@[^@ ]+\.[^@ \.]+$/;
    return regexp.test(form.email.value);
}

function controlloUtente(){
    let nome_disponibile = true;
    if(form.nome_utente.value.length !==0){
        utenti.forEach(user =>{
            if(user.getUN()==form.nome_utente.value){
                nome_disponibile=false;
                return;
            }
                
        });
    }
    return nome_disponibile;
}


const form = document.forms['iscrizione'];
const avvisoCampi=document.querySelector('#campiPieni');
const avvisoEmail=document.querySelector("#errore_email");
const avvisoPassword=document.querySelector('#password');
const avvisoUtente= document.querySelector('#utente');

form.addEventListener('submit', validaCampi);
