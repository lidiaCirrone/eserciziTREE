window.onload = () => {
   var cookie = document.cookie;
   var title = document.getElementById('title');
   var subtitle = document.getElementById('subtitle');
   var text = document.getElementById('text');

   if (cookie) {
      let start = cookie.indexOf('=') + 1;
      let username = decodeURIComponent(cookie.substring(start));

      title.innerHTML = 'Benvenuto!';
      subtitle.innerHTML = `Login effettuato con successo! Indirizzo email utilizzato: ${username}`;
      text.innerHTML = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi perferendis quod voluptatum soluta itaque neque provident architecto. Expedita dignissimos sunt ad recusandae dolor deserunt, quos fuga provident quidem voluptate, delectus exercitationem? Minus, maxime soluta non dicta doloremque perspiciatis quaerat perferendis quia veniam blanditiis voluptates deserunt labore dolorem libero dolores, asperiores quos amet? Cum voluptate eveniet reprehenderit? Error quisquam velit, maiores, ea delectus nemo sed praesentium sequi eum quidem iste nostrum?';
   } else {
      console.log('cookie non trovato');
   }
}