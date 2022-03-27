searchButton = document.querySelector(".search__button")
searchInput = document.querySelector(".search__input")
searchButton.onclick = function() {
    searchButton.classList.toggle("searching-button")
    searchInput.classList.toggle("searching-input")
    searchInput.focus()
}