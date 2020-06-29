function verificaCookie(){

    if (document.cookie.split(';').some(function(item) {
        //il cookie salvato viene cancellato alla chiusura del browser quindi mi basta controllare che il cookie esista
        return item.trim().indexOf('username=') == 0
    })) {
        console.log('The cookie  exists ');
    }else{
        //alert("non sei loggato!");
        location.href = "relogin.html";
    }
}

document.addEventListener('DOMContentLoaded', verificaCookie());