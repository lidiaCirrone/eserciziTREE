let userDB = [];
const lsKey = 'utenti';


function User(email, password) {
   this.email = email;
   this.password = password;
}


// function loadDB() {
//    if (window.localStorage.getItem(lsKey) == null) {
//       window.localStorage.setItem(lsKey, JSON.stringify(userDB));
//    } else {
//       userDB = JSON.parse(window.localStorage.getItem(lsKey));
//    }
// }


window.onload = () => {
   if (window.localStorage.getItem(lsKey) != null) {
      let datiStorage = JSON.parse(window.localStorage.getItem(lsKey));
      userDB = datiStorage;
   }
};


async function signup() {
   let email = document.getElementById('registerEmail');
   let password = document.getElementById('registerPassword');
   let passwordConfirm = document.getElementById('registerPasswordConfirm');

   let emailValue = email.value;
   let passwordValue = password.value;
   let passwordConfirmValue = passwordConfirm.value;

   if (emailValue.trim() == '' || passwordValue.trim() == '' || passwordConfirmValue.trim() == '') {
      alert('Tutti i campi sono obbligatori');
   } else {
      // regex email?
      if (passwordConfirmValue !== passwordValue) {
         alert('Le password inserite non coincidono');
      } else {
         if (existingUser(emailValue)) {
            alert('Indirizzo emailValue già utilizzato');
         } else {

            let encryptedPassword = await encrypt(passwordValue);
            let user = new User(emailValue, encryptedPassword);

            // creo un metodo in User()
            userDB.push(user);
            window.localStorage.setItem(lsKey, JSON.stringify(userDB));

            alert('Utente registrato con successo');

            emptyInput(email);
            emptyInput(password);
            emptyInput(passwordConfirm);
         }
      }
   }

}

async function login() {
   let email = document.getElementById('loginEmail').value;
   let password = document.getElementById('loginPassword').value;

   if (email.length < 3 || password.length < 3) {
      alert('Dati errati o non validi');
   } else {
      let indexEmail = existingUser(email);

      if (indexEmail != null) {
         let tmpPassword = await encrypt(password);
         if (checkPassword(indexEmail, tmpPassword) == true) {
            window.location.href = 'home.html';
         } else {
            alert('Password non corretta!'); // anche quando non esiste l'utente, anche quando e corretta
         }
      } else {
         alert('Devi ancora registrarti');
      }
   }
}

function existingUser(email) {
   let result = false;
   userDB.forEach((user) => {
      if (user.email === email) {
         result = true;
         return;
      }
   });
   return result;
}

function checkPassword(i, password) {
   let result = false;
   if (userDB[i].password === password) {
      result = true;
   }
   return result;
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

// loadDB();



function emptyInput(element) {
   element.value = '';
}