const pianoKeys = document.querySelectorAll('.key')
const volumeSlider = document.querySelector('.volume-slider input')
const checkBox = document.querySelector('.keys-checkbox input')
const pianoKeyBoard = document.querySelectorAll('.piano-keys span')
const validKeys = []
console.log(pianoKeyBoard)

let audio = new Audio() // default source

const playTune = function(dataKey) {
    audio.src = `./tunes/${dataKey}.wav`
    audio.play()
}

pianoKeys.forEach(function(key) {
    // Save valid key
    validKeys.push(key.dataset.key)
    // Handle click event
    key.onclick = function() {
        playTune(key.dataset.key)
        key.classList.add('active')
        setTimeout(function() {
            key.classList.remove('active')
        }, 150)
    }
})

document.onkeydown = function(e){
    if (validKeys.includes(e.key)) {
        playTune(e.key)
        pianoKeys.forEach(function(key) {
            if (key.dataset.key == e.key) {
                key.click()
            }
        })
    }   
}

volumeSlider.onchange = function(e) {
    audio.volume = e.target.value
}

handleCheckedDisplay = function() {
    if (checkBox.checked == true) {
        pianoKeyBoard.forEach(function(key, index) {
            key.innerText = pianoKeys[index].dataset.key
        })
        
    } else {
        pianoKeyBoard.forEach(function(key) {
            key.innerText = ''
        })
    }
}

checkBox.onclick = handleCheckedDisplay
