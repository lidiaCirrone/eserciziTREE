async function validazione(event)
{
    event.preventDefault();
    if(form.nome_utente.value.length == 0 ||
       form.password.value.length == 0)
    {
        alert("Compilare tutti i campi.");
        
    }else{
        let verifica = await verificaCredenziali();
        if(!verifica){
            document.querySelector("#credenziali").classList.remove("nascosto");
        }else{
            let usernameCriptato= await hash(form.nome_utente.value);
            createCookie(usernameCriptato);
            form.submit();
        }
        
    }

}

function createCookie(nome_utente){
    var d = new Date();
    d.setTime(d.getTime() + ( 15* 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie =  "username=" + nome_utente + ";" + expires + ";path=/";
}



async function verificaCredenziali(){
    let credenziali_corrette=false;
    let hash1 = await hash(form.password.value);
   
    utenti.forEach(user =>{
      
        if(user.getPW()==hash1 && user.getUN()==form.nome_utente.value)
            credenziali_corrette=true;
    });
    return credenziali_corrette;
}



const form = document.forms['login'];
form.addEventListener('submit', validazione);






