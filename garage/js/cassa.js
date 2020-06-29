function mostraPagamenti() {
    let tabella = document.getElementById('table');
    let tag = '';
    if(cassa.length != 0) {
        let totale = 0;
        cassa.forEach((ele,index) => {
            tag += `<tr>
            <th scope = "row">${index+1}</th>
            <td>${ele.dataFine}</td>
            <td>${ele.auto}</td>
            <td>${ele.totale}</td>
            </tr>`;
            totale += ele.totale;
        })
        tag += `<tr class="bg-dark">
            <td></td>
            <td></td>
            <td></td>
            <td class="text-white">${totale}</td>
        </tr>`;
        tabella.innerHTML = tag;
    }
}

mostraPagamenti();