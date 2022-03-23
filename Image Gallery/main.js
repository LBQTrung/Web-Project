images = document.querySelectorAll(".image img")
gallery = document.querySelector(".gallery")
galleryClose = document.querySelector(".gallery__close")
galleryImage = gallery.querySelector(".gallery__inner img")
galleryPrev = gallery.querySelector(".gallery__prev")
galleryNext = gallery.querySelector(".gallery__next")
currentIndex = 0

function showGallery() {
    if (currentIndex == 0) {
        galleryPrev.classList.add("hide")
    } else if (currentIndex < images.length - 1) {
        galleryPrev.classList.remove("hide")
        galleryNext.classList.remove("hide")
    } else {
        galleryNext.classList.add("hide")
    }
    galleryImage.src = images[currentIndex].src
    gallery.classList.add("show")
}

images.forEach(function(image, index) {
    image.onclick = function() {
        currentIndex = index
        showGallery()
    }
    
})

galleryNext.onclick = function() {
    currentIndex ++
    showGallery()
}

galleryPrev.onclick = function() {
    currentIndex --
    showGallery()
}

galleryClose.onclick = function() {
    gallery.classList.remove("show")
}
