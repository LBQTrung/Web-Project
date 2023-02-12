const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let tabItems = $$(".tab-item")
let tabPanes = $$(".tab-pane")
let line = $(".line")
let tabActive = $(".tab-item.active")
Object.assign(line.style, {
    left: `${tabActive.offsetLeft}px`,
    width: `${tabActive.offsetWidth}px`
})

tabItems.forEach((item, index) => {
    item.onclick = function() {
        pane = tabPanes[index]
        // Remove previous active
        $(".tab-item.active").classList.remove("active")
        $(".tab-pane.active").classList.remove("active")
        this.classList.add("active")
        pane.classList.add("active")

        Object.assign(line.style, {
            left: `${this.offsetLeft}px`,
            width: `${this.offsetWidth}px`
        })
    }
});