let modal = document.getElementById("wordle_info");
let closeModal = document.getElementsByClassName("close")[0];
let openModal = document.getElementById("open_modal");



if ('getInstalledRelatedApps' in window.navigator) {
  console.log('dsds');
    async function start() {
      const relatedApps = await navigator.getInstalledRelatedApps();
      alert(relatedApps);
      alert(relatedApps.length);
    }

    start();
 }
        // const relatedApps = await navigator.getInstalledRelatedApps();
        // relatedApps.forEach((app) => {
        //     //if your PWA exists in the array it is installed
        //     console.log(app.platform, app.url);
        // });
// }
const showModalInitially = () =>{
  if (
    document.cookie.split(";").filter((item) => {
      return item.includes("instructionShown=");
    }).length
  ) {
    return;
  } else {
    document.cookie = "instructionShown=true;path=/;max-age=86400"; //set cookie for 24h
  }
  modal.style.display = "block";
}

openModal.onclick = function() {
  modal.style.display = "block";
}

closeModal.onclick = function() {
  modal.style.display = "none";
}

//close modal when click outside of modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

showModalInitially();