let userDB = [];
const lsKey = 'utenti';

function User(email, password) {
   this.email = email;
   this.password = password;
}

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
      if (!validateEmail(emailValue)) {
         alert('Indirizzo email non valido');
      } else {
         if (passwordConfirmValue !== passwordValue) {
            alert('Le password inserite non coincidono');
         } else {
            if (existingUser(emailValue) !== false) {
               alert('Indirizzo email già utilizzato');
            } else {
               let encryptedPassword = await encrypt(passwordValue);
               let user = new User(emailValue, encryptedPassword);

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
}

async function login() {
   let email = document.getElementById('loginEmail').value;
   let password = document.getElementById('loginPassword').value;

   if (email.trim() == '' || password.trim() == '') {
      alert('Entrambi i campi sono obbligatori');
   } else {
      let userIndex = existingUser(email);
      if (userIndex !== false) {
         let tmpPassword = await encrypt(password);
         if (checkPassword(userIndex, tmpPassword)) {
            document.cookie = `username=${email}; path=/`;
            window.location.href = 'home.html';
         } else {
            alert('Password errata!');
         }
      } else {
         alert('Utente inesistente');
      }
   }
}

function existingUser(email) {
   let result = false;
   userDB.forEach((user, i) => {
      if (user.email === email) {
         result = i;
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

function validateEmail(email) {
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

function emptyInput(element) {
   element.value = '';
}