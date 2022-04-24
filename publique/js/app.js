var courriel = document.querySelector('.courriel-form');

    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let subject = document.getElementById('subject');
    let message = document.getElementById('message');
    


courriel.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    let formData = {

        name:   name.value,
        email:   email.value,
        subject: subject.value,
        message: message.value,

    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert('Email Envoyer');
            name.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
            
        }else{
        alert('Serveur Introuvable Voir Votre Console !!')
        } 
 /***********************************************
 * Local Storage
 ***********************************************/
    localStorage.setItem('name', name.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('subject', subject.value);
    localStorage.setItem('message', message.value);
    
    }
    
    
    
     
    xhr.send(JSON.stringify(formData));

})
