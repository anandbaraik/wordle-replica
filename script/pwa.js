//manually install app
const addBtn = document.querySelector('#download-app');
async function getInstalledApps() {
    if ('getInstalledRelatedApps' in navigator) {
        let installedApps = await navigator.getInstalledRelatedApps();
        if(installedApps.length > 0) {
            addBtn.style.display = 'none';
        }
    }
}

getInstalledApps();

let deferredPrompt;
window.addEventListener('beforeinstallprompt', function(event) {
     event.preventDefault();
     deferredPrompt = event;
     addBtn.addEventListener('click', (e) => {
        addBtn.style.display = 'none';
        setTimeout(function(){
            addBtn.style.display = 'block';
         }, 5000); //5s
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            setTimeout(() => {
                getInstalledApps();
                deferredPrompt = null;
            }, 10000); //10s
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

        // When the user asks to refresh the UI, we'll need to reload the window
        navigator.serviceWorker.addEventListener('message', (event) => {
            if (!event.data) {
                return;
            }
            switch (event.data) {
                case 'reload-window':
                    window.location.reload();
                    break;
                default:
                    break;
            }
        });

        navigator.serviceWorker
            .register("/serviceWorker.js", { scope: "/" })
            .then(res => console.log("service worker registered", res))
            .catch(err => console.log("service worker not registered", err));
    });
}