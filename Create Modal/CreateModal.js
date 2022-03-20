createModalButton = document.querySelector(".create-modal")
createModalButton.onclick = function() {
    modal = document.querySelector(".modal")
    modal.style = "display: block"
    createModalButton.style = "display: none"
}

closeModal = document.querySelectorAll(".modal-close")
closeModal.forEach(function(closeElement) {
    closeElement.onclick = function() {
        modal = document.querySelector(".modal")
        modal.style = "display: none"
        createModalButton.style = "display: block"
    }
})