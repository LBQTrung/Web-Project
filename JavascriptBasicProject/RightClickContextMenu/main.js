const menuWrapper = document.querySelector('.wrapper')
let shareMenu = document.querySelector('.share-menu')

document.oncontextmenu = function(e) {
    e.preventDefault()
    menuWrapper.style.visibility = "visible"

    let x = e.offsetX
    let y = e.offsetY
    
    let winWidth = window.innerWidth
    let menuWidth = menuWrapper.offsetWidth
    x = x > winWidth - menuWidth ? winWidth - menuWidth : x
    if (x > (winWidth - menuWidth - shareMenu.offsetWidth)) {
        shareMenu.style.left = "250px"
    } else {
        shareMenu.style.left = '-200px'
    }

    let winHeight = window.innerHeight
    let  menuHeight = menuWrapper.offsetHeight
    y = y > winHeight - menuHeight ? winHeight - menuHeight : y
    

    menuWrapper.style.left = `${x}px`
    menuWrapper.style.top = `${y}px`
}