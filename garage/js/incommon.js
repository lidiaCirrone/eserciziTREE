

function Utente(nome,cognome,email,username,password){
    this.nome=nome;
    this.cognome=cognome;
    this.email=email;
    this.password=password;
    this.username=username;

    this.getPW = () => {
        return this.password;
    };

    this.getUN = () =>{
        return this.username;
    }
};



const utenti=[];

const LS={
    lsKey:"utenti",

    get: function(){
        return JSON.parse(window.localStorage.getItem(this.lsKey));
    },

    save: function(){
        window.localStorage.setItem(this.lsKey,JSON.stringify(utenti));
    },

    init: function(){
        if(window.localStorage[this.lsKey]==undefined){
           
            this.save();
        }

        this.get().forEach(user =>{utenti.push(new Utente(user.nome,user.cognome,user.email,user.username,user.password));});
      
    }
}

LS.init();

async function hash(testo){
   
    const msgUint8 = new TextEncoder().encode(testo);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
   
    return hashHex;
}




