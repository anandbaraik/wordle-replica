let modal = document.getElementById("wordle_info");
let closeModal = document.getElementsByClassName("close")[0];

const showModalInitially = () => modal.style.display = "block";

// openModal.onclick = function() {
//   modal.style.display = "block";
// }

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