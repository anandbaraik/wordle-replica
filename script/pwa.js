//manually install app
let deferredPrompt;
window.addEventListener('beforeinstallprompt', function(event) {
     event.preventDefault();
     deferredPrompt = event;
     addBtn = document.querySelector('#download-app');
     addBtn.addEventListener('click', (e) => {
         addBtn.style.display = 'none';
         setTimeout(function(){
            addBtn.style.display = 'block';
         }, 60000);
         // Show the prompt
         deferredPrompt.prompt();
         // Wait for the user to respond to the prompt
         deferredPrompt.userChoice.then((choiceResult) => {
             if (choiceResult.outcome === 'accepted') {
                 console.log('User accepted the A2HS prompt');
             } else {
                 console.log('User dismissed the A2HS prompt');
             }
             deferredPrompt = null;
         });
     });
});

function addToHomeScreen() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (choiceResult) {
            if (choiceResult.outcome === 'dismissed') {
                console.log('User cancelled installation');
            } else {
                console.log('User added to home screen');
            }
        });
        deferredPrompt = null;
    }
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("./script/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err));
    });
}