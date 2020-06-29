function mostraClienti() {
    let tabella = document.getElementById('table');
    let tag = '';
    if(clienti.length != 0) {
        clienti.forEach((ele,index) => {
            tag += `<tr>
            <th scope = "row">${index+1}</th>
            <td>${ele.name}</td>
            <td>${ele.email}</td>
            </tr>`;
        })
        tabella.innerHTML = tag;
    }
}

mostraClienti();
 
function aggiungiCliente(){
    let cliente = document.getElementById("nomeCognome").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    if (cliente == '' || username == ''  || email == ''){
        
        alert('Compila tutti i campi');
    } else {
        document.getElementById("clientiButton").dataset.dismiss="modal";
        clienti.push(new Cliente(cliente, username, email));
        LC.save();
        mostraClienti();
    }

}
