notification = document.querySelector(".notification")
after = document.querySelector(".after")
afterCloseButton = document.querySelector(".after__close")
detailResults = document.querySelectorAll(".detail-result")
result = document.querySelector(".result p")
document.onkeydown = function(event) {
    notification.classList.add("display-none")
    after.classList.add("display-block")
    keyName = event.which === 32 ? "Space" : event.key
    detailResults[0].innerText = keyName
    detailResults[1].innerText = event.location
    detailResults[2].innerText = event.which
    detailResults[3].innerText = event.code
    result.innerText = event.which
}

afterCloseButton.onclick = function() {
    notification.classList.remove("display-none")
    after.classList.remove("display-block")
}