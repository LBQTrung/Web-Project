const container = document.querySelector('.container')
const refreshBtn = document.querySelector('.refresh-btn')

app = {
    maxPaletteBoxes: 6,

    start: function() {
        this.renderPalette()
        this.handleRandomColor()
        this.handleEvents()
    },

    randomHexColor: function() {
        let hex = Math.floor(Math.random()*16777215).toString(16);
        return `#${hex.toUpperCase()}`
    },

    renderPalette() {
        container.innerHTML = ''
        for (let i = 0; i < this.maxPaletteBoxes; i++) {
            let html = `
                <li class="color">
                    <div class="color__reactbox"></div>
                    <span class="color__hexvalue">${this.randomHexColor()}</span>
                </li>
            `
            container.innerHTML += html
        }
    },

    handleRandomColor: function() {
        let colorBoxes = container.querySelectorAll('.color__reactbox')
        Array.from(colorBoxes).forEach(function(box) {
            let hexValue = box.nextElementSibling.innerText
            box.style.backgroundColor = hexValue
        })
    },

    handleEvents: function() {
        // refresh
        refreshBtn.onclick = function() {
            app.renderPalette()
            app.handleRandomColor()
            app.handleEvents()
        }

        // Copy hex value
        const colors = container.querySelectorAll('.color')
        Array.from(colors).forEach(function(color) {
            color.onclick = function() {
                let hexValueElement = color.querySelector('.color__hexvalue')
                let hexValue = hexValueElement.innerText
                let sleep = function(ms) {
                    return new Promise(function(resolve, reject) {
                        setTimeout(function() {
                            resolve()
                        }, ms)
                    })
                }
                // Copy to clipboard
                let defaultFontWeight = hexValueElement.style.fontWeight
                let defaultFontSize = hexValueElement.fontSize
                navigator.clipboard.writeText(hexValue)
                    .then(function() {
                        hexValueElement.innerText = 'Copied'
                        hexValueElement.style.fontWeight = '700'
                        hexValueElement.fontSize = '1.8rem'
                        return sleep(1000)
                    })
                    .then(function() {
                        hexValueElement.innerText = hexValue
                        hexValueElement.style.fontWeight = defaultFontWeight
                        hexValueElement.fontSize = defaultFontSize
                    })
                    .catch(function() {
                        alert('Failed to copy the color code!')
                    })
            }   
        })
    }

}

app.start()




