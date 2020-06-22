let userDB = [];
const lsKey = 'utenti';


function User(email, password) {
   this.email = email;
   this.password = password;
}


function loadDB() {
   if (window.localStorage.getItem(lsKey) == null) {
      window.localStorage.setItem(lsKey, JSON.stringify(userDB));
   } else {
      userDB = JSON.parse(window.localStorage.getItem(lsKey));
   }
}


async function signup() {
   let email = document.getElementById('registerMailInput').value;
   let password = document.getElementById('registerPasswordInput').value;
   let passwordConfirm = document.getElementById('registerPasswordConfirm').value;

   if (email.length < 3 || password.length < 3 || passwordConfirm !== password) {
      alert("L'email o la password inserite non sono valide");
   } else if (checkUser(email)) {
      alert('Ti sei già registrato');
   } else {

      let encryptedPassword = await encrypt(password);
      let user = new User(email, encryptedPassword);

      // creo un metodo in User()
      userDB.push(user);
      window.localStorage.setItem(lsKey, JSON.stringify(userDB));
   }

   // clear inputs

}


function checkUser(email) {
   let result = false; // null

   userDB.forEach((utente, index) => {
      if (utente.email === email) {
         result = index;
         return;
      }
   });

   return result;
}


function checkLogin(i, password) {
   let result = false;

   if (userDB[i].password === password) {
      result = true;
   }

   return result;
}


async function login() {
   let email = document.getElementById('loginMailInput').value;
   let password = document.getElementById('loginPasswordInput').value;

   if (email.length < 3 || password.length < 3) {
      alert('Dati errati o non validi');
   } else {
      let indexEmail = checkUser(email);

      if (indexEmail != null) {
         let tmpPassword = await encrypt(password);
         if (checkLogin(indexEmail, tmpPassword) == true) {
            window.location.href = 'home.html';
         } else {
            alert('Password non corretta!');
         }
      } else {
         alert('Devi ancora registrarti');
      }
   }
}

async function encrypt(text) {
    const data = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    return hashHex;
}

loadDB();